// instead of a backend
let models = [
  {
    name: "phoenix_bird",
    uri: "/phoenix_bird",
    path: "phoenix_bird/scene.gltf",
    thumbnail: "phoenix_bird.png",
    title: "Phoenix Bird",
    light: 4
  },
  {
    name: "pony_cartoon",
    uri: "/pony_cartoon",
    path: "pony_cartoon/scene.gltf",
    thumbnail: "pony_cartoon.png",
    title: "Pony Cartoon",
    light: 15
  },
  {
    name: "skull",
    uri: "/skull",
    path: "skull/scene.gltf",
    thumbnail: "skull.png",
    title: "Skull",
    light: 4
  },
  {
    name: "armenia_flag",
    uri: "/armenia_flag",
    path: "armenia_flag/scene.gltf",
    thumbnail: "armenia_flag.png",
    title: "Armenia Flag",
    light: 4
  },
  {
    name: "fire_animation",
    uri: "/fire_animation",
    path: "fire_animation/scene.gltf",
    thumbnail: "fire_animation.png",
    title: "Video in Smoke Animation",
    light: 5,
    hasVideo: true,
    meshLocation: [0, 0, 0, 0, 0],
    meshIndex: [1, 5, 9, 13]
  },
  {
    name: "flag_animation",
    uri: "/flag_animation",
    path: "flag_animation/scene.gltf",
    thumbnail: "flag_animation.png",
    title: "Video in flag Animation",
    light: 4,
    hasVideo: true,
    meshLocation: [0, 0, 0],
    meshIndex: [0]
  }
]

let modelByName = function (name) {
  return models.find( obj => obj.name == name )
}

export {
  models,
  modelByName
}