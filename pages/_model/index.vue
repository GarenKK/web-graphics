<template>
  <div>
    <div
      v-if="modelInfo"
      class="wrapper">
      <ModelCanvas
        :path="modelInfo.path"
        :lightIntensity="modelInfo.light"
        :hasVideo="modelInfo.hasVideo"
        :meshIndex="modelInfo.meshIndex"
        :meshLocation="modelInfo.meshLocation"> <!-- EXPERIMENTAL VIDEO FEATURE -->
        </ModelCanvas>
      <Controls></Controls>
    </div>
    <div v-else>
      This Model Does Not Exist
    </div>
  </div>
</template>

<script>
  import { modelByName } from '~/assets/models.js'
  import ModelCanvas from '~/components/ModelCanvas.vue'
  import Controls from '~/components/Controls.vue'

  export default {
    name: 'model-viewer',
    data: () => ({
      modelInfo: null
    }),
    components: {
      ModelCanvas,
      Controls
    },
    mounted () {
      this.modelInfo = modelByName(this.$route.params.model)
    }
  }
</script>

<style scoped>
  .wrapper {
    position: relative;
    height: 100%;
  }
</style>
