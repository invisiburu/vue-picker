import { VuePicker, VuePickerOption } from './index.js'

function install (vm) {
  if (install.installed) return
  install.installed = true
  vm.component('VuePicker', VuePicker)
  vm.component('VuePickerOption', VuePickerOption)
}

if (typeof window !== 'undefined') {
  window.VuePicker = install
} else if (typeof global !== 'undefined') {
  global.VuePicker = install
}

export { VuePicker, VuePickerOption, install }
