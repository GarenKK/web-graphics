<template>
  <div>
  	<canvas
  		class="my-canvas"
  		ref="my-canvas">
  	</canvas>
  	<div
  		v-show="loadingPercentage > 0 && loadingPercentage < 100">
  		Loading: {{loadingPercentage}}
  	</div>
  	{{path}}
  </div>
</template>

<script>
	import mixins from '~/mixins/index.js'
  import * as THREE from 'three'
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
  // import { TransformControls } from 'three/examples/jsm/controls/transformControls.js'

  export default {
  	name: 'ModelCanvas',
    data: () => ({
      loadingPercentage: 0
    }),
    props: {
	    path: String
	  },
	  mixins: [mixins],
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

        const skyColor = 0xB1E1FF	// light blue
        const groundColor = 0xB97A20	// brownish orange
         //intensify light proportionally to object size (minimum 2)
        const intensity = boxSize < 200 ? 2 : boxSize / 100
        const light = new THREE.HemisphereLight( skyColor, groundColor, intensity )
        scene.add(light)

        renderer.render( scene, camera )
      }

		  frameArea = ( sizeToFitOnScreen, boxSize, boxCenter, camera ) => {
		  	console.log(sizeToFitOnScreen, boxSize, boxCenter)
		    const halfFovY = THREE.Math.degToRad(camera.fov * .5)
		    const distance = sizeToFitOnScreen / Math.tan(halfFovY)
		    const direction = (new THREE.Vector3())
		        .subVectors({x:1, y:0, z:0}, boxCenter)
		        .multiply(new THREE.Vector3(1, 0, 1))
		        .normalize()
		    // move the camera to a position distance units way from the center
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

<style>
	.my-canvas {
		height: 100%;
		width: 60%;
		background-color: black;
	}
</style>
