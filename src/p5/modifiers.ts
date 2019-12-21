// MODIFIERS

import * as p5 from 'p5';
import { randomRangeFloat } from './P5Tools';

export function modRandomScale(sketch: p5, val: number, factor: number) {
    return val + Math.random() * factor;
}

export function modRandomOffset(sketch: p5, val: number, offset: number) {
    return val + randomRangeFloat(-offset, offset);
}

// export function modMicScale(sketch: p5, val: number, factor: number) {
//     const level = mic.getLevel();
//     return val + level * scale;
// }
//
// export function modAmpScale(sketch: p5, val: number, factor: number) {
//     const level = amp.getLevel();
// }
//
// export function modFFTSpectrumScale(sketch: p5, val: number, factor: number, i = VAR1) {
//     const level = spectrum[i] / 255;
//     return val + level * scale;
// }
//
// export function modFFTWaveformAbsScale(val: number, factor: number, i = VAR1) {
//     const level = Math.abs(waveform[i]);
//     return val + level * scale;
// }

export function modScale(val: number, level: number, factor: number) {
    return val + level * factor;
}
