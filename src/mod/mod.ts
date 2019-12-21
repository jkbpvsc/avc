import * as p5 from 'p5';
import {
    AddressBook,
    Getter,
    ModConstructor,
    Modulator,
    Setter,
} from '../interfaces';

import {randomRangeFloat} from '../p5/P5Tools';
import { Controller } from './controller';

const modScale: ModConstructor = (
    name: string,
    valueTable: number[],
    addressBook: AddressBook,
) => {
    const controller: Controller = new Controller(name, valueTable);

    const val: Getter = controller.getter(addressBook[name].val);
    const level: Getter = controller.getter(addressBook[name].level);
    const factor: Getter = controller.getter(addressBook[name].factor);

    const out: Setter = controller.setter(addressBook[name].out);

    controller.handler(() => {
        out(val() + level() * factor());
    });

    return controller;
};

const modRandomScale: ModConstructor = (
    name: string,
    valueTable: number[],
    addressBook: AddressBook,
) => {
    const controller: Controller = new Controller(name, valueTable);

    const val: Getter = controller.getter(addressBook[name].val);
    const factor: Getter = controller.getter(addressBook[name].factor);
    const out: Setter = controller.setter(addressBook[name].out);

    controller.handler(() => {
        out(val() + Math.random() * factor());
    });

    return controller;
};

const modRandomOffset: ModConstructor = (
    name: string,
    valueTable: number[],
    addressBook: AddressBook,
) => {
    const controller: Controller = new Controller(name, valueTable);

    const val: Getter = controller.getter(addressBook[name].val);
    const offset: Getter = controller.getter(addressBook[name].offset);

    const out: Setter = controller.setter(addressBook[name].out);

    controller.handler(() => {
        out(val() + randomRangeFloat(-offset(), offset()));
    });

    return controller;
};
