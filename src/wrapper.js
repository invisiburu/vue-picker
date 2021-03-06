import { VuePicker, VuePickerOption } from './index.js'

export function install (Vue) {
  if (install.installed) return
  install.installed = true
  Vue.component('VuePicker', VuePicker)
  Vue.component('VuePickerOption', VuePickerOption)
}

const plugin = {
  install
}

if (typeof window !== 'undefined') {
  window.VuePicker = install
} else if (typeof global !== 'undefined') {
  window.VuePicker = install
}

export { VuePicker, VuePickerOption }
