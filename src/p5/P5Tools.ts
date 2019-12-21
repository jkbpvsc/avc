import * as p5 from 'p5';

import 'p5/lib/addons/p5.sound';

export class Vec2 {
    public x: number;
    public y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

export function mouseVec(s: p5): Vec2 {
    return new Vec2(s.mouseX, s.mouseY);
}

export function centerVec(s: p5): Vec2 {
    return new Vec2(s.width / 2, s.height / 2);
}

export function randomRange(a: number, b: number) {
    return  a + Math.round(Math.random() * (b - a));
}

export function randomRangeFloat(x1: number, x2: number) {
    return  x1 + Math.random() * (x2 - x1);
}

export function generateComparisonSet(size: number): number[][] {
    const set: number[][] = [];
    for (let i = 0; i < size; i++) {
        for (let j = size - 1; j > i; j--) {
            set.push([i, j]);
        }
    }

    return set;
}
