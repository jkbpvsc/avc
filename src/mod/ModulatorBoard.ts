import Vue from 'vue';
import { AddressBook, ModConstructor, Modulator } from '../interfaces';
import { Controller } from './controller';
import { evaluate } from './executionQueue';

export  class ModulatorBoard {
    public valueArray: number[];
    public controllers: { [name: string]: Controller };
    public addressBook: AddressBook;
    private vue: Vue;

    constructor(vue: Vue) {
        this.vue = vue;
        this.valueArray = [];
        this.addressBook = {};
        this.controllers = {};
    }

    public register(
        name: string,
        modulatorConstructor: ModConstructor,
    ) {
        if (!this.addressBook[name]) {
            this.addressBook[name] = {};
        }

        this.controllers[name] = modulatorConstructor(name, this.valueArray, this.addressBook);
    }

    public get(name: string): number {
        return this.valueArray[this.addressBook[name].out];
    }

    public evaluate() {
        const controllers: Controller[] = Object.keys(this.controllers).map((name: string) => this.controllers[name]);
        console.log('Evaluating controllers');
        evaluate(controllers);
        console.log(this.addressBook);
        console.log(this.valueArray);
    }

    private draw() {
        const valContainer = document.getElementById('mod-values');
        const addressContainer = document.getElementById('mod-address');
    }
}
