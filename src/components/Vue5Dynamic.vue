import {ModType} from "../interfaces";
<template>
    <div>
        <div class="p5-container" ref="p5_container">
            <div v-if="!sketchExists">This sketch could not be found</div>

        </div>
        <div id="mod-ui">
            <div>Time: {{$store.getters.time}}</div>
            <br/>
            <div id="mod-values">
                <div v-for="(value, index) in $store.getters.valueArray" v-bind:key="index" v-if="value !== undefined">
                    {{ index }}: <input type="number" :data-index="index" :value="value" @input="updateValue">
                </div>
            </div>
            <br/>
            <div id="mod-address">
                <input v-model="newModulatorName">
                <select v-model="newModulator">
                    <option v-for="mod in modTypes" v-bind:key="mod" :value="mod">{{ mod }}</option>
                </select>
                <button @click="addModulator">Add</button>
                <br/>
                <br/>
                <fieldset class="mod-container" v-for="(value, name, index) in $store.getters.addressBook" v-bind:key="name">
                    <legend>{{$store.getters.options[name].name }}<br/>{{ $store.getters.options[name].type }}</legend>
                    <div v-for="(address, key) in value" v-bind:key="key">
                        {{key}} <input type="number" :value="address" :data-name="name" :data-key="key" @input="updateAddress">
                    </div>
                </fieldset>

            </div>
        </div>
    </div>

</template>

<script lang="ts">
    import * as P5 from "p5";
    import Vue from "vue";
    import {Component} from "vue-property-decorator";
    import {ModType, Sketch} from "../interfaces";
    import {ModulatorBoard} from "../mod/ModulatorBoard";
    import Sketches from "../p5";

    @Component
    export default class Vue5 extends Vue {

        sketchExists: boolean = true;
        modTypes: string[] = Object.keys(ModType);
        newModulator: ModType = ModType.Port;
        newModulatorName: string = '';
        modulatorBoard: ModulatorBoard | null = null;

        mounted() {
            try {
                this.modulatorBoard = new ModulatorBoard(this);
                const sketchName = this.$route.params.sketch_name;
                const sketch: Sketch = Sketches(sketchName)(this, this.modulatorBoard);

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


        };

        updateAddress(e: any) {
            if (this.modulatorBoard)
                this.modulatorBoard.updateAddress(
                    e.target.dataset.name,
                    e.target.dataset.key,
                    e.target.value
                )
        }

        updateValue(e: any) {
            this.$store.commit('updateValue', { index: e.target.dataset.index, value: e.target.value })
        }

        addModulator() {
            if (this.modulatorBoard) {
                this.modulatorBoard.register({ type: this.newModulator, name: this.newModulatorName, key: Date.now().toString() })
            }
        }
    }
</script>

<style scoped>
  .p5-container {
  margin: auto;
    width: 50%;

  }
    #mod-ui {
        color: white;
    }
    .mod-container {
        display: inline-block;
    }
</style>

