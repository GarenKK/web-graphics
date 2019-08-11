export default {
  methods: {
    getImgSource (path) {
      return require('~/assets/img/' + path)
    },
    getModelSource (path) {
      return './models/' + path
    }
  }
}