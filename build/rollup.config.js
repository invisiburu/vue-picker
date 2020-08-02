import commonjs from '@rollup/plugin-commonjs'
import buble from '@rollup/plugin-buble'
import vue from 'rollup-plugin-vue'
import css from 'rollup-plugin-css-only'
import { terser } from 'rollup-plugin-terser'

export default {
  input: 'src/wrapper.js',
  output: {
    name: 'VuePicker',
    exports: 'named'
  },
  plugins: [
    css(),
    commonjs(),
    vue({
      css: false,
      compileTemplate: true,
    }),
    buble(),
    (process.env.NODE_ENV === 'production' && terser()),
  ],
};
