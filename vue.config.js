module.exports = {
  lintOnSave: false,

  devServer: {
    host: 'localhost'
  },

  runtimeCompiler: true,

  pluginOptions: {
    quasar: {}
  },

  transpileDependencies: [
    /[\\\/]node_modules[\\\/]quasar[\\\/]/
  ]
}
