import VueRouter, { RouteConfig } from 'vue-router';

import IndexComponent from './components/Index.vue';
import Vue5iew from './components/Vue5.vue';
import Vue5DynamicView from './components/Vue5Dynamic.vue';
import { instSketch } from './p5/test/P5';
import * as up from './p5/unknown-pleasures/up';
import nike from './p5/nike';

const routes: RouteConfig[] = [
    { path: '/', component: IndexComponent },
    { path: '/test', component: Vue5iew, props: { sketch: instSketch } },
    { path: '/pleasures', component: Vue5iew, props: { sketch: up.s } },
    { path: '/nike', component: Vue5iew, props: { sketch: nike } },
    { path: '/sketch/:sketch_name', component: Vue5DynamicView },
];

export function createRouter(): VueRouter {
    return new VueRouter({ routes });
}
