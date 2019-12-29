import Vue from 'vue';
import {AddressBook, Getter, Modulator, ModulatorOptions, Setter} from '../interfaces';

export class Controller {
    public readonly options: ModulatorOptions;
    private readonly vue: Vue;
    // @ts-ignore
    private modulator: Modulator;

    constructor(
        options: ModulatorOptions,
        vue: Vue,
    ) {
        this.options = options;
        this.vue = vue;
    }

    public getter(key: string): Getter {
        this.vue.$store.commit('publishAddress', { options: this.options , key });
        const index: number = this.vue.$store.getters.addressBook[this.options.key][key];
        // console.log(`Controller ${this.name} getter ${key} created for address ${index}`);

        return () => index !== undefined ? this.vue.$store.getters.valueArray[index] : 0;
    }

    public setter(key: string): Setter {
        this.vue.$store.commit('publishAddress', { options: this.options, key });
        const index: number = this.vue.$store.getters.addressBook[this.options.key][key];
        console.log(`Controller ${this.options.name} setter ${key} created for address ${index}`);

        return (value: number) => {
            if (index !== undefined) {
                this.vue.$store.commit('updateValue', { index, value });
            }
        };
    }

    public handler(f: Modulator) {
        this.modulator = f;
    }

    public run() {
        // console.log(`Controller ${this.name} modulator called`);
        this.modulator();
    }

}
