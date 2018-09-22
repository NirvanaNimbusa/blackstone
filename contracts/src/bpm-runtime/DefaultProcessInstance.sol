pragma solidity ^0.4.23;

import "commons-base/ErrorsLib.sol";
import "commons-base/BaseErrors.sol";
import "commons-base/Owned.sol";
import "commons-collections/AbstractDataStorage.sol";
import "commons-collections/AbstractAddressScopes.sol";
import "bpm-model/ProcessDefinition.sol";


import "bpm-runtime/BpmRuntime.sol";
import "bpm-runtime/BpmRuntimeLib.sol";
import "bpm-runtime/BpmService.sol";
import "bpm-runtime/ProcessInstance.sol";
import "bpm-runtime/AbstractProcessStateChangeEmitter.sol";

/**
 * @title DefaultProcessInstance
 * @dev Default implementation of the ProcessInstance interface
 */
contract DefaultProcessInstance is ProcessInstance, AbstractDataStorage, AbstractAddressScopes, Owned, AbstractProcessStateChangeEmitter {

    using BpmRuntimeLib for BpmRuntime.ProcessGraph;
    using BpmRuntimeLib for BpmRuntime.ProcessInstance;
    using BpmRuntimeLib for BpmRuntime.ActivityNode;
    using BpmRuntimeLib for BpmRuntime.ActivityInstanceMap;
    using BpmRuntimeLib for BpmRuntime.ActivityInstance;
    using BpmRuntimeLib for ProcessDefinition;

    BpmRuntime.ProcessInstance self;
    
    /**
     * @dev Creates a new ProcessInstance that follows the given ProcessDefinition.
     * throws if the runtime instance could not be created, e.g. due to a non-valid ProcessDefinition.
     * REVERTS if:
     * - the provided ProcessDefinition is NULL
     * @param _processDefinition a ProcessDefinition
     * @param _startedBy (optional) account which initiated the transaction that started the process. If empty, the msg.sender is registered as having started the process
     * @param _activityInstanceId the ID of a subprocess activity instance that initiated this ProcessInstance (optional)
     */
    constructor(ProcessDefinition _processDefinition, address _startedBy, bytes32 _activityInstanceId) public {
        ErrorsLib.revertIf(address(_processDefinition) == 0x0,
            ErrorsLib.NULL_PARAMETER_NOT_ALLOWED(), "DefaultProcessInstance.constructor", "ProcessDefinition is NULL");
        owner = msg.sender;
        self.startedBy = (_startedBy == 0x0) ? msg.sender : _startedBy; //TODO should startedBy be filled when the process is actually started, i.e. switched to ACTIVE? Maybe if it's not filled, it'll get filled in initRuntime?
        self.subProcessActivityInstance = _activityInstanceId;
        self.addr = address(this);
        self.processDefinition = _processDefinition;
        self.state = BpmRuntime.ProcessInstanceState.CREATED;
    }

	/**
	 * @dev Initiates the runtime graph that handles the state of this ProcessInstance and activates the start activity.
     * The state of this ProcessInstance must be CREATED. If initiation is successful, the state of this ProcessInstance is set to ACTIVE.
	 * Triggers REVERT if the ProcessInstance is not in state CREATED.
	 */
    function initRuntime() public {
        ErrorsLib.revertIf(self.state != BpmRuntime.ProcessInstanceState.CREATED,
            ErrorsLib.INVALID_STATE(), "DefaultProcessInstance.initRuntime", "The ProcessInstanceState must be CREATED to initialize");
        self.graph.configure(this);
        // TODO assert() that everything is correct at this point to start the process
        self.graph.activities[self.processDefinition.getStartActivity()].ready = true;
        self.state = BpmRuntime.ProcessInstanceState.ACTIVE;
    }

	/**
	 * @dev Initiates execution of this ProcessInstance consisting of attempting to activate and process any activities and advance the
	 * state of the runtime graph.
	 * @param _service the BpmService managing this ProcessInstance (required for changes to this ProcessInstance and access to the BpmServiceDb)
	 * @return error code indicating success or failure
	 */
    function execute(BpmService _service) public returns (uint error) {
        // TODO should check that the owner of the DB and the owner of the PI match (or that the PI is in the DB)
        // TODO external invocation still possible, but might be OK since it might not result in any processing if the engine has not changed the state of the PI?!
        return self.execute(_service);
    }

	/**
	 * @dev Completes the specified activity
	 * @param _activityInstanceId the activity instance
	 * @param _service the BpmService managing this ProcessInstance (required for changes to this ProcessInstance after the activity completes)
	 * @return BaseErrors.NO_ERROR() if successful
     * @return BaseErrors.RESOURCE_NOT_FOUND() if the activity instance cannot be located
     * @return BaseErrors.INVALID_STATE() if the activity is not in a state to be completed (SUSPENDED or INTERRUPTED)
     * @return BaseErrors.INVALID_ACTOR() if the msg.sender or tx.origin is not the assignee of the task
	 */
	function completeActivity(bytes32 _activityInstanceId, BpmService _service) external returns (uint error) {
        if (!self.activities.rows[_activityInstanceId].exists)
            return BaseErrors.RESOURCE_NOT_FOUND();
        if (self.activities.rows[_activityInstanceId].value.state != BpmRuntime.ActivityInstanceState.SUSPENDED &&
            self.activities.rows[_activityInstanceId].value.state != BpmRuntime.ActivityInstanceState.INTERRUPTED) {
            return BaseErrors.INVALID_STATE();
        }

        // Processing the activity instance is the beginning of a new recursive loop
        error = self.activities.rows[_activityInstanceId].value.execute(this, self.processDefinition, _service);
        if (error != BaseErrors.NO_ERROR()) {
            return;
        }
        
        if (self.activities.rows[_activityInstanceId].value.state == BpmRuntime.ActivityInstanceState.COMPLETED) {
            bytes32 activityId = self.activities.rows[_activityInstanceId].value.activityId;
            self.graph.activities[activityId].instancesCompleted++;
            if (self.graph.activities[activityId].instancesCompleted == self.graph.activities[activityId].instancesTotal) {
                self.graph.activities[activityId].done = true;
            }
        }
        _service.fireActivityUpdateEvent(this, _activityInstanceId);

        // attempt to continue the transaction as there might now be more activities to process
        return self.continueTransaction(_service);
    }

	/**
	 * @dev Aborts this ProcessInstance and halts any ongoing activities. After the abort the ProcessInstance cannot be resurrected.
     * @param _service the BpmService to emit update events for ActivityInstances
	 */
	function abort(BpmService _service)
        external
        pre_onlyByOwner
    {
        self.abort(_service); //TODO the service is only required to emit events after activity instance state changes
        notifyProcessStateChange();
    }

    /**
     * @dev Resolves the target storage location for the specified IN data mapping in the context of the given activity instance.
     * REVERTS: if there is no activity instance with the specified ID in this ProcessInstance
     * @param _activityInstanceId the ID of an activity instance
     * @param _dataMappingId the ID of a data mapping defined for the activity
     * @return dataStorage - the address of a DataStorage
     * @return dataPath - the dataPath under which to find data mapping value
     */
    function resolveInDataLocation(bytes32 _activityInstanceId, bytes32 _dataMappingId) public view returns (address dataStorage, bytes32 dataPath) {
        ErrorsLib.revertIf(!self.activities.rows[_activityInstanceId].exists,
            ErrorsLib.RESOURCE_NOT_FOUND(), "DefaultProcessInstance.resolveInDataLocation", "ActivityInstance not found");
        return self.resolveDataMappingLocation(_activityInstanceId, _dataMappingId, BpmModel.Direction.IN);
    }

    /**
     * @dev Resolves the target storage location for the specified OUT data mapping in the context of the given activity instance.
     * REVERTS: if there is no activity instance with the specified ID in this ProcessInstance
     * @param _activityInstanceId the ID of an activity instance
     * @param _dataMappingId the ID of a data mapping defined for the activity
     * @return dataStorage - the address of a DataStorage
     * @return dataPath - the dataPath under which to find data mapping value
     */
    function resolveOutDataLocation(bytes32 _activityInstanceId, bytes32 _dataMappingId) public view returns (address dataStorage, bytes32 dataPath) {
        ErrorsLib.revertIf(!self.activities.rows[_activityInstanceId].exists,
            ErrorsLib.RESOURCE_NOT_FOUND(), "DefaultProcessInstance.resolveInDataLocation", "ActivityInstance not found");
        return self.resolveDataMappingLocation(_activityInstanceId, _dataMappingId, BpmModel.Direction.OUT);
    }

    /**
     * @dev Resolves the transition condition identified by the given source and target using the data contained in this ProcessInstance
     * @param _sourceId the ID of a model element that is the source element of a transition
     * @param _targetId the ID of a model element that is the target element of a transition
     * @return true if the transition condition exists and evaluates to true, false otherwise
     */
    function resolveTransitionCondition(bytes32 _sourceId, bytes32 _targetId) external view returns (bool) {
        return self.processDefinition.resolveTransitionCondition(_sourceId, _targetId, this);
    }

	/**
	 * @dev Returns the process definition on which this instance is based.
	 * @return the address of a ProcessDefinition
	 */
	function getProcessDefinition() external view returns (address) {
		return self.processDefinition;
	}

    /**
     * @dev Returns the state of this process instance
     * @return the uint8 representation of the BpmRuntime.ProcessInstanceState
     */
    function getState() external view returns (uint8) {
    	return uint8(self.state);
    }

    /**
     * @dev Returns the account that started this process instance
     * @return the address registered when creating the process instance
     */
    function getStartedBy() external view returns (address) {
    	return self.startedBy;
    }

	/**
	 * @dev Returns the number of activity instances currently contained in this ProcessInstance.
	 * Note that this number is subject to change as long as the process isntance is not completed.
	 * @return the number of activity instances
	 */
	function getNumberOfActivityInstances() external view returns (uint size) {
        return self.activities.keys.length;
    }

	/**
	 * @dev Returns the globally unique ID of the activity instance at the specified index in the ProcessInstance.
	 * @param _idx the index position
	 * @return the bytes32 ID
	 */
	function getActivityInstanceAtIndex(uint _idx) external view returns (bytes32) {
        if (_idx < self.activities.keys.length) {
            return self.activities.keys[_idx];
        }
    }

	/**
	 * @dev Returns information about the activity instance with the specified ID
	 * @param _id the global ID of the activity instance
	 * @return created - the creation timestamp
	 * @return completed - the completion timestamp
	 * @return performer - the account who is performing the activity (for interactive activities only)
	 * @return completedBy - the account who completed the activity (for interactive activities only) 
	 * @return activityId - the ID of the activity as defined by the process definition
	 * @return state - the uint8 representation of the BpmRuntime.ActivityInstanceState of this activity instance
	 */
	function getActivityInstanceData(bytes32 _id) external view returns (bytes32 activityId, uint created, uint completed, address performer, address completedBy, uint8 state) {
        if (self.activities.rows[_id].exists) {
            activityId = self.activities.rows[_id].value.activityId;
            created = self.activities.rows[_id].value.created;
            completed = self.activities.rows[_id].value.completed;
            performer = self.activities.rows[_id].value.performer;
            completedBy = self.activities.rows[_id].value.completedBy;
            state = uint8(self.activities.rows[_id].value.state);
        }
    }

  /**
    * @dev Notifies listeners about a process state change
    */
  function notifyProcessStateChange() public {
    for (uint i=0; i<stateChangeListeners.length; i++) {
      stateChangeListeners[i].processStateChanged(this);
    }
  }
}