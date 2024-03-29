import commonjs from '@rollup/plugin-commonjs'
import buble from '@rollup/plugin-buble'
import vue from 'rollup-plugin-vue'
import scss from 'rollup-plugin-scss'
import { terser } from 'rollup-plugin-terser'

export default {
  input: 'src/wrapper.js',
  output: {
    name: 'VuePicker',
    exports: 'named',
    globals: { 'vue': 'Vue' },
  },
  external: ['vue'],
  plugins: [
    vue({
      css: false,
    }),
    scss(),
    commonjs(),
    buble({
      transforms: {
        classes: true,
      }
    }),
    (process.env.NODE_ENV === 'production' && terser()),
  ],
};
