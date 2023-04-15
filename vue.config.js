const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8000,
    // proxy: {
    //   '/api': {
    //     ws: true,
    //     changeOrigin: true,
    //     target: 'http://127.0.0.1:9000',
    //     rewrite: (path) => path.replace(/^\/api/, '')
    //   },
    //   '/ws': {
    //     ws: false,
    //     changeOrigin: true,
    //     target: 'ws://127.0.0.1:9898',
    //     rewrite: (path) => path.replace(/^\/ws/, '')
    //   }
    // }
  }
})
