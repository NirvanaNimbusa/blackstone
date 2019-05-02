pragma solidity ^0.4.25;

import "commons-base/ErrorsLib.sol";
import "commons-utils/ArrayUtilsLib.sol";
import "commons-auth/Permissioned.sol";

/**
 * @title AbstractPermissioned
 * @dev Abstract implementation of the Permissioned interface
 */
contract AbstractPermissioned is Permissioned {

    using ArrayUtilsLib for address[];

    bytes32 public constant ROLE_ID_PERMISSION_ADMIN = keccak256(abi.encodePacked("permission.administrator"));

    struct Permission {
        address[] holders;
        bool multiHolder;
        bool revocable;
        bool transferable;
        bool exists;
    }

    mapping(bytes32 => Permission) permissions;

    /**
     * @dev Modifier to guard functions that should be invoked by a msg.sender with a given permission
     * REVERTS if:
     * - the msg.sender does not hold the specfied permission
     * @param _permission the permission for which to check
     */
    modifier pre_requiresPermission(bytes32 _permission) {
        ErrorsLib.revertIf(!hasPermission(_permission, msg.sender),
            ErrorsLib.UNAUTHORIZED(), "AbstractPermissioned.pre_requiresPermission", "The msg.sender does not have the required permission");
        _;
    }

    /**
     * @dev Sets the administator permission holder to the specified address. This is a convenience function to provide flexibility around
     * initializing the permission administrator, e.g. outside of the constructor.
     * If the given address is empty, the msg.sender will be set as the permission admin.
     * REVERTS if:
     * - the ROLE_ID_PERMISSION_ADMIN permission has already been set
     */
    function initializeAdministrator(address _admin) internal {
        ErrorsLib.revertIf(permissions[ROLE_ID_PERMISSION_ADMIN].exists,
            ErrorsLib.OVERWRITE_NOT_ALLOWED(), "AbstractPermissioned.initializeAdministrator", "The permission admin has already been set and cannot be overwritten");
        permissions[ROLE_ID_PERMISSION_ADMIN].holders.push(_admin == address(0) ? msg.sender : _admin);
        permissions[ROLE_ID_PERMISSION_ADMIN].multiHolder = true;
        permissions[ROLE_ID_PERMISSION_ADMIN].revocable = false;
        permissions[ROLE_ID_PERMISSION_ADMIN].transferable = true;
        permissions[ROLE_ID_PERMISSION_ADMIN].exists = true;
    }

    /**
     * @dev Creates a new permission with the specified identifier and attributes
     * REVERTS if:
     * - the caller does not hold ROLE_ID_PERMISSION_ADMIN permission
     * - a permission with the same identifier already exists
     * @param _permission the permission identifier
     * @param _multiHolder determines whether the permission can be granted to multiple people at the same time
     * @param _revocable determines whether the permission can be revoked by the permission administrator
     * @param _transferable determines whether holders of the permission is allowed to transfer their grant to someone else
     */
    function createPermission(bytes32 _permission, bool _multiHolder, bool _revocable, bool _transferable)
        external
        pre_requiresPermission(ROLE_ID_PERMISSION_ADMIN)
    {
        ErrorsLib.revertIf(permissions[_permission].exists,
            ErrorsLib.RESOURCE_ALREADY_EXISTS(), "AbstractPermissioned.createPermission", "A permission with the identifier name already exists");
        permissions[_permission].multiHolder = _multiHolder;
        permissions[_permission].revocable = _revocable;
        permissions[_permission].transferable = _transferable;
        permissions[_permission].exists = true;
    }

    /**
     * @dev Grants the specified permission to the given holder.
     * If the permission is a "multiHolder" permission, the address will be added to the list of permission holders (if it hadn't been added previously).
     * For a non-multiHolder permission, the permission is only granted if it hadn't been set before, i.e. a previous holder will not be overwritten.
     * In this case the existing holder must relinquish the permission via the transferPermission(...) function.
     * REVERTS if:
     * - the caller does not hold ROLE_ID_PERMISSION_ADMIN permission
     * - the specified permission does not exist
     * @param _permission the permission identifier
     * @param _newHolder the address being granted the permission
     */
    function grantPermission(bytes32 _permission, address _newHolder)
        external
        pre_requiresPermission(ROLE_ID_PERMISSION_ADMIN)
    {
        ErrorsLib.revertIf(!permissions[_permission].exists,
            ErrorsLib.RESOURCE_NOT_FOUND(), "AbstractPermissioned.grantPermission", "The specified permission does not exist. Create it first.");
        if (permissions[_permission].multiHolder) {
            // check if the new holder is already registered
            if (!permissions[_permission].holders.contains(_newHolder))
                permissions[_permission].holders.push(_newHolder);
        }
        // a single-held permission that has already been granted cannot be overwritten here. Use transferPermission(...)!
        else if (permissions[_permission].holders[0] == address(0)) {
            permissions[_permission].holders[0] = _newHolder;
        }
    }

    /**
     * @dev Transfers the specified permission from the sender to the given holder.
     * The new address will be added in the same position as the old holder's address (instead of removing the old address and pushing in the new one)
     * REVERTS if:
     * - the caller does not hold specified permission
     * - the specified permission does not exist
     * - the new holder already holds the specified permission
     * @param _permission the permission identifier
     * @param _newHolder the address the permission is to be transfered to
     */
    function transferPermission(bytes32 _permission, address _newHolder)
        external
    {
        ErrorsLib.revertIf(!permissions[_permission].exists,
            ErrorsLib.RESOURCE_NOT_FOUND(), "AbstractPermissioned.transferPermission", "The specified permission does not exist. Create it first.");
        ErrorsLib.revertIf(!permissions[_permission].transferable,
            ErrorsLib.INVALID_STATE(), "AbstractPermissioned.transferPermission", "The specified permission is not transferable");
        ErrorsLib.revertIf(permissions[_permission].holders.contains(_newHolder),
            ErrorsLib.RESOURCE_ALREADY_EXISTS(), "AbstractPermissioned.transferPermission", "The new holder already holds the specified permission");
        // to transfer a permission, it does not matter whether it's multi-holder or not.
        for (uint i=0; i<permissions[_permission].holders.length; i++) {
            if (permissions[_permission].holders[i] == msg.sender) {
                // we don't shift an entries in the array to fill the empty slot here, but instead try to re-use empty slots when permissions are granted
                permissions[_permission].holders[i] = _newHolder;
                return;
            }
        }
        revert(ErrorsLib.format(ErrorsLib.UNAUTHORIZED(), "AbstractPermissioned.transferPermission", "The msg.sender does not hold the specified permission"));
    }

    /**
     * @dev Revokes the specified permission from the given holder.
     * REVERTS if:
     * - the caller does not hold ROLE_ID_PERMISSION_ADMIN permission
     * - the specified permission does not exist
     * - the given holder does not hold the specified permission
     * @param _permission the permission identifier
     * @param _holder the address having the permission revoked
     */
    function revokePermission(bytes32 _permission, address _holder)
        external
        pre_requiresPermission(ROLE_ID_PERMISSION_ADMIN)
    {
        ErrorsLib.revertIf(!permissions[_permission].exists,
            ErrorsLib.RESOURCE_NOT_FOUND(), "AbstractPermissioned.revokePermission", "The specified permission does not exist. Create it first.");
        ErrorsLib.revertIf(!permissions[_permission].revocable,
            ErrorsLib.INVALID_STATE(), "AbstractPermissioned.revokePermission", "The specified permission is not revocable");
        bool removed = false;
        for (uint i=0; i<permissions[_permission].holders.length; i++) {
            if (removed || permissions[_permission].holders[i] == _holder) {
                if (i + 1 < permissions[_permission].holders.length)
                    permissions[_permission].holders[i] = permissions[_permission].holders[i + 1];
                if (!removed)
                    removed = true;
            }
        }
        ErrorsLib.revertIf(!removed,
            ErrorsLib.RESOURCE_NOT_FOUND(), "AbstractPermissioned.revokePermission", "The specified account does not hold this permission");
        permissions[_permission].holders.length--;
    }

    /**
     * @dev Indicates whether the specified permission is held by the given holder.
     * @param _permission the permission identifier
     * @param _holder the address holding the permission
     * @return true if the permission holders includes the given address
     */
    function hasPermission(bytes32 _permission, address _holder) public view returns (bool result) {
        if (permissions[_permission].exists) {
            result = permissions[_permission].multiHolder ?
                permissions[_permission].holders.contains(_holder) :
                (permissions[_permission].holders.length > 0 &&
                 permissions[_permission].holders[0] == _holder);
        }
    }

}