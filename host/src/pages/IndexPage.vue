<template>
  <q-page class="row q-ma-none full-width bg-black">
    <div class="col-12 row text-white q-mt-xl">
      <div class="col-shrink">
        <q-btn label="get box color" color="primary" @click="getBoxColor" />
      </div>
      <div class="col-1 q-ml-md">
        <div :style="`width:32px;height:32px;background-color:${boxColor}`" />
      </div>
      <div class="col">

        <q-btn label="look from above" color="green" @click="lookFromAbove" />
        <q-btn label="look from above from farther" class="on-right" color="green-8"
          @click="lookFromAboveFromFarther" />
      </div>

      <q-slider readonly color="red" :label-value="`Alpha: ${cameraAlpha.toFixed(3)}`" v-model="cameraAlpha" :min="-Math.PI * 2" :max="Math.PI * 2"
        label label-always />
      <q-slider readonly color="green" :label-value="`Beta: ${cameraAlpha.toFixed(3)}`" v-model="cameraBeta" :min="-Math.PI * 2"
        :max="Math.PI * 2" label label-always />
      <q-slider readonly color="blue" :label-value="`Radius: ${cameraRadius.toFixed(3)}`" v-model="cameraRadius" :min="0" :max="100"
        label label-always />
    </div>
    <div class="col-12 row">
      <div id="babylonjs-app-div" class="col row"></div>
    </div>
  </q-page>
</template>

<script setup lang="ts">

import { onMounted, ref } from 'vue';
import { initPostmate } from '../embedding/postmateHost'
import Postmate from '../../../types/postmate';

const cameraAlpha = ref(0)
const cameraBeta = ref(0)
const cameraRadius = ref(0)
const boxColor = ref('#ffffff')

let child: Postmate.ParentAPI

const getBoxColor = async () => {
  // Fetch the color property in child.html and set it to the iFrames height
  const color = await child?.get('boxColor')
  boxColor.value = color
}

const lookFromAbove = async () => {
  await child?.call('lookFromAbove', 20)
}

const lookFromAboveFromFarther = async () => {
  await child?.call('lookFromAbove', 40)
}

onMounted(async () => {
  const postmateOptions = {
    container: document.getElementById('babylonjs-app-div'), // Element to inject frame into
    url: 'http://localhost:5173', // Page to load, must have postmate.js. This will also be the origin used for communication.
    name: 'my-iframe-name', // Set Iframe name attribute. Useful to get `window.name` in the child.
    classListArray: ['full-width', 'full-height'], //Classes to add to the iframe via classList, useful for styling.
  }

  child = await initPostmate(postmateOptions)
  // When parent <-> child handshake is complete, data may be requested from the child

  // Listen to a particular event from the child
  child.on('camera', (data: { alpha: number, beta: number, radius: number }) => {
    cameraAlpha.value = data.alpha
    cameraBeta.value = data.beta
    cameraRadius.value = data.radius
  });

})
</script>
