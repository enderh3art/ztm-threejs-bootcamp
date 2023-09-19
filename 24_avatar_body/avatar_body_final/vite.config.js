import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";

export default {
    root: 'src/',
    publicDir: '../static/',
    base: './',
    plugins: [
        wasm(),
        topLevelAwait()
      ]
}