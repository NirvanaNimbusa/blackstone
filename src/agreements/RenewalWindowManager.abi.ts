//Code generated by solts. DO NOT EDIT.
import { Readable } from "stream";
interface Provider<Tx> {
    deploy(msg: Tx, callback: (err: Error, addr: Uint8Array) => void): void;
    call(msg: Tx, callback: (err: Error, exec: Uint8Array) => void): void;
    callSim(msg: Tx, callback: (err: Error, exec: Uint8Array) => void): void;
    listen(signature: string, address: string, callback: (err: Error, event: any) => void): Readable;
    payload(data: string, address?: string): Tx;
    encode(name: string, inputs: string[], ...args: any[]): string;
    decode(data: Uint8Array, outputs: string[]): any;
}
function Call<Tx, Output>(client: Provider<Tx>, addr: string, data: string, isSim: boolean, callback: (exec: Uint8Array) => Output): Promise<Output> {
    const payload = client.payload(data, addr);
    if (isSim)
        return new Promise((resolve, reject) => { client.callSim(payload, (err, exec) => { err ? reject(err) : resolve(callback(exec)); }); });
    else
        return new Promise((resolve, reject) => { client.call(payload, (err, exec) => { err ? reject(err) : resolve(callback(exec)); }); });
}
function Replace(bytecode: string, name: string, address: string): string {
    address = address + Array(40 - address.length + 1).join("0");
    const truncated = name.slice(0, 36);
    const label = "__" + truncated + Array(37 - truncated.length).join("_") + "__";
    while (bytecode.indexOf(label) >= 0)
        bytecode = bytecode.replace(label, address);
    return bytecode;
}
export module RenewalWindowManager {
    export function Deploy<Tx>(client: Provider<Tx>, commons_base_ErrorsLib_sol_ErrorsLib: string, _service: string): Promise<string> {
        let bytecode = "608060405234801561001057600080fd5b50604051611c92380380611c928339818101604052602081101561003357600080fd5b8101908080519060200190929190505050806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050611bfe806100946000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c80632e3b23bf14610051578063867c7151146100b5578063a837c7371461012d578063f472b91814610165575b600080fd5b6100b36004803603604081101561006757600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610274565b005b61012b600480360360808110156100cb57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610491565b005b6101636004803603604081101561014357600080fd5b810190808035906020019092919080359060200190929190505050611207565b005b610272600480360360a081101561017b57600080fd5b8101908080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190803590602001906401000000008111156101ec57600080fd5b8201836020820111156101fe57600080fd5b8035906020019184600183028401116401000000008311171561022057600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506115f9565b005b60008090505b8173ffffffffffffffffffffffffffffffffffffffff1663d779c8a16040518163ffffffff1660e01b815260040160206040518083038186803b1580156102c057600080fd5b505afa1580156102d4573d6000803e3d6000fd5b505050506040513d60208110156102ea57600080fd5b810190808051906020019092919050505081101561048c5760008273ffffffffffffffffffffffffffffffffffffffff16636a78a815836040518263ffffffff1660e01b81526004018082815260200191505060206040518083038186803b15801561035557600080fd5b505afa158015610369573d6000803e3d6000fd5b505050506040513d602081101561037f57600080fd5b810190808051906020019092919050505090507f414e3a2f2f61677265656d656e742d72656e6577616c2d6d616e6167657200007f3c21115bafb882d47eee93f2b1226502c46a815fda34550c15d9e939013b7eed848684604051808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001935050505060405180910390a250808060010191505061027a565b505050565b60008473ffffffffffffffffffffffffffffffffffffffff1663481ea63d856040518263ffffffff1660e01b815260040180828152602001807f61677265656d656e740000000000000000000000000000000000000000000000815250602001915050602060405180830381600087803b15801561050e57600080fd5b505af1158015610522573d6000803e3d6000fd5b505050506040513d602081101561053857600080fd5b8101908080519060200190929190505050905073__$ecfb6c4d3c3ceff197e19e585a0a53728c$__6375d7bdef600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161461059d611a36565b6040518363ffffffff1660e01b81526004018083151515158152602001806020018060200180602001848103845285818151815260200191508051906020019080838360005b838110156105fe5780820151818401526020810190506105e3565b50505050905090810190601f16801561062b5780820380516001836020036101000a031916815260200191505b508481038352601d8152602001807f52656e6577616c57696e646f774d616e616765722e636f6d706c65746500000081525060200184810382526036815260200180611aba603691396040019550505050505060006040518083038186803b15801561069657600080fd5b505af41580156106aa573d6000803e3d6000fd5b50505050600060608273ffffffffffffffffffffffffffffffffffffffff166340514a1a6040518163ffffffff1660e01b815260040160006040518083038186803b1580156106f857600080fd5b505afa15801561070c573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f8201168201806040525060a081101561073657600080fd5b8101908080519060200190929190805190602001909291908051604051939291908464010000000082111561076a57600080fd5b8382019150602082018581111561078057600080fd5b825186600182028301116401000000008211171561079d57600080fd5b8083526020830192505050908051906020019080838360005b838110156107d15780820151818401526020810190506107b6565b50505050905090810190601f1680156107fe5780820380516001836020036101000a031916815260200191505b506040526020018051604051939291908464010000000082111561082157600080fd5b8382019150602082018581111561083757600080fd5b825186600182028301116401000000008211171561085457600080fd5b8083526020830192505050908051906020019080838360005b8381101561088857808201518184015260208101905061086d565b50505050905090810190601f1680156108b55780820380516001836020036101000a031916815260200191505b50604052602001805160405193929190846401000000008211156108d857600080fd5b838201915060208201858111156108ee57600080fd5b825186600182028301116401000000008211171561090b57600080fd5b8083526020830192505050908051906020019080838360005b8381101561093f578082015181840152602081019050610924565b50505050905090810190601f16801561096c5780820380516001836020036101000a031916815260200191505b50604052505050909192935090915050809250819350505073__$ecfb6c4d3c3ceff197e19e585a0a53728c$__6375d7bdef600084146109aa611a36565b6040518363ffffffff1660e01b81526004018083151515158152602001806020018060200180602001848103845285818151815260200191508051906020019080838360005b83811015610a0b5780820151818401526020810190506109f0565b50505050905090810190601f168015610a385780820380516001836020036101000a031916815260200191505b508481038352601d8152602001807f52656e6577616c57696e646f774d616e616765722e636f6d706c65746500000081525060200184810382526040815260200180611af0604091396040019550505050505060006040518083038186803b158015610aa357600080fd5b505af4158015610ab7573d6000803e3d6000fd5b5050505073__$ecfb6c4d3c3ceff197e19e585a0a53728c$__6375d7bdef6000835114610ae2611a36565b6040518363ffffffff1660e01b81526004018083151515158152602001806020018060200180602001848103845285818151815260200191508051906020019080838360005b83811015610b43578082015181840152602081019050610b28565b50505050905090810190601f168015610b705780820380516001836020036101000a031916815260200191505b508481038352601d8152602001807f52656e6577616c57696e646f774d616e616765722e636f6d706c6574650000008152506020018481038252603d815260200180611b8d603d91396040019550505050505060006040518083038186803b158015610bdb57600080fd5b505af4158015610bef573d6000803e3d6000fd5b505050508273ffffffffffffffffffffffffffffffffffffffff16638c2a4dae6040518163ffffffff1660e01b8152600401600060405180830381600087803b158015610c3b57600080fd5b505af1158015610c4f573d6000803e3d6000fd5b50505050610c6086888585856115f9565b610c6a8784610274565b60608373ffffffffffffffffffffffffffffffffffffffff166340514a1a6040518163ffffffff1660e01b815260040160006040518083038186803b158015610cb257600080fd5b505afa158015610cc6573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f8201168201806040525060a0811015610cf057600080fd5b81019080805190602001909291908051906020019092919080516040519392919084640100000000821115610d2457600080fd5b83820191506020820185811115610d3a57600080fd5b8251866001820283011164010000000082111715610d5757600080fd5b8083526020830192505050908051906020019080838360005b83811015610d8b578082015181840152602081019050610d70565b50505050905090810190601f168015610db85780820380516001836020036101000a031916815260200191505b5060405260200180516040519392919084640100000000821115610ddb57600080fd5b83820191506020820185811115610df157600080fd5b8251866001820283011164010000000082111715610e0e57600080fd5b8083526020830192505050908051906020019080838360005b83811015610e42578082015181840152602081019050610e27565b50505050905090810190601f168015610e6f5780820380516001836020036101000a031916815260200191505b5060405260200180516040519392919084640100000000821115610e9257600080fd5b83820191506020820185811115610ea857600080fd5b8251866001820283011164010000000082111715610ec557600080fd5b8083526020830192505050908051906020019080838360005b83811015610ef9578082015181840152602081019050610ede565b50505050905090810190601f168015610f265780820380516001836020036101000a031916815260200191505b506040525050509091929350909192509091509050809150507f414e3a2f2f61677265656d656e742d72656e6577616c2d6d616e6167657200007f46039c22df5b19f9a72be68c732ee25bd5175a070260b990e1e24323d946eeee8888878c8a89898b8a604051808a81526020018981526020018873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018581526020018060200184815260200180602001838103835286818151815260200191508051906020019080838360005b8381101561107c578082015181840152602081019050611061565b50505050905090810190601f1680156110a95780820380516001836020036101000a031916815260200191505b50838103825284818151815260200191508051906020019080838360005b838110156110e25780820151818401526020810190506110c7565b50505050905090810190601f16801561110f5780820380516001836020036101000a031916815260200191505b509b50505050505050505050505060405180910390a2876001600089815260200190815260200160002060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550836001600089815260200190815260200160002060010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600180600089815260200190815260200160002060010160146101000a81548160ff0219169083151502179055505050505050505050565b73__$ecfb6c4d3c3ceff197e19e585a0a53728c$__6375d7bdef6001600085815260200190815260200160002060010160149054906101000a900460ff161561124e611a73565b6040518363ffffffff1660e01b81526004018083151515158152602001806020018060200180602001848103845285818151815260200191508051906020019080838360005b838110156112af578082015181840152602081019050611294565b50505050905090810190601f1680156112dc5780820380516001836020036101000a031916815260200191505b508481038352602b815260200180611b30602b913960400184810382526032815260200180611b5b603291396040019550505050505060006040518083038186803b15801561132a57600080fd5b505af415801561133e573d6000803e3d6000fd5b5050505060006001600084815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905060006001600085815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690508073ffffffffffffffffffffffffffffffffffffffff1663c6e8dfd0846040518263ffffffff1660e01b815260040180828152602001915050600060405180830381600087803b15801561140b57600080fd5b505af115801561141f573d6000803e3d6000fd5b505050508073ffffffffffffffffffffffffffffffffffffffff1663c0647c2e6040518163ffffffff1660e01b8152600401600060405180830381600087803b15801561146b57600080fd5b505af115801561147f573d6000803e3d6000fd5b5050505060008273ffffffffffffffffffffffffffffffffffffffff166368180951866000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff166040518363ffffffff1660e01b8152600401808381526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200192505050602060405180830381600087803b15801561152d57600080fd5b505af1158015611541573d6000803e3d6000fd5b505050506040513d602081101561155757600080fd5b81019080805190602001909291905050509050611572611ab0565b8114156115f25760016000868152602001908152602001600020600080820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556001820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556001820160146101000a81549060ff021916905550505b5050505050565b60008473ffffffffffffffffffffffffffffffffffffffff1663a32dd3b2877f70656e64696e67557365725461736b49640000000000000000000000000000006040518363ffffffff1660e01b81526004018083815260200182815260200192505050602060405180830381600087803b15801561167657600080fd5b505af115801561168a573d6000803e3d6000fd5b505050506040513d60208110156116a057600080fd5b8101908080519060200190929190505050905060008114611a2e5760008090505b8573ffffffffffffffffffffffffffffffffffffffff1663d8619d806040518163ffffffff1660e01b815260040160206040518083038186803b15801561170757600080fd5b505afa15801561171b573d6000803e3d6000fd5b505050506040513d602081101561173157600080fd5b8101908080519060200190929190505050811015611a2c5760008673ffffffffffffffffffffffffffffffffffffffff166321cb9b63836040518263ffffffff1660e01b81526004018082815260200191505060206040518083038186803b15801561179c57600080fd5b505afa1580156117b0573d6000803e3d6000fd5b505050506040513d60208110156117c657600080fd5b810190808051906020019092919050505090506000808873ffffffffffffffffffffffffffffffffffffffff1663db8168fc846040518263ffffffff1660e01b81526004018082815260200191505060c06040518083038186803b15801561182d57600080fd5b505afa158015611841573d6000803e3d6000fd5b505050506040513d60c081101561185757600080fd5b81019080805190602001909291908051906020019092919080519060200190929190805190602001909291908051906020019092919080519060200190929190505050505093505050915081851415611a1c577f414e3a2f2f61677265656d656e742d72656e6577616c2d6d616e6167657200007f0dc7d163f19432808c3206ef71e818b2a1a182c882e42681e9b0cfb09bd6b83584848b8d868d8d604051808881526020018781526020018673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200183815260200180602001828103825283818151815260200191508051906020019080838360005b838110156119db5780820151818401526020810190506119c0565b50505050905090810190601f168015611a085780820380516001836020036101000a031916815260200191505b509850505050505050505060405180910390a25b50505080806001019150506116c1565b505b505050505050565b60606040518060400160405280600681526020017f4552523630300000000000000000000000000000000000000000000000000000815250905090565b60606040518060400160405280600681526020017f4552523432320000000000000000000000000000000000000000000000000000815250905090565b6000600190509056fe456d7074792061677265656d656e74206164647265737320666f756e64206f6e20676976656e2050726f63657373496e7374616e636565787069726174696f6e4461746520697320302e204d75737420626520612076616c69642074696d6520666f7220616374697669747920746f20636c6f73652e52656e6577616c57696e646f774d616e616765722e7465726d696e61746552656e6577616c57696e646f775468652070726f7669646564204163746976697479496e7374616e6365204944206973206e6f742072656769737465726564636c6f73654f666673657420697320656d7074792e204d75737420626520612076616c69642049534f2038363031206f666673657420737472696e672ea265627a7a72315820ef17d7ba72340277f92a39ff0a34951e2b9a07f8a93f50102b0b19e60a9fd1e464736f6c634300050c0032";
        bytecode = Replace(bytecode, "$ecfb6c4d3c3ceff197e19e585a0a53728c$", commons_base_ErrorsLib_sol_ErrorsLib);
        const data = bytecode + client.encode("", ["address"], _service);
        const payload = client.payload(data);
        return new Promise((resolve, reject) => { client.deploy(payload, (err, addr) => {
            if (err)
                reject(err);
            else {
                const address = Buffer.from(addr).toString("hex").toUpperCase();
                resolve(address);
            }
        }); });
    }
    export class Contract<Tx> {
        private client: Provider<Tx>;
        public address: string;
        constructor(client: Provider<Tx>, address: string) {
            this.client = client;
            this.address = address;
        }
        LogPendingUserTaskCloseOffset(callback: (err: Error, event: any) => void): Readable { return this.client.listen("LogPendingUserTaskCloseOffset", this.address, callback); }
        LogRenewalVoteNotificationTrigger(callback: (err: Error, event: any) => void): Readable { return this.client.listen("LogRenewalVoteNotificationTrigger", this.address, callback); }
        LogRenewalWindowCloseOffset(callback: (err: Error, event: any) => void): Readable { return this.client.listen("LogRenewalWindowCloseOffset", this.address, callback); }
        complete(_piAddress: string, _activityInstanceId: Buffer, _activityId: Buffer, _txPerformer: string) {
            const data = Encode(this.client).complete(_piAddress, _activityInstanceId, _activityId, _txPerformer);
            return Call<Tx, void>(this.client, this.address, data, false, (exec: Uint8Array) => {
                return Decode(this.client, exec).complete();
            });
        }
        emitFranchiseeDetails(_piAddress: string, _agreement: string) {
            const data = Encode(this.client).emitFranchiseeDetails(_piAddress, _agreement);
            return Call<Tx, void>(this.client, this.address, data, false, (exec: Uint8Array) => {
                return Decode(this.client, exec).emitFranchiseeDetails();
            });
        }
        emitPendingUserTaskDetails(_activityInstanceId: Buffer, _piAddress: string, _agreement: string, _scheduleBase: number, _offset: string) {
            const data = Encode(this.client).emitPendingUserTaskDetails(_activityInstanceId, _piAddress, _agreement, _scheduleBase, _offset);
            return Call<Tx, void>(this.client, this.address, data, false, (exec: Uint8Array) => {
                return Decode(this.client, exec).emitPendingUserTaskDetails();
            });
        }
        terminateRenewalWindow(_terminateActivityId: Buffer, _nextExpirationDate: number) {
            const data = Encode(this.client).terminateRenewalWindow(_terminateActivityId, _nextExpirationDate);
            return Call<Tx, void>(this.client, this.address, data, false, (exec: Uint8Array) => {
                return Decode(this.client, exec).terminateRenewalWindow();
            });
        }
    }
    export const Encode = <Tx>(client: Provider<Tx>) => { return {
        complete: (_piAddress: string, _activityInstanceId: Buffer, _activityId: Buffer, _txPerformer: string) => { return client.encode("867C7151", ["address", "bytes32", "bytes32", "address"], _piAddress, _activityInstanceId, _activityId, _txPerformer); },
        emitFranchiseeDetails: (_piAddress: string, _agreement: string) => { return client.encode("2E3B23BF", ["address", "address"], _piAddress, _agreement); },
        emitPendingUserTaskDetails: (_activityInstanceId: Buffer, _piAddress: string, _agreement: string, _scheduleBase: number, _offset: string) => { return client.encode("F472B918", ["bytes32", "address", "address", "int256", "string"], _activityInstanceId, _piAddress, _agreement, _scheduleBase, _offset); },
        terminateRenewalWindow: (_terminateActivityId: Buffer, _nextExpirationDate: number) => { return client.encode("A837C737", ["bytes32", "int256"], _terminateActivityId, _nextExpirationDate); }
    }; };
    export const Decode = <Tx>(client: Provider<Tx>, data: Uint8Array) => { return {
        complete: (): void => { return; },
        emitFranchiseeDetails: (): void => { return; },
        emitPendingUserTaskDetails: (): void => { return; },
        terminateRenewalWindow: (): void => { return; }
    }; };
}