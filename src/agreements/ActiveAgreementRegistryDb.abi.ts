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
export module ActiveAgreementRegistryDb {
    export function Deploy<Tx>(client: Provider<Tx>, commons_base_ErrorsLib_sol_ErrorsLib: string, commons_collections_MappingsLib_sol_MappingsLib: string, commons_utils_ArrayUtilsLib_sol_ArrayUtilsLib: string): Promise<string> {
        let bytecode = "608060405234801561001057600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550611e07806100606000396000f3fe608060405234801561001057600080fd5b50600436106101165760003560e01c80637f692a2a116100a2578063b9828c5911610071578063b9828c59146105a6578063cc6a2554146105e8578063d194b2cc1461062e578063d8a14226146106b0578063e09c7d5e1461071457610116565b80637f692a2a14610466578063880707cb146104b05780639e6eb6b91461050c578063b4fb869c1461054e57610116565b80632c86c866116100e95780632c86c866146102d45780634f71ddff146103425780636d185d61146103a6578063781f977e146103c45780637a7f5780146103e257610116565b8063098ad95e1461011b5780630a452ad6146101945780631b430596146101d8578063233e29bc14610250575b600080fd5b61017e6004803603608081101561013157600080fd5b8101908080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803560ff16906020019092919080359060200190929190505050610776565b6040518082815260200191505060405180910390f35b6101d6600480360360208110156101aa57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610a84565b005b61020e600480360360408110156101ee57600080fd5b810190808035906020019092919080359060200190929190505050610e81565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6102926004803603602081101561026657600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610edd565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b610300600480360360208110156102ea57600080fd5b8101908080359060200190929190505050610f53565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6103a46004803603604081101561035857600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611002565b005b6103ae6111f8565b6040518082815260200191505060405180910390f35b6103cc611207565b6040518082815260200191505060405180910390f35b610424600480360360208110156103f857600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611217565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b61046e61128d565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6104f2600480360360208110156104c657600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506112b6565b604051808215151515815260200191505060405180910390f35b6105386004803603602081101561052257600080fd5b8101908080359060200190929190505050611380565b6040518082815260200191505060405180910390f35b6105906004803603602081101561056457600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506113a9565b6040518082815260200191505060405180910390f35b6105d2600480360360208110156105bc57600080fd5b81019080803590602001909291905050506115e7565b6040518082815260200191505060405180910390f35b610614600480360360208110156105fe57600080fd5b810190808035906020019092919050505061160b565b604051808215151515815260200191505060405180910390f35b61065a6004803603602081101561064457600080fd5b810190808035906020019092919050505061163b565b604051808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018360ff1660ff168152602001828152602001935050505060405180910390f35b610712600480360360408110156106c657600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506116dc565b005b6107606004803603604081101561072a57600080fd5b8101908080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506118d2565b6040518082815260200191505060405180910390f35b600073__$ecfb6c4d3c3ceff197e19e585a0a53728c$__6375d7bdef6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156107eb611cac565b6040518363ffffffff1660e01b81526004018083151515158152602001806020018060200180602001848103845285818151815260200191508051906020019080838360005b8381101561084c578082015181840152602081019050610831565b50505050905090810190601f1680156108795780820380516001836020036101000a031916815260200191505b5084810383526021815260200180611db26021913960400184810382526026815260200180611d67602691396040019550505050505060006040518083038186803b1580156108c757600080fd5b505af41580156108db573d6000803e3d6000fd5b505050506003600001600086815260200190815260200160002060050160009054906101000a900460ff161561091a57610913611ce9565b9050610a7c565b600360010185908060018154018082558091505090600182039060005260206000200160009091929091909150556003600001600087815260200190815260200160002060000181905550846003600001600087815260200190815260200160002060010160000181905550836003600001600087815260200190815260200160002060010160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550826003600001600087815260200190815260200160002060010160010160146101000a81548160ff02191690836006811115610a1957fe5b021790555081600360000160008781526020019081526020016000206001016002018190555060016003600001600087815260200190815260200160002060050160006101000a81548160ff021916908315150217905550610a79611cf3565b90505b949350505050565b73__$ecfb6c4d3c3ceff197e19e585a0a53728c$__6375d7bdef6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415610af7611cac565b6040518363ffffffff1660e01b81526004018083151515158152602001806020018060200180602001848103845285818151815260200191508051906020019080838360005b83811015610b58578082015181840152602081019050610b3d565b50505050905090810190601f168015610b855780820380516001836020036101000a031916815260200191505b5084810383526021815260200180611db26021913960400184810382526026815260200180611d67602691396040019550505050505060006040518083038186803b158015610bd357600080fd5b505af4158015610be7573d6000803e3d6000fd5b5050505073__$ecfb6c4d3c3ceff197e19e585a0a53728c$__6375d7bdef600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614610c3d611cfc565b6040518363ffffffff1660e01b81526004018083151515158152602001806020018060200180602001848103845285818151815260200191508051906020019080838360005b83811015610c9e578082015181840152602081019050610c83565b50505050905090810190601f168015610ccb5780820380516001836020036101000a031916815260200191505b5084810383526023815260200180611d446023913960400184810382526025815260200180611d8d602591396040019550505050505060006040518083038186803b158015610d1957600080fd5b505af4158015610d2d573d6000803e3d6000fd5b505050508073ffffffffffffffffffffffffffffffffffffffff166000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614610e7e577f0814a6975d95b7ef86d699e601b879308be10e8f2c4c77a940021f3d61b09eaf6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1682604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390a1806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b50565b6000600360000160008481526020019081526020016000206001016003018281548110610eaa57fe5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905092915050565b6000600560008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600160028110610f2a57fe5b0160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b600080600173__$5e3d4bda46c81e962f48c99e99f980d175$__6380ed56bd9091856040518363ffffffff1660e01b81526004018083815260200182815260200192505050604080518083038186803b158015610faf57600080fd5b505af4158015610fc3573d6000803e3d6000fd5b505050506040513d6040811015610fd957600080fd5b810190808051906020019092919080519060200190929190505050809350819250505050919050565b73__$ecfb6c4d3c3ceff197e19e585a0a53728c$__6375d7bdef6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415611075611cac565b6040518363ffffffff1660e01b81526004018083151515158152602001806020018060200180602001848103845285818151815260200191508051906020019080838360005b838110156110d65780820151818401526020810190506110bb565b50505050905090810190601f1680156111035780820380516001836020036101000a031916815260200191505b5084810383526021815260200180611db26021913960400184810382526026815260200180611d67602691396040019550505050505060006040518083038186803b15801561115157600080fd5b505af4158015611165573d6000803e3d6000fd5b5050505080600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206001600281106111b557fe5b0160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050565b60006001800180549050905090565b6000600360010180549050905090565b6000600560008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006002811061126457fe5b0160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6000600173__$5e3d4bda46c81e962f48c99e99f980d175$__63f755018d9091846040518363ffffffff1660e01b8152600401808381526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019250505060206040518083038186803b15801561133e57600080fd5b505af4158015611352573d6000803e3d6000fd5b505050506040513d602081101561136857600080fd5b81019080805190602001909291905050509050919050565b600060036000016000838152602001908152602001600020600101600301805490509050919050565b600073__$ecfb6c4d3c3ceff197e19e585a0a53728c$__6375d7bdef6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141561141e611cac565b6040518363ffffffff1660e01b81526004018083151515158152602001806020018060200180602001848103845285818151815260200191508051906020019080838360005b8381101561147f578082015181840152602081019050611464565b50505050905090810190601f1680156114ac5780820380516001836020036101000a031916815260200191505b5084810383526021815260200180611db26021913960400184810382526026815260200180611d67602691396040019550505050505060006040518083038186803b1580156114fa57600080fd5b505af415801561150e573d6000803e3d6000fd5b50505050600173__$5e3d4bda46c81e962f48c99e99f980d175$__633d4f1a2a90918460016040518463ffffffff1660e01b8152600401808481526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182151515158152602001935050505060206040518083038186803b1580156115a557600080fd5b505af41580156115b9573d6000803e3d6000fd5b505050506040513d60208110156115cf57600080fd5b81019080805190602001909291905050509050919050565b6000600360010182815481106115f957fe5b90600052602060002001549050919050565b60006003600001600083815260200190815260200160002060050160009054906101000a900460ff169050919050565b60008060006003600001600085815260200190815260200160002060010160010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1692506003600001600085815260200190815260200160002060010160010160149054906101000a900460ff1660068111156116b457fe5b9150600360000160008581526020019081526020016000206001016002015490509193909250565b73__$ecfb6c4d3c3ceff197e19e585a0a53728c$__6375d7bdef6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141561174f611cac565b6040518363ffffffff1660e01b81526004018083151515158152602001806020018060200180602001848103845285818151815260200191508051906020019080838360005b838110156117b0578082015181840152602081019050611795565b50505050905090810190601f1680156117dd5780820380516001836020036101000a031916815260200191505b5084810383526021815260200180611db26021913960400184810382526026815260200180611d67602691396040019550505050505060006040518083038186803b15801561182b57600080fd5b505af415801561183f573d6000803e3d6000fd5b5050505080600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006002811061188f57fe5b0160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050565b600073__$ecfb6c4d3c3ceff197e19e585a0a53728c$__6375d7bdef6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415611947611cac565b6040518363ffffffff1660e01b81526004018083151515158152602001806020018060200180602001848103845285818151815260200191508051906020019080838360005b838110156119a857808201518184015260208101905061198d565b50505050905090810190601f1680156119d55780820380516001836020036101000a031916815260200191505b5084810383526021815260200180611db26021913960400184810382526026815260200180611d67602691396040019550505050505060006040518083038186803b158015611a2357600080fd5b505af4158015611a37573d6000803e3d6000fd5b505050506003600001600084815260200190815260200160002060050160009054906101000a900460ff16611a7557611a6e611d39565b9050611ca6565b60036000016000848152602001908152602001600020600101600301805480602002602001604051908101604052809291908181526020018280548015611b1157602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019060010190808311611ac7575b505050505073__$6c578ef14ebe2070bb2319c6842ae291e1$__633da80d669091846040518363ffffffff1660e01b815260040180806020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001828103825284818151815260200191508051906020019060200280838360005b83811015611bb7578082015181840152602081019050611b9c565b50505050905001935050505060206040518083038186803b158015611bdb57600080fd5b505af4158015611bef573d6000803e3d6000fd5b505050506040513d6020811015611c0557600080fd5b8101908080519060200190929190505050611c9b57600360000160008481526020019081526020016000206001016003018290806001815401808255809150509060018203906000526020600020016000909192909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505b611ca3611cf3565b90505b92915050565b60606040518060400160405280600681526020017f4552523430330000000000000000000000000000000000000000000000000000815250905090565b60006103ea905090565b60006001905090565b60606040518060400160405280600681526020017f4552523631310000000000000000000000000000000000000000000000000000815250905090565b60006103e990509056fe53797374656d4f776e65642e7472616e7366657253797374656d4f776e657273686970546865206d73672e73656e646572206973206e6f74207468652073797374656d206f776e6572546865206e65772073797374656d206f776e6572206d757374206e6f74206265204e554c4c53797374656d4f776e65642e7072655f6f6e6c79427953797374656d4f776e6572a265627a7a7231582041278dc7adc74ec91e5f495ec9646cf4df1e87e9117dfb8d33993acd6b5517cd64736f6c634300050c0032";
        bytecode = Replace(bytecode, "$ecfb6c4d3c3ceff197e19e585a0a53728c$", commons_base_ErrorsLib_sol_ErrorsLib);
        bytecode = Replace(bytecode, "$5e3d4bda46c81e962f48c99e99f980d175$", commons_collections_MappingsLib_sol_MappingsLib);
        bytecode = Replace(bytecode, "$6c578ef14ebe2070bb2319c6842ae291e1$", commons_utils_ArrayUtilsLib_sol_ArrayUtilsLib);
        const data = bytecode + client.encode("", []);
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
        LogSystemOwnerChanged(callback: (err: Error, event: any) => void): Readable { return this.client.listen("LogSystemOwnerChanged", this.address, callback); }
        addAgreementToCollection(_id: Buffer, _agreement: string) {
            const data = Encode(this.client).addAgreementToCollection(_id, _agreement);
            return Call<Tx, [number]>(this.client, this.address, data, false, (exec: Uint8Array) => {
                return Decode(this.client, exec).addAgreementToCollection();
            });
        }
        collectionExists(_id: Buffer) {
            const data = Encode(this.client).collectionExists(_id);
            return Call<Tx, [boolean]>(this.client, this.address, data, true, (exec: Uint8Array) => {
                return Decode(this.client, exec).collectionExists();
            });
        }
        createCollection(_id: Buffer, _author: string, _collectionType: number, _packageId: Buffer) {
            const data = Encode(this.client).createCollection(_id, _author, _collectionType, _packageId);
            return Call<Tx, [number]>(this.client, this.address, data, false, (exec: Uint8Array) => {
                return Decode(this.client, exec).createCollection();
            });
        }
        getActiveAgreementAtIndex(_index: number) {
            const data = Encode(this.client).getActiveAgreementAtIndex(_index);
            return Call<Tx, {
                activeAgreement: string;
            }>(this.client, this.address, data, true, (exec: Uint8Array) => {
                return Decode(this.client, exec).getActiveAgreementAtIndex();
            });
        }
        getAgreementAtIndexInCollection(_id: Buffer, _index: number) {
            const data = Encode(this.client).getAgreementAtIndexInCollection(_id, _index);
            return Call<Tx, [string]>(this.client, this.address, data, true, (exec: Uint8Array) => {
                return Decode(this.client, exec).getAgreementAtIndexInCollection();
            });
        }
        getAgreementExecutionProcess(_activeAgreement: string) {
            const data = Encode(this.client).getAgreementExecutionProcess(_activeAgreement);
            return Call<Tx, [string]>(this.client, this.address, data, true, (exec: Uint8Array) => {
                return Decode(this.client, exec).getAgreementExecutionProcess();
            });
        }
        getAgreementFormationProcess(_activeAgreement: string) {
            const data = Encode(this.client).getAgreementFormationProcess(_activeAgreement);
            return Call<Tx, [string]>(this.client, this.address, data, true, (exec: Uint8Array) => {
                return Decode(this.client, exec).getAgreementFormationProcess();
            });
        }
        getCollectionAtIndex(_index: number) {
            const data = Encode(this.client).getCollectionAtIndex(_index);
            return Call<Tx, [Buffer]>(this.client, this.address, data, true, (exec: Uint8Array) => {
                return Decode(this.client, exec).getCollectionAtIndex();
            });
        }
        getCollectionData(_id: Buffer) {
            const data = Encode(this.client).getCollectionData(_id);
            return Call<Tx, {
                author: string;
                collectionType: number;
                packageId: Buffer;
            }>(this.client, this.address, data, true, (exec: Uint8Array) => {
                return Decode(this.client, exec).getCollectionData();
            });
        }
        getNumberOfActiveAgreements() {
            const data = Encode(this.client).getNumberOfActiveAgreements();
            return Call<Tx, {
                size: number;
            }>(this.client, this.address, data, true, (exec: Uint8Array) => {
                return Decode(this.client, exec).getNumberOfActiveAgreements();
            });
        }
        getNumberOfAgreementsInCollection(_id: Buffer) {
            const data = Encode(this.client).getNumberOfAgreementsInCollection(_id);
            return Call<Tx, [number]>(this.client, this.address, data, true, (exec: Uint8Array) => {
                return Decode(this.client, exec).getNumberOfAgreementsInCollection();
            });
        }
        getNumberOfCollections() {
            const data = Encode(this.client).getNumberOfCollections();
            return Call<Tx, [number]>(this.client, this.address, data, true, (exec: Uint8Array) => {
                return Decode(this.client, exec).getNumberOfCollections();
            });
        }
        getSystemOwner() {
            const data = Encode(this.client).getSystemOwner();
            return Call<Tx, [string]>(this.client, this.address, data, true, (exec: Uint8Array) => {
                return Decode(this.client, exec).getSystemOwner();
            });
        }
        isAgreementRegistered(_activeAgreement: string) {
            const data = Encode(this.client).isAgreementRegistered(_activeAgreement);
            return Call<Tx, [boolean]>(this.client, this.address, data, true, (exec: Uint8Array) => {
                return Decode(this.client, exec).isAgreementRegistered();
            });
        }
        registerActiveAgreement(_activeAgreement: string) {
            const data = Encode(this.client).registerActiveAgreement(_activeAgreement);
            return Call<Tx, {
                error: number;
            }>(this.client, this.address, data, false, (exec: Uint8Array) => {
                return Decode(this.client, exec).registerActiveAgreement();
            });
        }
        setAgreementExecutionProcess(_activeAgreement: string, _processInstance: string) {
            const data = Encode(this.client).setAgreementExecutionProcess(_activeAgreement, _processInstance);
            return Call<Tx, void>(this.client, this.address, data, false, (exec: Uint8Array) => {
                return Decode(this.client, exec).setAgreementExecutionProcess();
            });
        }
        setAgreementFormationProcess(_activeAgreement: string, _processInstance: string) {
            const data = Encode(this.client).setAgreementFormationProcess(_activeAgreement, _processInstance);
            return Call<Tx, void>(this.client, this.address, data, false, (exec: Uint8Array) => {
                return Decode(this.client, exec).setAgreementFormationProcess();
            });
        }
        transferSystemOwnership(_newOwner: string) {
            const data = Encode(this.client).transferSystemOwnership(_newOwner);
            return Call<Tx, void>(this.client, this.address, data, false, (exec: Uint8Array) => {
                return Decode(this.client, exec).transferSystemOwnership();
            });
        }
    }
    export const Encode = <Tx>(client: Provider<Tx>) => { return {
        addAgreementToCollection: (_id: Buffer, _agreement: string) => { return client.encode("E09C7D5E", ["bytes32", "address"], _id, _agreement); },
        collectionExists: (_id: Buffer) => { return client.encode("CC6A2554", ["bytes32"], _id); },
        createCollection: (_id: Buffer, _author: string, _collectionType: number, _packageId: Buffer) => { return client.encode("098AD95E", ["bytes32", "address", "uint8", "bytes32"], _id, _author, _collectionType, _packageId); },
        getActiveAgreementAtIndex: (_index: number) => { return client.encode("2C86C866", ["uint256"], _index); },
        getAgreementAtIndexInCollection: (_id: Buffer, _index: number) => { return client.encode("1B430596", ["bytes32", "uint256"], _id, _index); },
        getAgreementExecutionProcess: (_activeAgreement: string) => { return client.encode("233E29BC", ["address"], _activeAgreement); },
        getAgreementFormationProcess: (_activeAgreement: string) => { return client.encode("7A7F5780", ["address"], _activeAgreement); },
        getCollectionAtIndex: (_index: number) => { return client.encode("B9828C59", ["uint256"], _index); },
        getCollectionData: (_id: Buffer) => { return client.encode("D194B2CC", ["bytes32"], _id); },
        getNumberOfActiveAgreements: () => { return client.encode("6D185D61", []); },
        getNumberOfAgreementsInCollection: (_id: Buffer) => { return client.encode("9E6EB6B9", ["bytes32"], _id); },
        getNumberOfCollections: () => { return client.encode("781F977E", []); },
        getSystemOwner: () => { return client.encode("7F692A2A", []); },
        isAgreementRegistered: (_activeAgreement: string) => { return client.encode("880707CB", ["address"], _activeAgreement); },
        registerActiveAgreement: (_activeAgreement: string) => { return client.encode("B4FB869C", ["address"], _activeAgreement); },
        setAgreementExecutionProcess: (_activeAgreement: string, _processInstance: string) => { return client.encode("4F71DDFF", ["address", "address"], _activeAgreement, _processInstance); },
        setAgreementFormationProcess: (_activeAgreement: string, _processInstance: string) => { return client.encode("D8A14226", ["address", "address"], _activeAgreement, _processInstance); },
        transferSystemOwnership: (_newOwner: string) => { return client.encode("0A452AD6", ["address"], _newOwner); }
    }; };
    export const Decode = <Tx>(client: Provider<Tx>, data: Uint8Array) => { return {
        addAgreementToCollection: (): [number] => { return client.decode(data, ["uint256"]); },
        collectionExists: (): [boolean] => { return client.decode(data, ["bool"]); },
        createCollection: (): [number] => { return client.decode(data, ["uint256"]); },
        getActiveAgreementAtIndex: (): {
            activeAgreement: string;
        } => {
            const [activeAgreement] = client.decode(data, ["address"]);
            return { activeAgreement: activeAgreement };
        },
        getAgreementAtIndexInCollection: (): [string] => { return client.decode(data, ["address"]); },
        getAgreementExecutionProcess: (): [string] => { return client.decode(data, ["address"]); },
        getAgreementFormationProcess: (): [string] => { return client.decode(data, ["address"]); },
        getCollectionAtIndex: (): [Buffer] => { return client.decode(data, ["bytes32"]); },
        getCollectionData: (): {
            author: string;
            collectionType: number;
            packageId: Buffer;
        } => {
            const [author, collectionType, packageId] = client.decode(data, ["address", "uint8", "bytes32"]);
            return { author: author, collectionType: collectionType, packageId: packageId };
        },
        getNumberOfActiveAgreements: (): {
            size: number;
        } => {
            const [size] = client.decode(data, ["uint256"]);
            return { size: size };
        },
        getNumberOfAgreementsInCollection: (): [number] => { return client.decode(data, ["uint256"]); },
        getNumberOfCollections: (): [number] => { return client.decode(data, ["uint256"]); },
        getSystemOwner: (): [string] => { return client.decode(data, ["address"]); },
        isAgreementRegistered: (): [boolean] => { return client.decode(data, ["bool"]); },
        registerActiveAgreement: (): {
            error: number;
        } => {
            const [error] = client.decode(data, ["uint256"]);
            return { error: error };
        },
        setAgreementExecutionProcess: (): void => { return; },
        setAgreementFormationProcess: (): void => { return; },
        transferSystemOwnership: (): void => { return; }
    }; };
}