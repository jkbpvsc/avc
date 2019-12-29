import Vue from "vue";
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import { createRouter } from './router';
import { store } from './store';

function startApp() {
    const router = createRouter();

    Vue.use(VueRouter);


    let v = new Vue({
        router,
        store,
    }).$mount('#app');
}

startApp();


