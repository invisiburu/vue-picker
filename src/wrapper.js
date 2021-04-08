import { VuePicker, VuePickerOption } from './index.js'

export function install (Vue) {
  if (install.installed) return
  install.installed = true
  Vue.component('VuePicker', VuePicker)
  Vue.component('VuePickerOption', VuePickerOption)
}

if (typeof window !== 'undefined') {
  window.VuePicker = install
} else if (typeof global !== 'undefined') {
  global.VuePicker = install
}

export { VuePicker, VuePickerOption }
