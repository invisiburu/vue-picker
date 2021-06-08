import { createApp } from 'vue'
import Demo from './Demo.vue'

import { VuePicker, VuePickerOption } from './lib/vue-picker.esm.js'
import './lib/vue-picker.esm.css'

const app = createApp(Demo)
app.component('VuePicker', VuePicker)
app.component('VuePickerOption', VuePickerOption)

app.mount('#app')
