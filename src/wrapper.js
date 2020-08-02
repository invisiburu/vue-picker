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

let GlobalVue = null
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue
}
if (GlobalVue) {
  GlobalVue.use(plugin)
}

export { VuePicker, VuePickerOption }
