<template>
  <div>
    <h2 class="title">{{TEXTS.INDEX_TITLE}}</h2>
    <div>
      <ModelInfo
        v-for="model in models"
        v-bind:key="model.name"
        :modelData="model">
      </ModelInfo>
    </div>
  </div>
</template>

<script>
  import ModelInfo from '~/components/ModelInfo.vue'
  import { models } from '~/assets/models.js'
  import TEXTS from '~/assets/texts.js'

  export default {
    name: 'index',
    data: () => ({
      TEXTS,
      models
    }),
    components: {
      ModelInfo
    }
  }
</script>

<style>
  h2.title {
    text-align: center;
  }
</style>
