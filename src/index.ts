import Vue from "vue";
import VueRouter from 'vue-router';
import { createRouter } from './router';

function startApp() {
    const router = createRouter();

    Vue.use(VueRouter);

    let v = new Vue({
        router
    }).$mount('#app');
}

startApp();


