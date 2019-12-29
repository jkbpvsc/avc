import { AddressBook, Getter, Modulator, Setter } from '../interfaces';

export class Controller {
    public inputs: number[] = [];
    public outputs: number[] = [];
    public readonly name: string;
    private readonly valueTable: number[];
    // @ts-ignore
    private modulator: Modulator;

    constructor(
        name: string,
        valueTable: number[],
    ) {
        this.name = name;
        this.valueTable = valueTable;
    }

    public getter(index: number): Getter {
        this.inputs.push(index);
        console.log(`Controller ${this.name} getter created for address ${index}`);

        return () => index !== undefined ? this.valueTable[index] : 0;
    }

    public setter(index: number): Setter {
        this.outputs.push(index);
        console.log(`Controller ${this.name} setter created for address ${index}`);

        return (value: number) => index !== undefined && (this.valueTable[index] = value);
    }

    /*
     public dynamicGetter(addressBook: AddressBook, name: string, key: string): Setter {

        return (value: number) => {
            const valueTableIndex: number = addressBook[name][key];
            this.outputs.push(valueTableIndex);
        }
    }
    */

    public handler(f: Modulator) {
        this.modulator = f;
    }

    public run() {
        console.log(`Controller ${this.name} modulator called`);
        this.modulator();
    }

}
