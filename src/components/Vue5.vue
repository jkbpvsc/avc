<template>
    <div class="p5-container" ref="p5_container"> </div>
</template>

<script lang="ts">
    import * as P5 from 'p5';
    import Vue from "vue";
    import { Component, Prop } from "vue-property-decorator";
    import { Sketch } from "../interfaces";

    @Component
    export default class Vue5 extends Vue {
        @Prop()
        sketch!: Sketch;

        mounted(): void {
            new P5(
                this.sketch,
                <HTMLElement> this.$refs.p5_container,
            )
        }
    }
</script>

<style scoped>
  .p5-container {
  margin: auto;
    width: 50%;

  }
</style>

