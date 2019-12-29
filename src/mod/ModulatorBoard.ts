import Vue from 'vue';
import {AddressBook, ModConstructor, Modulator, ModulatorOptions} from '../interfaces';
import { Controller } from './controller';
import { evaluate } from './executionQueue';
import {getModulator} from './modulators';

export  class ModulatorBoard {
    public controllers: { [name: string]: Controller };
    private vue: Vue;

    constructor(vue: Vue) {
        this.vue = vue;
        this.controllers = {};
    }

    public register(
        options: ModulatorOptions,
    ) {
        if (!this.controllers[options.key]) {
            this.controllers[options.key] = getModulator(options.type)(options, this.vue);
        }
        this.vue.$store.commit('setOptions', options);
    }

    public get(name: string): number {
        const index = this.vue.$store.getters.addressBook[name].out;
        return this.vue.$store.getters.valueArray[index] || 0;
    }

    public updateAddress(
        name: string,
        key: string,
        address: number,
    ) {

        this.vue.$store.commit('updateAddress', { name, key, address });
        const options = this.vue.$store.getters.options[name];
        this.controllers[name] = getModulator(options.type)(options, this.vue);
    }

    public evaluate() {
        this.vue.$store.commit('incrementTimer');
        const controllers: Controller[] = Object.keys(this.controllers).map((name: string) => this.controllers[name]);
        evaluate(controllers);
    }
}
