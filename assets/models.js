// instead of a backend
let models = [
  {
    name: "hand",
    uri: "/hand",
    path: "hand/scene.gltf",
    thumbnail: "hand.png",
    title: "Hand"
  },
  {
    name: "pony_cartoon",
    uri: "/pony_cartoon",
    path: "pony_cartoon/scene.gltf",
    thumbnail: "pony_cartoon.png",
    title: "Pony Cartoon"
  },
  {
    name: "skull",
    uri: "/skull",
    path: "skull/scene.gltf",
    thumbnail: "skull.png",
    title: "Skull"
  }
]

let modelByName = function (name) {
  return models.find( obj => obj.name == name )
}

export {
  models,
  modelByName
}