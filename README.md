# vue-picker

A picker that (mostly) behaves like native `<select>` but accepts custom
markup for the options and the opener button.

## Installation
In browser:
```html
<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/@invisiburu/vue-picker"></script>
<!-- optional css -->
<link rel="stylesheet" href="https://unpkg.com/@invisiburu/vue-picker/dist/vue-picker.min.css">
```

Using npm:
```bash
npm i --save @invisiburu/vue-picker
```

Import in your project:
```js
import { VuePicker, VuePickerOption } from '@invisiburu/vue-picker'
// optional css
import '@invisiburu/vue-picker/dist/vue-picker.min.css'


Vue.component('VuePicker', VuePicker)
Vue.component('VuePickerOption', VuePickerOption)
```

## Usage
Basic:
```html
<vue-picker v-model="color">
  <vue-picker-option value="">Empty</vue-picker-option>
  <vue-picker-option value="red">Red</vue-picker-option>
  <vue-picker-option value="green">Green</vue-picker-option>
  <vue-picker-option value="blue">Blue</vue-picker-option>
  <vue-picker-option value="yellow" disabled>Yellow</vue-picker-option>
  <vue-picker-option value="teal" text="Teal">
    How about teal (Teal will be shown instead)
  </vue-picker-option>
</vue-picker>
```

Custom options:
```html
<vue-picker v-model="variant">
  <vue-picker-option value="italic-bold">Some <i>italics</i> or <b>bold</b>?</vue-picker-option>
</vue-picker>
```

## TODO
- Finish the README.md
- Search
- JSDOC generated docs
- handle keys: Page down, Page up
- Outside label[for=""] support
- Animation support
- Dropdown position switch if does not fit the screen
- Readonly attr - ?
- iOS, Android full screen style - ?


## License

MIT
