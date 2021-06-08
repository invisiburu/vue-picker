module.exports = {
  // publicPath: process.env.NODE_ENV === 'production'
  //   ? 'vue-picker/'
  //   : '/',
  outputDir: 'docs',
  pages: {
    index: {
      template: 'demo/index.html',
      entry: 'demo/demo.js'
    }
  }
}
