import {Getter, Modulator, Setter} from '../interfaces';

export class Controller {
    public inputs: number[] = [];
    public outputs: number[] = [];
    public readonly name: string;
    private readonly buffer: number[];
    // @ts-ignore
    private handleCallback: Modulator;

    constructor(
        name: string,
        buffer: number[],
    ) {
        this.name = name;
        this.buffer = buffer;
    }

    public getter(index: number): Getter {
        this.inputs.push(index);

        return () => index !== undefined ? this.buffer[index] : 0;
    }

    public setter(index: number): Setter {
        this.outputs.push(index);

        return (value: number) => index !== undefined && (this.buffer[index] = value);
    }

    public handler(f: Modulator) {
        this.handleCallback = f;
    }

    public run() {
        this.handleCallback();
    }

}
