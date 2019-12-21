import VueRouter, { RouteConfig } from 'vue-router';

import IndexComponent from './components/Index.vue';
import Vue5iew from './components/Vue5.vue';
import { instSketch } from './p5/test/P5';
import * as up from './p5/unknown-pleasures/up';
import nike from './p5/nike';

const routes: RouteConfig[] = [
    { path: '/', component: IndexComponent },
    { path: '/test', component: Vue5iew, props: { sketch: instSketch } },
    { path: '/pleasures', component: Vue5iew, props: { sketch: up.s } },
    { path: '/nike', component: Vue5iew, props: { sketch: nike } }
];

export function createRouter(): VueRouter {
    return new VueRouter({ routes });
}
