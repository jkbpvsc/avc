import * as p5 from 'p5';
import {Vue} from 'vue/types/vue';
import {ModType} from '../../interfaces';
import {ModulatorBoard} from '../../mod/ModulatorBoard';
import {port} from '../../mod/modulators/mod';

import {chance} from '../../mod/utils';
import {Vec2} from '../P5Tools';

const HEIGHT = 480;
const WIDTH = 640;
let charset: MutatableChar[];

export default function(vue: Vue, modulatorBoard: ModulatorBoard) {
    return  (sketch: p5) => {
        sketch.preload = () => {

        };

        sketch.setup = () => {
            sketch.createCanvas(WIDTH, HEIGHT);
            sketch.frameRate(10);

            modulatorBoard.register({ type: ModType.Port, name: 'Fill color', key: 'fill', defaultValues: { input: 230 }});
            modulatorBoard.register({ type: ModType.Port, name: 'Background color', key: 'bg', defaultValues: {input: 10 }});
            modulatorBoard.register({ type: ModType.Port, name: 'Char box size', key: 'cbs', defaultValues: {input: 15 }});
            modulatorBoard.register({ type: ModType.Port, name: 'Font size', key: 'fs', defaultValues: {input: 23 }});
            modulatorBoard.register({ type: ModType.Port, name: 'Char mutation chance', key: 'cmc', defaultValues: { input: 0.05 } });
            modulatorBoard.register({ type: ModType.Port, name: 'Style mutation chance', key: 'smc', defaultValues: { input: 0.05 } });
            modulatorBoard.register({ type: ModType.Port, name: 'Rotation', key: 'rotation', defaultValues: { input: 0 } });
            modulatorBoard.register({ type: ModType.Port, name: 'Start X', key: 'start_x', defaultValues: { input: 0 } });


            modulatorBoard.evaluate();

            charset = generateLineMutatableText(
                ['a', 'A', 't', 'T', 'g', 'G', 'c', 'C', ' ', '.'],
                sketch,
                modulatorBoard,
            );
        };

        sketch.draw = () => {
            modulatorBoard.evaluate();

            sketch.background(modulatorBoard.get('bg'));
            sketch.strokeWeight(0);
            sketch.fill(modulatorBoard.get('fill'));

            printMutatableCharText(sketch, charset, HEIGHT / 2 - 30, modulatorBoard);
        };
    };
}

function getRandomElement<T>(array: T[]): T {
    return array[Math.floor(array.length * Math.random())];
}

function char(s: p5, tl: Vec2, text: string, size: number, mb: ModulatorBoard) {
    s.textSize(size);
    const rotate = s.radians(mb.get('rotation'));
    s.push();
    s.rotate(rotate);
    s.text(text, tl.x, tl.y, tl.x + size, tl.y + size);
    s.pop();
    s.rotate(-rotate);
}

function generateLineMutatableText(
    charset: string[],
    s: p5,
    mb: ModulatorBoard,
): MutatableChar[] {
    const chars: MutatableChar[] = [];
    for (let i = 0; i < 200; i++) {
        chars[i] = new MutatableChar(charset, s, mb);
    }

    return chars;
}

function printMutatableCharText(
    s: p5,
    charset: MutatableChar[],
    height: number,
    mb: ModulatorBoard,
) {
    const STARTX = mb.get('start_x');
    const SIZE = mb.get('cbs');
    const TEXT_SIZE = mb.get('fs');

    for (let i = 0; i < charset.length; i++) {
        s.textStyle(charset[i].style as any);
        char(s, new Vec2(STARTX + i * SIZE, height), charset[i].toString(), TEXT_SIZE, mb);
    }

}

class MutatableChar {
    public style: string;
    private charset: string[];
    private char: string;
    private s: p5;
    private mb: ModulatorBoard;

    constructor(charset: string[], s: p5, mb: ModulatorBoard) {
        this.charset = charset;
        this.char = getRandomElement(charset);
        this.s = s;
        this.style = s.NORMAL;
        this.mb = mb;
    }

    public toString(): string {
        this.mutate();
        this.mutateStyle();
        return this.char;
    }

    private mutate() {
        if (Math.random() < this.mb.get('cmc')) {
            this.char = getRandomElement(this.charset);
        }
    }

    private mutateStyle() {
        if (chance(this.mb.get('smc'))) {
            this.style = getRandomElement([this.s.NORMAL, this.s.ITALIC, this.s.BOLDITALIC, this.s.BOLD]);
        }
    }
}
