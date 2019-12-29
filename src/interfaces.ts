import * as p5 from 'p5';
import Vue from 'vue';
import {Controller} from './mod/controller';
import {ModulatorBoard} from './mod/ModulatorBoard';

export type Sketch = (sketch: p5) => void;

export type SketchVueWrapper = (vue: Vue, mb: ModulatorBoard) => Sketch;

export type Getter = () => number;

export type Setter = (n: number) => void;

export interface AddressBook {
    [modName: string]: { [controllerName: string]: number };
}

export type Modulator = () => void;

export type ModConstructor = (
    options: ModulatorOptions,
    vue: Vue,
) => Controller;

export interface State {
    valueArray: number[];
    addressBook: { [name: string]: { [key: string]: number } };
    time: number;
    options: { [key: string]: ModulatorOptions };
}

export interface ModulatorOptions {
    key: string;
    name: string;
    defaultValues?: { [key: string]: number };
    type: ModType;
}

export enum ModType {
    Port = 'Port',
    RandomOffset = 'RandomOffset',
    RandomScale = 'RandomScale',
    Scale = 'Scale',
    FTT = 'FTT',
}
