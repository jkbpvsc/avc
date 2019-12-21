import * as p5 from 'p5';
import {Controller} from './mod/controller';

export type Sketch = (sketch: p5) => void;

export type Getter = () => number;

export type Setter = (n: number) => void;

export interface AddressBook {
    [modName: string]: { [controllerName: string]: number };
}

export type Modulator = () => void;

export type ModConstructor = (
    name: string,
    valueTable: number[],
    addressBook: AddressBook,
) => Controller;
