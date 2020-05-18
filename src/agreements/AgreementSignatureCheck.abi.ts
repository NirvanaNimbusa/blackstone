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
export module AgreementSignatureCheck {
    export function Deploy<Tx>(client: Provider<Tx>): Promise<string> {
        let bytecode = "608060405234801561001057600080fd5b50610398806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c8063867c715114610030575b600080fd5b6100a66004803603608081101561004657600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506100a8565b005b60008473ffffffffffffffffffffffffffffffffffffffff1663481ea63d856040518263ffffffff1660e01b815260040180828152602001807f61677265656d656e740000000000000000000000000000000000000000000000815250602001915050602060405180830381600087803b15801561012557600080fd5b505af1158015610139573d6000803e3d6000fd5b505050506040513d602081101561014f57600080fd5b81019080805190602001909291905050509050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614156101e8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260248152602001806102fd6024913960400191505060405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff16637f91fb7d836040518263ffffffff1660e01b8152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060206040518083038186803b15801561026557600080fd5b505afa158015610279573d6000803e3d6000fd5b505050506040513d602081101561028f57600080fd5b81019080805190602001909291905050506102f5576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260438152602001806103216043913960600191505060405180910390fd5b505050505056fe556e61626c6520746f206c6f6361746520616e2041637469766541677265656d656e742e41637469766541677265656d656e74206973206e6f74207369676e65642062792074686520706572666f726d696e6720757365722e20526576657274696e67202e2e2ea265627a7a723158207345d0b05d3bbf5888bdae027a024c84c74c1a15aa1defe094f3937192ac19ef64736f6c634300050c0032";
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
        complete(_piAddress: string, _activityInstanceId: Buffer, _txPerformer: string) {
            const data = Encode(this.client).complete(_piAddress, _activityInstanceId, _txPerformer);
            return Call<Tx, void>(this.client, this.address, data, false, (exec: Uint8Array) => {
                return Decode(this.client, exec).complete();
            });
        }
    }
    export const Encode = <Tx>(client: Provider<Tx>) => { return {
        complete: (_piAddress: string, _activityInstanceId: Buffer, _txPerformer: string) => { return client.encode("867C7151", ["address", "bytes32", "address"], _piAddress, _activityInstanceId, _txPerformer); }
    }; };
    export const Decode = <Tx>(client: Provider<Tx>, data: Uint8Array) => { return {
        complete: (): void => { return; }
    }; };
}