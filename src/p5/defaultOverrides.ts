import * as p5 from 'p5';

import 'p5/lib/addons/p5.sound';

export function loadSound(
    p: p5,
    path:
        | string
        | any[],
    successCallback?: (
        ...args: any[]
    ) => any,
    errorCallback?: (
        ...args: any[]
    ) => any,
    whileLoading?: (
        ...args: any[]
    ) => any,
): p5.SoundFile {
    return (p as any).loadSound(path, successCallback, errorCallback, whileLoading);
}

export function FTT(
    sketch: p5,
    smoothing?: number,
    bins?: number,
): p5.FFT {
    return new (sketch as any).FTT(smoothing, bins);
}

export function Amplitude(
    sketch: p5,
    smoothing?: number,
): p5.Amplitude {
    return new (sketch as any).Amplitude(smoothing);
}
