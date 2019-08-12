<template>
  <div
    class="wrapper">
    <canvas
      class="my-canvas"
      ref="my-canvas">
    </canvas>
    <div
      v-show="loadingPercentage > 0 && loadingPercentage < 100">
      Loading: {{loadingPercentage}}
    </div>
  </div>
</template>

<script>
  import mixins from '~/mixins/index.js'
  import * as THREE from 'three'
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
  import { TransformControls } from 'three/examples/jsm/controls/transformControls.js'

  export default {
    name: 'ModelCanvas',
    data: () => ({
      loadingPercentage: 0,
      update: null,
      changeType: null
    }),
    props: {
      path: String
    },
    mixins: [mixins],
    computed: {
      type () {
        return this.$store.getters.type
      },
      positionX () {
        return this.$store.getters.positionX
      },
      positionY () {
        return this.$store.getters.positionY
      },
      positionZ () {
        return this.$store.getters.positionZ
      },
      rotationX () {
        return this.$store.getters.rotationX
      },
      rotationY () {
        return this.$store.getters.rotationY
      },
      rotationZ () {
        return this.$store.getters.rotationZ
      },
      scaleX () {
        return this.$store.getters.scaleX
      },
      scaleY () {
        return this.$store.getters.scaleY
      },
      scaleZ () {
        return this.$store.getters.scaleZ
      }
    },
    watch: {
      type (newValue, oldValue) {
        this.changeType(newValue)
      },
      positionX (newValue, oldValue) {
        this.update("position", "x", newValue)
      },
      positionY (newValue, oldValue) {
        this.update("position", "y", newValue)
      },
      positionZ (newValue, oldValue) {
        this.update("position", "z", newValue)
      },
      rotationX (newValue, oldValue) {
        this.update("rotation", "x", newValue)
      },
      rotationY (newValue, oldValue) {
        this.update("rotation", "y", newValue)
      },
      rotationZ (newValue, oldValue) {
        this.update("rotation", "z", newValue)
      },
      scaleX (newValue, oldValue) {
        this.update("scale", "x", newValue)
      },
      scaleY (newValue, oldValue) {
        this.update("scale", "y", newValue)
      },
      scaleZ (newValue, oldValue) {
        this.update("scale", "z", newValue)
      }
    },
    mounted () {
      let loader, onLoad, onProgress, onError, frameArea
      loader = new GLTFLoader();
      onProgress = ( xhr ) => {
        if ( xhr.lengthComputable ) {
          this.loadingPercentage = xhr.loaded / xhr.total * 100
        }
      }
      onError = ( error ) => {
        // TODO : handle error
        console.log( 'loadFile onError', error )
      }
      onLoad = ( object ) => {
        let canvas = this.$refs["my-canvas"]
        let renderer = new THREE.WebGLRenderer({canvas})
        renderer.setSize( canvas.clientWidth, canvas.clientHeight)

        let modelScene = object.scene
        let scene = new THREE.Scene()
        scene.add(modelScene)

        const fov = 75
        const aspect = canvas.clientWidth / canvas.clientHeight
        const near = 0.1
        const far = 1000
        const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
        // set the camera to frame the modelScene
        const box = new THREE.Box3().setFromObject(modelScene);
        const boxSize = box.getSize(new THREE.Vector3()).length();
        const boxCenter = box.getCenter(new THREE.Vector3());
        frameArea(boxSize * 0.5, boxSize, boxCenter, camera);

        const skyColor = 0xB1E1FF // light blue
        const groundColor = 0xB97A20  // brownish orange
         //intensify light proportionally to object size (minimum 2)
        const intensity = boxSize < 200 ? 2 : boxSize / 100
        const light = new THREE.HemisphereLight( skyColor, groundColor, intensity )
        scene.add(light)

        const controls = new TransformControls(camera, renderer.domElement);
        this.update = function (type, axis, value) {
          controls.object[type][axis] = value
          renderer.render( scene, camera )
        }
        this.changeType = function (type) {
          controls.setMode(type)
        }
        controls.setMode(this.type)
        controls.addEventListener( 'change', (event) => {
          let controledObj = event.target.object
          this.$store.commit('positionX', controledObj.position.x)
          this.$store.commit('positionY', controledObj.position.y)
          this.$store.commit('positionZ', controledObj.position.z)
          this.$store.commit('rotationX', controledObj.rotation.x)
          this.$store.commit('rotationY', controledObj.rotation.y)
          this.$store.commit('rotationZ', controledObj.rotation.z)
          this.$store.commit('scaleX', controledObj.scale.x)
          this.$store.commit('scaleY', controledObj.scale.y)
          this.$store.commit('scaleZ', controledObj.scale.z)
          renderer.render( scene, camera )
        })
        controls.attach( modelScene )
        scene.add( controls )

        renderer.render( scene, camera )
      }

      frameArea = ( sizeToFitOnScreen, boxSize, boxCenter, camera ) => {
        const halfFovY = THREE.Math.degToRad(camera.fov * .5)
        const distance = sizeToFitOnScreen / Math.tan(halfFovY)
        const direction = (new THREE.Vector3())
            .subVectors({x:1, y:0, z:0}, boxCenter)
            .multiply(new THREE.Vector3(1, 0, 1))
            .normalize()
        // move the camera to a position distance units away from the center
        camera.position.copy(direction.multiplyScalar(distance).add(boxCenter))
        // pick some near and far values for the frustum that will contain the box.
        camera.near = boxSize / 100
        camera.far = boxSize * 100
        camera.updateProjectionMatrix()
        // point the camera to look at the center of the box
        camera.lookAt(boxCenter.x, boxCenter.y, boxCenter.z)
      }
      loader.load( this.getModelSource(this.path), onLoad, onProgress, onError )
    }
  }
</script>

<style scoped>
  .wrapper {
    display: flex;
    justify-content: center;
    background-color: black;
  }

  .my-canvas {
    display: block;
    height: 100%;
  }
</style>
