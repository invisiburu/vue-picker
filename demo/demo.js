import { createApp } from 'vue'
import Demo from './Demo.vue'

// import { install as installVuePicker } from './lib/vue-picker.esm.js'
import { VuePicker, VuePickerOption } from './lib/vue-picker.esm.js'
import './lib/vue-picker.esm.css'

// console.log(installVuePicker)

const app = createApp(Demo)
// app.use(installVuePicker)
app.component('VuePicker', VuePicker)
app.component('VuePickerOption', VuePickerOption)

app.mount('#app')
