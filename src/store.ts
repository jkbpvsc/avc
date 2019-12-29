import Vue from 'vue';
import Vuex from 'vuex';
import {State} from './interfaces';

Vue.use(Vuex);

const initialState: State = {
    valueArray: [],
    addressBook: {},
    time: 0,
    options: {},
};

export const store = new Vuex.Store({
    state: initialState,
    getters: {
        valueArray: state => state.valueArray,
        addressBook: state => state.addressBook,
        time: state => state.time,
        options: state => state.options,
    },
    mutations: {
        incrementTimer(state) {
            state.time++;
        },
        publishAddress(state, { options, key }) {
            if (!state.addressBook[options.key]) {
                state.addressBook[options.key] = {  };
            }
            if (state.addressBook[options.key][key] === undefined) {
                const indexOfEmptyElement = state.valueArray.length;
                state.addressBook[options.key][key] = indexOfEmptyElement;
            }

            const address: number = state.addressBook[options.key][key];
            if (state.valueArray[address] === undefined) {
                state.valueArray[address] =
                    options.defaultValues && options.defaultValues[key] ? options.defaultValues[key] : 0;
            }
        },
        updateAddress(state, { name, key, address }) {
            state.addressBook[name][key] = Number(address);

            if (state.valueArray[address] === undefined) {
                state.valueArray[address] = 0;
            }
        },
        updateValue(state, { index, value }) {
            state.valueArray[index] = Number(value);
        },
        setOptions(state, options) {
            state.options[options.key] = options;
        },
    },
});
