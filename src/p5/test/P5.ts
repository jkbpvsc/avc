import * as p5 from 'p5';

import 'p5/lib/addons/p5.sound';
import {loadSound} from '../defaultOverrides';

import {randomRange} from '../P5Tools';
import {MatrixNode} from './MatrixNode';

const WIDTH = 620;
const HEIGHT = 480;

const POPULATION = 300;

const DEFAULT_REACH = 50;

let lineColor: p5.Color;
let track: p5.SoundFile;
let amp: p5.Amplitude;
let fft: p5.FFT;

export function instSketch(sketch: p5) {
    const points: MatrixNode[] = [];

    sketch.preload = () => {
        sketch.soundFormats('mp3');
        track = loadSound(
            sketch,
            'http://127.0.0.1:3663/h.mp3',
        );
    };

    sketch.setup = () => {
        sketch.createCanvas(WIDTH, HEIGHT);
        sketch.color(255);
        sketch.stroke(255);
        sketch.fill(255);
        sketch.frameRate(60);

        lineColor = sketch.color(255);

        for (let i = 0; i < POPULATION; i++) {
            points[i] = new MatrixNode(
                sketch,
                0,
                5,
                randomRange(0, WIDTH),
                randomRange(0, HEIGHT),
                DEFAULT_REACH,
            );
        }

        amp = new p5.Amplitude();
        fft = new p5.FFT();

        track.play();
    };

    sketch.draw = () => {
        sketch.background(0);

        const spectrum: number[] = fft.analyze();
        const waveform: number[] = fft.waveform();

        points.forEach(updatePoint);
    };

    function updatePoint(p: MatrixNode): void {

    }
}
