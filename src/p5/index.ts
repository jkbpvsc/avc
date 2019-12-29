import Vue from 'vue';

import { SketchVueWrapper } from '../interfaces';
import nike from './nike';

const Sketches: { [name: string]: SketchVueWrapper } = {
    nike,
};

export default (name: string) => (vue: Vue) => Sketches[name](vue);
