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
export module DefaultUserAccount {
    export function Deploy<Tx>(client: Provider<Tx>, commons_base_ErrorsLib_sol_ErrorsLib: string, commons_collections_MappingsLib_sol_MappingsLib: string): Promise<string> {
        let bytecode = "6080604052600160008060016000806301ffc9a760e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060006101000a81548160ff02191690831515021790555082600160006003811061006957fe5b602091828204019190066101000a81548160ff021916908360ff160217905550816001806003811061009757fe5b602091828204019190066101000a81548160ff021916908360ff1602179055508060016002600381106100c657fe5b602091828204019190066101000a81548160ff021916908360ff16021790555061013b60405160200180807f676574417274696661637456657273696f6e282900000000000000000000000081525060140190506040516020818303038152906040528051906020012061014360201b60201c565b50505061022f565b63ffffffff60e01b817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614156101c3576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602f81526020018062001f47602f913960400191505060405180910390fd5b6001600080837bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060006101000a81548160ff02191690831515021790555050565b611d08806200023f6000396000f3fe608060405234801561001057600080fd5b50600436106100cf5760003560e01c8063756b2e6c1161008c578063893d20e811610066578063893d20e81461042c578063e10533c614610476578063f085f6dd146104d2578063f2fde38b146104f6576100cf565b8063756b2e6c146103495780637589adb71461038f57806378bc0b0d146103b3576100cf565b806301ffc9a7146100d45780631cc14a1d1461013957806322bee49414610157578063485cc9551461026957806357e0ebca146102cd5780635c030138146102f1575b600080fd5b61011f600480360360208110156100ea57600080fd5b8101908080357bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916906020019092919050505061053a565b604051808215151515815260200191505060405180910390f35b6101416105a1565b6040518082815260200191505060405180910390f35b6101ee6004803603604081101561016d57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001906401000000008111156101aa57600080fd5b8201836020820111156101bc57600080fd5b803590602001918460018302840111640100000000831117156101de57600080fd5b90919293919293905050506105c5565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561022e578082015181840152602081019050610213565b50505050905090810190601f16801561025b5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6102cb6004803603604081101561027f57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610d51565b005b6102d561124f565b604051808260ff1660ff16815260200191505060405180910390f35b6103336004803603602081101561030757600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061127a565b6040518082815260200191505060405180910390f35b610351611376565b6040518082600360200280838360005b8381101561037c578082015181840152602081019050610361565b5050505090500191505060405180910390f35b6103976113e7565b604051808260ff1660ff16815260200191505060405180910390f35b610416600480360360608110156103c957600080fd5b8101908080606001906003806020026040519081016040528092919082600360200280828437600081840152601f19601f8201169050808301925050505050509192919290505050611411565b6040518082815260200191505060405180910390f35b610434611487565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b61047e6114b1565b60405180827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200191505060405180910390f35b6104da6114fb565b604051808260ff1660ff16815260200191505060405180910390f35b6105386004803603602081101561050c57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611526565b005b6000806000837bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060009054906101000a900460ff169050919050565b7f414e3a2f2f757365722d6163636f756e7473000000000000000000000000000081565b60606000600260019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161490508061074c5760008090505b60036000016001018054905081101561074a576003600001600101818154811061064d57fe5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16639b9016ae336040518263ffffffff1660e01b8152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060206040518083038186803b1580156106f457600080fd5b505afa158015610708573d6000803e3d6000fd5b505050506040513d602081101561071e57600080fd5b81019080805190602001909291905050501561073d576001915061074a565b8080600101915050610627565b505b73__$ecfb6c4d3c3ceff197e19e585a0a53728c$__6375d7bdef821561077061199b565b6040518363ffffffff1660e01b81526004018083151515158152602001806020018060200180602001848103845285818151815260200191508051906020019080838360005b838110156107d15780820151818401526020810190506107b6565b50505050905090810190601f1680156107fe5780820380516001836020036101000a031916815260200191505b508481038352602c815260200180611c7e602c91396040018481038252602b815260200180611c2a602b91396040019550505050505060006040518083038186803b15801561084c57600080fd5b505af4158015610860573d6000803e3d6000fd5b5050505073__$ecfb6c4d3c3ceff197e19e585a0a53728c$__6375d7bdef600073ffffffffffffffffffffffffffffffffffffffff168773ffffffffffffffffffffffffffffffffffffffff16146108b66119d8565b6040518363ffffffff1660e01b81526004018083151515158152602001806020018060200180602001848103845285818151815260200191508051906020019080838360005b838110156109175780820151818401526020810190506108fc565b50505050905090810190601f1680156109445780820380516001836020036101000a031916815260200191505b508481038352601e8152602001807f44656661756c74557365724163636f756e742e666f727761726443616c6c0000815250602001848103825260208152602001807f5461726765742061646472657373206d757374206e6f7420626520656d7074798152506020019550505050505060006040518083038186803b1580156109cc57600080fd5b505af41580156109e0573d6000803e3d6000fd5b505050506000606085858080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f82011690508083019250505050505050905060405160008183516020850160008c5af192505060003d9050806040519080825280601f01601f191660200182016040528015610a7b5781602001600182028038833980820191505090505b509450806000602087013e82610d4657600085511115610a9c578060208601fd5b73__$ecfb6c4d3c3ceff197e19e585a0a53728c$__6359a13699610abe611a15565b6040518263ffffffff1660e01b815260040180806020018060200180602001848103845285818151815260200191508051906020019080838360005b83811015610b15578082015181840152602081019050610afa565b50505050905090810190601f168015610b425780820380516001836020036101000a031916815260200191505b508481038352601e8152602001807f44656661756c74557365724163636f756e742e666f727761726443616c6c000081525060200184810382526041815260200180611be96041913960600194505050505060006040518083038186803b158015610bac57600080fd5b505af4158015610bc0573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f820116820180604052506020811015610bea57600080fd5b8101908080516040519392919084640100000000821115610c0a57600080fd5b83820191506020820185811115610c2057600080fd5b8251866001820283011164010000000082111715610c3d57600080fd5b8083526020830192505050908051906020019080838360005b83811015610c71578082015181840152602081019050610c56565b50505050905090810190601f168015610c9e5780820380516001836020036101000a031916815260200191505b506040525050506040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b83811015610d0b578082015181840152602081019050610cf0565b50505050905090810190601f168015610d385780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b505050509392505050565b73__$ecfb6c4d3c3ceff197e19e585a0a53728c$__6375d7bdef600260009054906101000a900460ff16610d83611a52565b6040518363ffffffff1660e01b81526004018083151515158152602001806020018060200180602001848103845285818151815260200191508051906020019080838360005b83811015610de4578082015181840152602081019050610dc9565b50505050905090810190601f168015610e115780820380516001836020036101000a031916815260200191505b508481038352602a815260200180611bbf602a913960400184810382526029815260200180611c55602991396040019550505050505060006040518083038186803b158015610e5f57600080fd5b505af4158015610e73573d6000803e3d6000fd5b5050505073__$ecfb6c4d3c3ceff197e19e585a0a53728c$__6375d7bdef600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16148015610ef95750600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16145b610f016119d8565b6040518363ffffffff1660e01b81526004018083151515158152602001806020018060200180602001848103845285818151815260200191508051906020019080838360005b83811015610f62578082015181840152602081019050610f47565b50505050905090810190601f168015610f8f5780820380516001836020036101000a031916815260200191505b508481038352601e8152602001807f44656661756c74557365724163636f756e742e636f6e7374727563746f7200008152506020018481038252602a815260200180611caa602a91396040019550505050505060006040518083038186803b158015610ffa57600080fd5b505af415801561100e573d6000803e3d6000fd5b5050505081600260016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161461115a57600360000173__$5e3d4bda46c81e962f48c99e99f980d175$__63acdb2abb90918360016040518463ffffffff1660e01b8152600401808481526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182151515158152602001935050505060206040518083038186803b15801561111d57600080fd5b505af4158015611131573d6000803e3d6000fd5b505050506040513d602081101561114757600080fd5b8101908080519060200190929190505050505b6001600360020160006101000a81548160ff0219169083151502179055507f414e3a2f2f757365722d6163636f756e747300000000000000000000000000007f12c1bf8a60d92ffee5a1fba7a0d7f7511ed8de7327bfcfff1e1767ca79faf8183084604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390a26001600260006101000a81548160ff0219169083151502179055505050565b6000600160006003811061125f57fe5b602091828204019190069054906101000a900460ff16905090565b600061136f60016003806020026040519081016040528092919082600380156112de576020028201916000905b82829054906101000a900460ff1660ff16815260200190600101906020826000010492830192600103820291508084116112a75790505b50505050508373ffffffffffffffffffffffffffffffffffffffff1663756b2e6c6040518163ffffffff1660e01b815260040160606040518083038186803b15801561132957600080fd5b505afa15801561133d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250606081101561136257600080fd5b8101908091905050611a8f565b9050919050565b61137e611b9c565b60016003806020026040519081016040528092919082600380156113dd576020028201916000905b82829054906101000a900460ff1660ff16815260200190600101906020826000010492830192600103820291508084116113a65790505b5050505050905090565b6000600180600381106113f657fe5b602091828204019190069054906101000a900460ff16905090565b60006114806001600380602002604051908101604052809291908260038015611475576020028201916000905b82829054906101000a900460ff1660ff168152602001906001019060208260000104928301926001038202915080841161143e5790505b505050505083611a8f565b9050919050565b6000600260019054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60405160200180807f676574417274696661637456657273696f6e282900000000000000000000000081525060140190506040516020818303038152906040528051906020012081565b6000600160026003811061150b57fe5b602091828204019190069054906101000a900460ff16905090565b73__$ecfb6c4d3c3ceff197e19e585a0a53728c$__6375d7bdef600260019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141561159a61199b565b6040518363ffffffff1660e01b81526004018083151515158152602001806020018060200180602001848103845285818151815260200191508051906020019080838360005b838110156115fb5780820151818401526020810190506115e0565b50505050905090810190601f1680156116285780820380516001836020036101000a031916815260200191505b50848103835260158152602001807f4f776e65642e7072655f6f6e6c7942794f776e657200000000000000000000008152506020018481038252601f8152602001807f546865206d73672e73656e646572206973206e6f7420746865206f776e6572008152506020019550505050505060006040518083038186803b1580156116b057600080fd5b505af41580156116c4573d6000803e3d6000fd5b5050505073__$ecfb6c4d3c3ceff197e19e585a0a53728c$__6375d7bdef600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161461171a6119d8565b6040518363ffffffff1660e01b81526004018083151515158152602001806020018060200180602001848103845285818151815260200191508051906020019080838360005b8381101561177b578082015181840152602081019050611760565b50505050905090810190601f1680156117a85780820380516001836020036101000a031916815260200191505b50848103835260178152602001807f4f776e65642e7472616e736665724f776e6572736869700000000000000000008152506020018481038252601e8152602001807f546865206e6577206f776e6572206d757374206e6f74206265204e554c4c00008152506020019550505050505060006040518083038186803b15801561183057600080fd5b505af4158015611844573d6000803e3d6000fd5b505050508073ffffffffffffffffffffffffffffffffffffffff16600260019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16146119985780600260016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055507ffcf23a92150d56e85e3a3d33b357493246e55783095eb6a733eb8439ffc752c8600260019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1682604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390a15b50565b60606040518060400160405280600681526020017f4552523430330000000000000000000000000000000000000000000000000000815250905090565b60606040518060400160405280600681526020017f4552523631310000000000000000000000000000000000000000000000000000815250905090565b60606040518060400160405280600681526020017f4552523530300000000000000000000000000000000000000000000000000000815250905090565b60606040518060400160405280600681526020017f4552523630300000000000000000000000000000000000000000000000000000815250905090565b6000611abd83600060038110611aa157fe5b602002015183600060038110611ab357fe5b6020020151611b42565b905060008114611acf57809050611b3c565b611afb83600160038110611adf57fe5b602002015183600160038110611af157fe5b6020020151611b42565b905060008114611b0d57809050611b3c565b611b3983600260038110611b1d57fe5b602002015183600260038110611b2f57fe5b6020020151611b42565b90505b92915050565b60008260ff168260ff161415611b5b5760009050611b96565b8260ff168260ff161015611b91577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff9050611b96565b600190505b92915050565b604051806060016040528060039060208202803883398082019150509050509056fe416273747261637444656c65676174655461726765742e7072655f706f73745f696e697469616c697a65546865207461726765742066756e6374696f6e206f662074686520666f72776172642063616c6c20726576657274656420776974686f7574206120726561736f6e43616c6c6572206973206e656974686572206f776e6572206e6f72206b6e6f776e2065636f73797374656d54686520636f6e74726163742068617320616c7265616479206265656e20696e697469616c697a656444656661756c74557365724163636f756e742e7072655f6f6e6c79417574686f72697a656443616c6c6572734f6e65206f66206f776e6572206f722065636f73797374656d206d7573742062652070726f7669646564a265627a7a723158201d351324d9014a9a789609994ac939ce0a66d4967b51ca1d85f117215fb06a3c64736f6c634300050c0032466f7262696464656e2076616c7565203078666666666666666620666f722045524331363520696e74657266616365";
        bytecode = Replace(bytecode, "$ecfb6c4d3c3ceff197e19e585a0a53728c$", commons_base_ErrorsLib_sol_ErrorsLib);
        bytecode = Replace(bytecode, "$5e3d4bda46c81e962f48c99e99f980d175$", commons_collections_MappingsLib_sol_MappingsLib);
        const data = bytecode;
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
        LogOwnerChanged(callback: (err: Error, event: any) => void): Readable { return this.client.listen("LogOwnerChanged", this.address, callback); }
        LogUserCreation(callback: (err: Error, event: any) => void): Readable { return this.client.listen("LogUserCreation", this.address, callback); }
        ERC165_ID_VERSIONED_ARTIFACT() {
            const data = Encode(this.client).ERC165_ID_VERSIONED_ARTIFACT();
            return Call<Tx, [Buffer]>(this.client, this.address, data, true, (exec: Uint8Array) => {
                return Decode(this.client, exec).ERC165_ID_VERSIONED_ARTIFACT();
            });
        }
        EVENT_ID_USER_ACCOUNTS() {
            const data = Encode(this.client).EVENT_ID_USER_ACCOUNTS();
            return Call<Tx, [Buffer]>(this.client, this.address, data, true, (exec: Uint8Array) => {
                return Decode(this.client, exec).EVENT_ID_USER_ACCOUNTS();
            });
        }
        compareArtifactVersion(_other: string, _version: [number, number, number]) {
            const data = Encode(this.client).compareArtifactVersion(_other, _version);
            return Call<Tx, {
                result: number;
            }>(this.client, this.address, data, true, (exec: Uint8Array) => {
                return Decode(this.client, exec).compareArtifactVersion();
            });
        }
        forwardCall(_target: string, _payload: Buffer) {
            const data = Encode(this.client).forwardCall(_target, _payload);
            return Call<Tx, {
                returnData: Buffer;
            }>(this.client, this.address, data, false, (exec: Uint8Array) => {
                return Decode(this.client, exec).forwardCall();
            });
        }
        getArtifactVersion() {
            const data = Encode(this.client).getArtifactVersion();
            return Call<Tx, [[number, number, number]]>(this.client, this.address, data, true, (exec: Uint8Array) => {
                return Decode(this.client, exec).getArtifactVersion();
            });
        }
        getArtifactVersionMajor() {
            const data = Encode(this.client).getArtifactVersionMajor();
            return Call<Tx, [number]>(this.client, this.address, data, true, (exec: Uint8Array) => {
                return Decode(this.client, exec).getArtifactVersionMajor();
            });
        }
        getArtifactVersionMinor() {
            const data = Encode(this.client).getArtifactVersionMinor();
            return Call<Tx, [number]>(this.client, this.address, data, true, (exec: Uint8Array) => {
                return Decode(this.client, exec).getArtifactVersionMinor();
            });
        }
        getArtifactVersionPatch() {
            const data = Encode(this.client).getArtifactVersionPatch();
            return Call<Tx, [number]>(this.client, this.address, data, true, (exec: Uint8Array) => {
                return Decode(this.client, exec).getArtifactVersionPatch();
            });
        }
        getOwner() {
            const data = Encode(this.client).getOwner();
            return Call<Tx, [string]>(this.client, this.address, data, true, (exec: Uint8Array) => {
                return Decode(this.client, exec).getOwner();
            });
        }
        initialize(_owner: string, _ecosystem: string) {
            const data = Encode(this.client).initialize(_owner, _ecosystem);
            return Call<Tx, void>(this.client, this.address, data, false, (exec: Uint8Array) => {
                return Decode(this.client, exec).initialize();
            });
        }
        supportsInterface(_interfaceId: Buffer) {
            const data = Encode(this.client).supportsInterface(_interfaceId);
            return Call<Tx, [boolean]>(this.client, this.address, data, true, (exec: Uint8Array) => {
                return Decode(this.client, exec).supportsInterface();
            });
        }
        transferOwnership(_newOwner: string) {
            const data = Encode(this.client).transferOwnership(_newOwner);
            return Call<Tx, void>(this.client, this.address, data, false, (exec: Uint8Array) => {
                return Decode(this.client, exec).transferOwnership();
            });
        }
    }
    export const Encode = <Tx>(client: Provider<Tx>) => { return {
        ERC165_ID_VERSIONED_ARTIFACT: () => { return client.encode("E10533C6", []); },
        EVENT_ID_USER_ACCOUNTS: () => { return client.encode("1CC14A1D", []); },
        compareArtifactVersion: (_other: string, _version: [number, number, number]) => {
            if (typeof _other === "string")
                return client.encode("5C030138", ["address"], _other);
            if (typeof _version === "string")
                return client.encode("78BC0B0D", ["uint8[3]"], _version);
        },
        forwardCall: (_target: string, _payload: Buffer) => { return client.encode("22BEE494", ["address", "bytes"], _target, _payload); },
        getArtifactVersion: () => { return client.encode("756B2E6C", []); },
        getArtifactVersionMajor: () => { return client.encode("57E0EBCA", []); },
        getArtifactVersionMinor: () => { return client.encode("7589ADB7", []); },
        getArtifactVersionPatch: () => { return client.encode("F085F6DD", []); },
        getOwner: () => { return client.encode("893D20E8", []); },
        initialize: (_owner: string, _ecosystem: string) => { return client.encode("485CC955", ["address", "address"], _owner, _ecosystem); },
        supportsInterface: (_interfaceId: Buffer) => { return client.encode("01FFC9A7", ["bytes4"], _interfaceId); },
        transferOwnership: (_newOwner: string) => { return client.encode("F2FDE38B", ["address"], _newOwner); }
    }; };
    export const Decode = <Tx>(client: Provider<Tx>, data: Uint8Array) => { return {
        ERC165_ID_VERSIONED_ARTIFACT: (): [Buffer] => { return client.decode(data, ["bytes4"]); },
        EVENT_ID_USER_ACCOUNTS: (): [Buffer] => { return client.decode(data, ["bytes32"]); },
        compareArtifactVersion: (): {
            result: number;
        } => {
            const [result] = client.decode(data, ["int256"]);
            return { result: result };
        },
        forwardCall: (): {
            returnData: Buffer;
        } => {
            const [returnData] = client.decode(data, ["bytes"]);
            return { returnData: returnData };
        },
        getArtifactVersion: (): [[number, number, number]] => { return client.decode(data, ["uint8[3]"]); },
        getArtifactVersionMajor: (): [number] => { return client.decode(data, ["uint8"]); },
        getArtifactVersionMinor: (): [number] => { return client.decode(data, ["uint8"]); },
        getArtifactVersionPatch: (): [number] => { return client.decode(data, ["uint8"]); },
        getOwner: (): [string] => { return client.decode(data, ["address"]); },
        initialize: (): void => { return; },
        supportsInterface: (): [boolean] => { return client.decode(data, ["bool"]); },
        transferOwnership: (): void => { return; }
    }; };
}