import * as p5 from 'p5';
import Vue from 'vue';
import {
    AddressBook,
    Getter,
    ModConstructor,
    Modulator, ModulatorOptions,
    Setter,
} from '../../interfaces';

import {randomRangeFloat} from '../../p5/P5Tools';
import { Controller } from '../controller';

export const modScale: ModConstructor = (
    options: ModulatorOptions,
    vue: Vue,
) => {
    const controller: Controller = new Controller(options, vue);

    const val: Getter = controller.getter('val');
    const level: Getter = controller.getter('level');
    const factor: Getter = controller.getter('factor');

    const out: Setter = controller.setter('out');

    controller.handler(() => {
        out(val() + level() * factor());
    });

    return controller;
};

export const modRandomScale: ModConstructor = (
    options: ModulatorOptions,
    vue: Vue,
) => {
    const controller: Controller = new Controller(options, vue);

    const val: Getter = controller.getter('val');
    const factor: Getter = controller.getter('factor');

    const out: Setter = controller.setter('out');

    controller.handler(() => {
        out(val() + Math.random() * factor());
    });

    return controller;
};

export const port: ModConstructor = (
    options: ModulatorOptions,
    vue: Vue,
) => {
    const controller: Controller = new Controller(options, vue);
    const input: Getter = controller.getter('input');
    const out: Setter = controller.setter('out');

    controller.handler(() => out(input()));

    return controller;
}

export const modRandomOffset: ModConstructor = (
    options: ModulatorOptions,
    vue: Vue,
) => {
    const controller: Controller = new Controller(options, vue);

    const val: Getter = controller.getter('val');
    const offset: Getter = controller.getter('factor');

    const out: Setter = controller.setter('out');

    controller.handler(() => {
        out(val() + randomRangeFloat(-offset(), offset()));
    });

    return controller;
};
