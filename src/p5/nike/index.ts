import * as p5 from 'p5';
import { Vec2 } from '../P5Tools';

const HEIGHT = 480;
const WIDTH = 640;
let charset: MutatableChar[];

export default function s(sketch: p5) {
    sketch.preload = () => {

    };

    sketch.setup = () => {
        sketch.createCanvas(WIDTH, HEIGHT);
        sketch.frameRate(30)

        charset = generateLineMutatableText(['a', 'A', 't', 'T', 'g', 'G', 'c', 'C', ' ', '.'], sketch);
    }

    sketch.draw = () => {
        sketch.background(22, 22, 29);
        sketch.strokeWeight(0);
        sketch.fill(255)

        printMutatableCharText(sketch, charset, HEIGHT / 2 - 30)
    }
}

function getRandomElement<T>(array: T[]): T {
    return array[Math.floor(array.length * Math.random())]
}

function char(s: p5, tl: Vec2, text: string, size: number) {
    s.textSize(size)
    s.text(text, tl.x, tl.y, tl.x + size, tl.y + size)
}

function generateLineMutatableText(
    charset: string[],
    s: p5,
): MutatableChar[] {
    const OFFSET = 15;

    const chars: MutatableChar[] = [];
    for (let i = 0; i * OFFSET < WIDTH; i++) {
        chars[i] = new MutatableChar(charset, s);
    }

    return chars;
}

function chance(x: number): boolean {
    return Math.random() < x;
}

function printMutatableCharText(
    s: p5,
    charset: MutatableChar[],
    height: number,
) {
    const STARTX = 0;
    const SIZE = 15;
    const TEXT_SIZE = 23;


    for (let i = 0; i < charset.length; i++) {
        s.textStyle(charset[i].style as any)
        char(s, new Vec2(STARTX + i * SIZE, height), charset[i].toString(), TEXT_SIZE);
    }

}
class MutatableChar {
    private charset: string[];
    private char: string;
    public style: string;
    private s: p5;
    static mutationChance: number = 0.005;
    constructor(charset: string[], s: p5) {
        this.charset = charset;
        this.char = getRandomElement(charset);
        this.s = s;
        this.style = s.NORMAL;
    }

    public toString(): string {
        this.mutate();
        this.mutateStyle();
        return this.char;
    }

    private mutate() {
        if (Math.random() < MutatableChar.mutationChance) {
            this.char = getRandomElement(this.charset);
            console.log('Mutation happened')
        }
    }

    private mutateStyle() {
        if (chance(0.05)) {
            this.style = getRandomElement([this.s.NORMAL, this.s.ITALIC, this.s.BOLDITALIC, this.s.BOLD])
        }
    }
}

