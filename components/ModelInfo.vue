<template>
  <router-link class="info" :to="modelData.uri">
    <div class="container">
      <img :src="getImgSource(modelData.thumbnail)" class="img"/>
      <div class="title">{{modelData.title}}</div>
    </div>
  </router-link>
</template>

<script>
  import mixins from '~/mixins/index.js'

  export default {
    name: 'ModelInfo',
    props: {
      modelData: Object
    },
    mixins: [mixins]
  }
</script>

<style scoped>
  .info {
    display: inline-block;
    text-decoration: none;
    height: 300px;
    width: 300px;
    border: solid;
    text-align: center;
    vertical-align: top;
    margin: 10px;
  }
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    justify-content: space-around;
  }
  .img {
    max-width: 90%;
    max-height: 80%;
  }
  .title {
    font-size: 1.5rem;
  }
</style>
