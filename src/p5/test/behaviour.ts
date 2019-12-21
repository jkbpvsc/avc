import { randomRangeFloat, mouseVec } from '../P5Tools';
import * as p5 from 'p5';
import { MatrixNode } from './MatrixNode';

export function setVelocity(sketch: p5, point: MatrixNode, velocity: number) {
    point.setVelocity(velocity);
}

// export function mouseProximityTurbolentOnClick(sketch: p5, point: MatrixNode) {
//     mouseProximityTurbolent(sketch, point, sketch.mouseIsPressed);
// }
//
// export function mouseProximityTurbolent(sketch: p5, point: MatrixNode, ignore = false) {
//     const baseTurbulence: number = 0.5;
//     const maxTurbulence: number = 3;
//     const distanceThreshold: number = 700;
//     const mouseDistance: number = point.distance(mouseVec(sketch));
//
//     const distanceRatio: number = Math.min(mouseDistance / distanceThreshold, 1);
//
//     const turbulence: number = Math.min(
//         baseTurbulence + (maxTurbulence - (distanceRatio * maxTurbulence)),
//         maxTurbulence,
//     );
//
//     point.changeDirection(randomRangeFloat(-turbulence, turbulence));
//     point.changeVelocity(randomRangeFloat(baseTurbulence, turbulence));
// }
//
// export function mouseProximityTurbolentInverseOnClick(sketch: p5, point: MatrixNode) {
//     mouseProximityTurbolentInverse(sketch, point, sketch.mouseIsPressed);
// }
//
// export function mouseProximityTurbolentInverse(sketch: p5, point: MatrixNode, ignore: boolean = false) {
//     const baseTurbulence: number = 4;
//     const minTurbulence: number = 0.05;
//     const distanceThreshold: number = 400;
//     const mouseDistance: number = point.distance(mouseVec(sketch));
//     const distanceRatio: number = 1 - mouseDistance / distanceThreshold;
//
//     const turbulence: number =
//         Math.min(baseTurbulence - (ignore ? 0 : distanceRatio) * (baseTurbulence - minTurbulence), baseTurbulence);
//
//     point.changeDirection(randomRangeFloat(-turbulence, turbulence));
//     point.setVelocity(randomRangeFloat(minTurbulence, turbulence));
//     point.move();
// }
//
// export function mouseAttractionAngle(sketch: p5, point) {
//     const angle = point.angle(new Vec2d(mouseX, mouseY));
//     point.setDirection(angle);
// }
//
// export function mouseAttractionVelocity(sketch: p5, point) {
//     const distance_treshold = 600;
//     const base_velocity = 0.2;
//     const mouse_distance = point.distance(new Vec2d(mouseX, mouseY));
//     const distanceRatio = 1 - Math.min(1, mouse_distance / distance_treshold);
//
//     point.setVelocity(base_velocity * distanceRatio);
// }
//
// export function mouseProximityDecreasedReach(sketch: p5, point) {
//     const distance_treshold = 600;
//     const base_reach = 100;
//     const min_reach = 20;
//     const mouse_distance = point.distance(new Vec2d(mouseX, mouseY));
//     const distanceRatio = Math.min(1, mouse_distance / distance_treshold);
//
//     const reach = min_reach + (base_reach - min_reach) * distanceRatio;
//
//     point.setReach(reach);
// }
//
// export function mouseProximityIncreasedReach(sketch: p5, point) {
//     const distance_treshold = 600;
//     const base_reach = 60;
//     const max_reach = 100;
//     const mouse_distance = point.distance(new Vec2d(mouseX, mouseY));
//     const distanceRatio = 1 - Math.min(1, mouse_distance / distance_treshold);
//
//     const reach = base_reach + (randomRange(max_reach - 5, max_reach + 5) - base_reach) * distanceRatio;
//
//     point.setReach(reach);
// }
//
// export function respawnCenter(sketch: p5, node, respawn_rate_percent, radius) {
//     respawnPoint(node, new Vec2d(WIDTH / 2, HEIGHT / 2), respawn_rate_percent, radius);
// }
//
// export function respawnPoint(sketch: p5, node, vec, respawn_rate_percent, radius) {
//     const respawns = Math.random() * 100 > (100 - respawn_rate_percent);
//     if (!respawns) {
//         return;
//     }
//
//     const random_angle = randomRangeFloat(-PI, PI);
//     const random_scale = Math.random() * radius;
//
//     node.setPosition(
//         vec.x + random_scale * Math.sin(random_angle),
//         vec.y + random_scale * Math.cos(random_angle),
//     );
// }
//
// export function directionAttractionPoint(sketch: p5, node, vec) {
//     const angle = node.angle(vec);
//     node.setDirection(angle);
// }
//
// export function directionRepulsionPoint(sketch: p5, node, vec) {
//     const angle = node.angle(vec) + PI;
//     node.setDirection(angle);
// }
//
// export function velocityProximityIncrease(sketch: p5, node, vec, distance_treshold, base_velocity, max_velocity) {
//     const distance = node.distance(vec);
//     const distanceRatio = 1 - Math.min(1, distance / distance_treshold);
//
//     const delta_velocity = max_velocity - base_velocity;
//
//     const velocity = base_velocity + distanceRatio * delta_velocity;
//
//     node.setVelocity(velocity);
// }
//
// export function reachProximityIncrease(sketch: p5, node, vec, distance_treshold, base_reach, max_reach) {
//     const distance = node.distance(vec);
//     const ratio = 1 - Math.min(1, distance / distance_treshold);
//
//     const reach = base_reach + (max_reach - base_reach) * ratio;
//     node.setReach(reach);
// }
//
// export function directionRandomChange(sketch: p5, node, max_change) {
//     node.changeDirection(randomRangeFloat(-max_change, max_change));
// }
//
// export function velocityRandomChange(sketch: p5, node, max_change) {
//     node.changeVelocity(randomRangeFloat(-max_change, max_change));
// }
//
// export function setStrokeWeight(sketch: p5, node, weight) {
//     node.setStrokeWeight(weight);
// }
