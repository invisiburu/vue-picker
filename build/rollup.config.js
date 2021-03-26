import commonjs from '@rollup/plugin-commonjs'
import buble from '@rollup/plugin-buble'
import vue from 'rollup-plugin-vue'
import scss from 'rollup-plugin-scss'
// import css from 'rollup-plugin-css-only'
import { terser } from 'rollup-plugin-terser'

export default {
  input: 'src/wrapper.js',
  output: {
    name: 'VuePicker',
    exports: 'named',
    globals: { 'vue': 'Vue' },
  },
  plugins: [
    // css(),
    vue({
      css: false,
    }),
    scss(),
    commonjs(),
    buble(),
    (process.env.NODE_ENV === 'production' && terser()),
  ],
};
