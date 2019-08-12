<template>
  <div
    class="main">
    <div class="header">
      <router-link
        v-show="canGoBack"
        to="/"
        class="back">
        <
      </router-link>
      <h1 class="title">{{TEXTS.APP_TITLE}}</h1>
    </div>
    <nuxt
      class="content"/>
  </div>
</template>

<script>
  import TEXTS from '~/assets/texts.js'

  export default {
    data: () => ({
      TEXTS,
      canGoBack: false
    }),
    watch: {
      '$route' (to, from) {
        this.canGoBack = to.name != "index"
      }
    },
    mounted () {
      this.canGoBack = this.$router.history.current.name != "index"
    }
  }
</script>

<style>
  html,
  body,
  #__nuxt,
  #__layout {
    height: 100%;
  }

  body {
    margin: 0;
  }
</style>

<style scoped>
  .main {
    height: 100%;
  }

  .main {
    display: flex;
    flex-direction: column;
  }

  .content {
    flex: 1;
  }

  .header {
    width: 100%;
    background-color: green;
    padding: 10px;
    box-sizing: border-box;
  }

  .back {
    position: absolute;
    text-decoration: none;
    color: black;
    font-weight: bold;
    font-size: 1.75rem; 
  }

  .back:active {
    color: gray;
  }

  h1.title {
    text-align: center;
    margin: 0;
  }
</style>
