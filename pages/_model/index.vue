<template>
  <div>
    <div v-if="modelInfo">
      <ModelCanvas :path="modelInfo.path"></ModelCanvas>
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

<style>
</style>
