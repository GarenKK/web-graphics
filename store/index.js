export const state = () => ({
  type: 'translate',
  positionX: 0,
  positionY: 0,
  positionZ: 0,
  rotationX: 0,
  rotationY: 0,
  rotationZ: 0,
  scaleX: 1,
  scaleY: 1,
  scaleZ: 1
})

export const mutations = {
  type (state, data) {
    if (data === 'translate' || data === 'rotate' || data === 'scale') {
      state.type = data
    }
  },
  positionX (state, data) {
    state.positionX = Number(data)
  },
  positionY (state, data) {
    state.positionY = Number(data)
  },
  positionZ (state, data) {
    state.positionZ = Number(data)
  },
  rotationX (state, data) {
    state.rotationX = Number(data)
  },
  rotationY (state, data) {
    state.rotationY = Number(data)
  },
  rotationZ (state, data) {
    state.rotationZ = Number(data)
  },
  scaleX (state, data) {
    state.scaleX = Number(data)
  },
  scaleY (state, data) {
    state.scaleY = Number(data)
  },
  scaleZ (state, data) {
    state.scaleZ = Number(data)
  }
}

export const getters = {
  type (state) {
    return state.type
  },
  positionX (state) {
    return state.positionX
  },
  positionY (state) {
    return state.positionY
  },
  positionZ (state) {
    return state.positionZ
  },
  rotationX (state) {
    return state.rotationX
  },
  rotationY (state) {
    return state.rotationY
  },
  rotationZ (state) {
    return state.rotationZ
  },
  scaleX (state) {
    return state.scaleX
  },
  scaleY (state) {
    return state.scaleY
  },
  scaleZ (state) {
    return state.scaleZ
  }
}