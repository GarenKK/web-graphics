<template>
  <div>
    <div>
      type:
      <input v-model="type">
    </div>
    <div>
      Position:
      <input v-model="positionX">
      <input v-model="positionY">
      <input v-model="positionZ">
    </div>
    <div>
      Rotation:
      <input v-model="rotationX">
      <input v-model="rotationY">
      <input v-model="rotationZ">
    </div>
    <div>
      Scale:
      <input v-model="scaleX">
      <input v-model="scaleY">
      <input v-model="scaleZ">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Controls',
    computed: {
      type: {
        get() {
          return this.$store.getters.type;
        },
        set(value) {
          this.$store.commit('type', value);
        },
      },
      positionX: {
        get() {
          return this.$store.getters.positionX;
        },
        set(value) {
          this.$store.commit('positionX', value);
        }
      },
      positionY: {
        get() {
          return this.$store.getters.positionY;
        },
        set(value) {
          this.$store.commit('positionY', value);
        }
      },
      positionZ: {
        get() {
          return this.$store.getters.positionZ;
        },
        set(value) {
          this.$store.commit('positionZ', value);
        }
      },
      rotationX: {
        get() {
          return this.$store.getters.rotationX;
        },
        set(value) {
          this.$store.commit('rotationX', value);
        }
      },
      rotationY: {
        get() {
          return this.$store.getters.rotationY;
        },
        set(value) {
          this.$store.commit('rotationY', value);
        }
      },
      rotationZ: {
        get() {
          return this.$store.getters.rotationZ;
        },
        set(value) {
          this.$store.commit('rotationZ', value);
        }
      },
      scaleX: {
        get() {
          return this.$store.getters.scaleX;
        },
        set(value) {
          this.$store.commit('scaleX', value);
        }
      },
      scaleY: {
        get() {
          return this.$store.getters.scaleY;
        },
        set(value) {
          this.$store.commit('scaleY', value);
        }
      },
      scaleZ: {
        get() {
          return this.$store.getters.scaleZ;
        },
        set(value) {
          this.$store.commit('scaleZ', value);
        }
      }
    }
  }
</script>

<style>
</style>
