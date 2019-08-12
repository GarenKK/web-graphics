<template>
  <div
    class="main">
    <div
      class="actions">
      <div class="actions-title">{{TEXTS.CANVAS_TITLE}}</div>
      <div
        class="btns">
        <div
          v-for="action in actions"
          :style="{
            opacity: action === selectedAction ? 1 : 0.15
          }"
          class="action-btn"
          @click="selectedAction = action">
          {{ action }}
        </div>
      </div>
    </div>
    <div
      class="inputs"
      :style="{
        opacity: focused || hovered ? 1 : 0.15
      }"
      @mouseover="inputsMouseover"
      @mouseleave="inputsMouseleave">
      <div
        v-for="type in transformType"
        class="input-row">
        <div class="input-title">{{ type }}</div>
        <div
          v-for="axis in transformAxis"
          class="input-wrapper">
          <span class="input-property">{{ axis }}:</span>
          <input
            :value="getValue(type, axis)"
            @input="setValue(type, axis, $event.target.value)"
            @focus="inputFocused"
            @blur="inputBlurred">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import TEXTS from '~/assets/texts.js'

  export default {
    name: 'Controls',
    data () {
      const actions = ['translate', 'rotate', 'scale']
      const transformType = ['position', 'rotation', 'scale']
      const transformAxis = ['X', 'Y', 'Z']
      return {
        TEXTS,
        actions,
        transformType,
        transformAxis,
        focused: false,
        hovered: false
      }
    },
    computed: {
      selectedAction: {
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
    },
    methods: {
      inputBlurred () {
        this.focused = false
      },
      inputFocused () {
        this.focused = true
      },
      inputsMouseover () {
        this.hovered = true
      },
      inputsMouseleave () {
        this.hovered = false
      },
      getValue (type, axis) {
        let propertyName = type + axis
        return this[propertyName]
      },
      setValue (type, axis, value) {
        let propertyName = type + axis
        this[propertyName] = value
      }
    }
  }
</script>

<style scoped>
  .main {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    pointer-events: none;
  }

  .actions {
    position: absolute;
    top: 2.5vh;
    text-align: center;
    pointer-events: all;
  }

  .actions-title {
    font-size: 1.75rem;
    color: white;
  }

  .btns {
    display: flex;
  }

  .action-btn {
    width: 8rem;
    height: 3rem;
    line-height: 3rem;
    margin: 0.75rem;
    border-radius: 0.25rem;
    font-size: 1.25rem;
    background-color: white;
    cursor: pointer;
    transition: 0.3s all;
  }

  .action-btn:hover {
    opacity: 1 !important;
  }

  .inputs {
    position: absolute;
    bottom: 2.5vh;
    left: 2.5vw;
    transition: 0.3s all;
    pointer-events: all;
  }

  .input-row {
    margin-top: 0.25rem;
  }

  .input-wrapper {
    display: inline-block;
  }

  .input-title,
  .input-property {
    color: white;
    margin: 0.25rem 0.5rem;
  }

  input {
    width: 10vw;
  }
</style>
