import * as p5 from 'p5';
import { Vec2 } from '../P5Tools';

export class MatrixNode extends Vec2 {
    public direction: number = Math.PI;
    public strokeWeight: number = 2;
    public reach: number;
    public velocity: number;
    public size: number;

    private sketch: p5;

    constructor(
        sketch: p5,
        velocity: number,
        size: number,
        x: number,
        y: number,
        reach: number,
    ) {
        super(x, y);

        this.sketch = sketch;
        this.velocity = velocity;
        this.size = size;
        this.reach = reach;
    }

    public setStrokeWeight(weight: number) {
        this.strokeWeight = weight;
    }

    public changeDirection(delta: number) {
        this.direction = this.direction + delta;
    }

    public setDirection(direction: number) {
        this.direction = direction;
    }

    public setVelocity(velocity: number) {
        this.velocity = velocity;
    }

    public changeVelocity(delta: number) {
        this.velocity = this.velocity + delta;
    }

    public setReach(reach: number) {
        this.reach = reach;
    }

    public changeReach(delta: number) {
        this.reach += delta;
    }

    public setPosition(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public inReach(p: MatrixNode) {
        return this.distance(p) <= Math.min(this.reach, p.reach);
    }

    public drawConnection(p: MatrixNode) {
        const max_weight = this.strokeWeight;
        const base_weight = 0.1;
        const roundTo = 1000;

        const ratio = 1 - this.distance(p) / Math.min(this.reach, p.reach);
        const weight = Math.min(max_weight, base_weight + Math.round(ratio * max_weight * roundTo) / roundTo);

        this.sketch.strokeWeight(weight);
        this.sketch.line(this.x, this.y, p.x, p.y);
    }

    public move() {
        this.x += Math.sin(this.direction) * this.velocity;
        this.y += Math.cos(this.direction) * this.velocity;
    }

    public draw() {
        // if (!DEBUG)
        //     return;
        this.sketch.point(this.x, this.y);
        // this.debugText();
        this.debugVec();
    }

    // reset() {
    //     this.direction = PI;
    //     this.velocity = 0;
    //     this.reach = DISTANCE_THRESHOLD;
    // }

    public distance(p: Vec2): number {
        return Math.sqrt(Math.pow(p.x - this.x, 2) + Math.pow(p.y - this.y, 2));
    }

    public angle(p: Vec2) {
        return Math.atan2((p.x - this.x), (p.y -  this.y));
    }

    public debugText() {
        this.sketch.strokeWeight(0.3);
        this.sketch.text(`x: ${this.x}`, this.x + 10, this.y);
        this.sketch.text(`y:${this.y}`, this.x + 10, this.y + 20);
        this.sketch.text(`direction ${this.direction}`, this.x + 10, this.y + 40);
        this.sketch.text(`velocity ${this.velocity}`, this.x + 10, this.y + 60);
    }

    public debugVec() {
        const dx: number = this.x + Math.sin(this.direction) * 5 * this.velocity;
        const dy: number = this.y + Math.cos(this.direction) * 5 * this.velocity;

        this.sketch.strokeWeight(1);
        this.sketch.stroke(0, 255, 255);
        this.sketch.line(this.x, this.y, dx, dy);
        this.sketch.stroke(255);
    }
}
