<template>
    <div class="p5-container" ref="p5_container">
        <div v-if="!sketchExists">This sketch could not be found</div>
        <div id="mod-ui">
            <div id="mod-values"></div>
            <div id="mod-address"></div>
        </div>
    </div>
</template>

<script lang="ts">
    import * as P5 from 'p5';
    import Vue from "vue";
    import { Component, Prop } from "vue-property-decorator";
    import { Sketch } from "../interfaces";
    import Sketches from '../p5'

    @Component
    export default class Vue5 extends Vue {

        sketchExists: boolean = true;
        mounted() {
            try {
                const sketchName = this.$route.params.sketch_name;
                const sketch: Sketch = Sketches(sketchName)(this);

                new P5(
                    sketch,
                    <HTMLElement> this.$refs.p5_container,
                )

                console.log('Sketch loaded')
            } catch (e) {
                console.log('Loading sketch failed');
                console.log(e);
                this.sketchExists = false;
            }


        }
    }
</script>

<style scoped>
  .p5-container {
  margin: auto;
    width: 50%;

  }
</style>

