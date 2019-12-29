import Vue from 'vue';

import { SketchVueWrapper } from '../interfaces';
import {ModulatorBoard} from '../mod/ModulatorBoard';
import nike from './nike';

const Sketches: { [name: string]: SketchVueWrapper } = {
    nike,
};

export default (name: string) => (vue: Vue, mb: ModulatorBoard) => Sketches[name](vue, mb);
