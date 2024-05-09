const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  devServer: {
    port: 8080
  }
}

// vue.config.js
// module.exports = {
//   compilerOptions: {
//     isCustomElement: (tag) => tag.startsWith('panier-') // Replace 'panier-' with the prefix used for your custom elements
//   } 
// };
// module.exports = {
//   css: {
//     loaderOptions: {
//       css: {
//         importLoaders: 1,
//       },
//       postcss: {
//         plugins: [require('tailwindcss'), require('autoprefixer')],
//       },
//     },
//   },
// };
