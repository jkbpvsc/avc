import {ModConstructor, ModType} from '../../interfaces';

import * as mods from './mod';

export function getModulator(type: ModType): ModConstructor {
    switch (type) {
        case ModType.Port:
            return mods.port;
        case ModType.Scale:
            return mods.modScale;
        case ModType.RandomOffset:
            return mods.modRandomOffset;
        case ModType.RandomScale:
            return mods.modRandomScale;
        default:
            throw new Error('ERR_UNKNOWN_MOD_TYPE');

    }
}
