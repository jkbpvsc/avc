import * as p5 from 'p5';

import 'p5/lib/addons/p5.sound';
import { loadSound } from '../defaultOverrides';

const WIDTH = 1920;
const HEIGHT = 98

let track: p5.SoundFile;
let fft: p5.FFT;

export function s(sketch: p5) {
    sketch.preload = () => {
        sketch.soundFormats('mp3');
        track = loadSound(
            sketch,
            'http://127.0.0.1:3663/01%20Disorder.mp3',
            //'http://127.0.0.1:3663/Evening%20Side%20(Oneohtrix%20Point%20Never%20edit).mp3',
        );
    };

    sketch.setup = () => {
        sketch.createCanvas(WIDTH, HEIGHT);

        fft = new p5.FFT();
        track.play();
    };

    const forms: number[][] = [];
    const size = 64;

    sketch.draw = () => {
        sketch.background(10);
        const waveform: number[] = fft.waveform();
        const baseValues = []
        for (let i = 0; i < 400; i++) {
            baseValues[i] = 0;
        }

        forms.unshift(
            Array.prototype.concat(
                waveform,
            ),
        );

        if (forms.length > size) {
            forms.pop();
        }

        for (let i = 0; i < forms.length; i++) {
            // drawLineVertex(
            //     sketch,
            //     HEIGHT / 2 - (HEIGHT * (i / size)),
            //     forms[l - i],
            // );
            drawLineVertex(
                sketch,
                100 + ((HEIGHT - 200) * (i / size)),
                forms[i],
            );
        }

        //
        //
    };
}

let c: { [i: number]: number } = {};

function drawLine(s: p5, y_base: number, waveform: number[]) {
    const len = waveform.length;
    s.stroke(255);
    const step = 2 ** 2;
    const h = 150;

    const border = 200;
    const margin = 150;
    const waveFormScreenWidth = (WIDTH - 2 * (border + margin)) + 1;

    s.line(border, y_base, border + margin, y_base);
    s.line((WIDTH - border) - margin, y_base, WIDTH - border, y_base);

    for (let i = 1; i < waveform.length; i += step) {


        const x1 = (border + margin) + waveFormScreenWidth * (i / len);
        const distCenter = Math.abs((WIDTH / 2) - x1);
        const ratio = 1 - (distCenter / (waveFormScreenWidth / 2));
        const y1 = y_base - h * Math.abs(waveform[i]) * ratio;

        const x2 = (border + margin) + waveFormScreenWidth * ((i + step) / len);
        const distCenter2 = Math.abs((WIDTH / 2) - x2);
        const ratio2 = 1 - (distCenter2 / (waveFormScreenWidth / 2));

        const y2 = y_base - h * Math.abs(waveform[i + step]) * ratio2;

        if (c[x1] < y1 || c[x2] < y2) {
            continue;
        }
        s.line(x1, y1, x2, y2);

        c[x1] = y1;
        c[x2] = y2;
    }

}

function drawLineVertex(s: p5, y_base: number, waveform: number[]) {
    const len = waveform.length;
    s.stroke(255);
    s.strokeWeight(0.85);
    const step = 2 ** 5;
    const h = 170;

    const border = WIDTH / 4;
    const margin = WIDTH / 8;

    const waveFormScreenWidth = (WIDTH - 2 * (border + margin)) + 1;

    s.beginShape();
    s.vertex(border, y_base);
    s.vertex(border + margin, y_base);
    s.endShape();

    s.beginShape();
    s.fill(10);
    s.curveVertex(border + margin, y_base);
    let lastPoint: number[] = [];

    for (let i = 1; i < waveform.length; i += step) {
        const x1 = (border + margin) + waveFormScreenWidth * (i / len);
        const distCenter = Math.abs((WIDTH / 2) - x1);
        const ratio = 1 - (distCenter / (waveFormScreenWidth / 2));
        const y1 = y_base - h * Math.abs(waveform[i]) * ratio;

        s.curveVertex(x1, y1);
        lastPoint = [x1, y1];
    }
    s.curveVertex((border + margin) + waveFormScreenWidth, y_base);
    s.endShape();
    //
    s.beginShape();

    s.vertex(lastPoint[0], lastPoint[1]);
    s.vertex(WIDTH - border, y_base);

    s.endShape();
}
