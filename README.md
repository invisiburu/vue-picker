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
### Basic:
```html
<vue-picker v-model="color" autofocus>
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

<!-- - The options can be navigated or toggled from the keyboard.
- Provide `text` attr to an option to override the result text in the opener.  
- Both `VuePicker` and `VuePickerOption` accept `disabled` attribute.
- Provide `autofocus` attribute to the `VuePicker` to focus the component
  on mount.
- Provide `placeholder` attribute to the `VuePicker` to override -->

### Custom options:
```html
<template>
  <vue-picker v-model="variant">
    <vue-picker-option value="italic-bold">
      Some <i>italics</i> or <b>bold</b>?
    </vue-picker-option>

    <vue-picker-option value="special" text="Special! Yes!">
      <div class="grid">
        <span class="title">Or something more special?</span>
        <span class="subtitle">I am a subheading!</span>
      </div>
    </vue-picker-option>
  </vue-picker>
</template>

<style scoped>
.grid {
  display: grid;
  grid: auto-flow auto / auto;
  gap: 4px;
}

.title {
  font-size: 1.05em;
  font-weight: bold;
}

.subtitle {
  font-size: 0.9em;
  color: lightgray;
}
</style>
```
- The opener displays origin markup of the selected option unless `text` attr
  provided.
-

### Custom opener:
```html
<template>
  <vue-picker v-model="custom">
    <template #opener="{ opener }">
      <span>
        <i>{{ opener.value }}</i>
        <b>{{ opener.text }}</b>
      </span>
    </template>

    <vue-picker-option value="value-1">Value 1</vue-picker-option>
    <vue-picker-option value="value-2">Value 2</vue-picker-option>
  </vue-picker>
</template>
```

## Api
### `VuePicker`
#### Props:
- `autofocus` - focus the opener on mount.
- `disabled` - disable the component.
- `value` - the value, should be a string. The behaviour is not defined for
  values that do not exist within provided options.
- `placeholder` - a text to show when `value` is null, undefined or an
  empty string.

#### Emitted events:
- `input` - an option selected. Carries the new value to assign.
- `open` - dropdown open.
- `close` - dropdown closed. Carries `true` if closed by the outer click.

#### Slots:
- `default` - a picker option. Should be a `<VuePickerOption>`.
- `opener` - override the displayed opener text.
  Provides the `opener` scope var with `{ value, text, opt }`, where:
    - `value` - the selected value.
    - `text` - the text that was intended to display by the opener
      (HTML stripped). Content of the `placeholder` attribute prevails over
      empty option values.
    - `opt` - context of the current option.
- `openerIco` - override the default expand arrow
- `dropdownInner` - use if you want a custom dropdown inner container

### `VuePickerOption`
#### Props:
- `disabled` - disable the option. Disabled options cannot be picked or
  navigated.
- `value` - value to set on when the option selected.
- `text` - text to be displayed instead of the content of the `default` slot.
  Also overrides the `optHtml` and `optTxt` computed properties of the
  component.
#### Slots:
- `default` - content to be displayed in the options list and in the opener
  when the option is selected. Can contain any markup, the opener will
  display it as is. Please consider using the `text` prop if you plan complex
  things in here.
#### Computed
You can use these computed properties within the `opt` param of the `opener`
slot.
- `optHtml` - returns the HTML from the `default` slot of the component.
- `optTxt` - returns the HTML from the `default` slot of the component.
  Mostly the same as `text` param of the `opener` slot but does not respect
  `placeholder` attr of the picker.


## TODO
- JSDoc generated docs
- Search
- Handle keys: Page down, Page up
- Animation support
- Dropdown position switch if does not fit the screen
- Outer label[for=""] support
- Readonly attr - ?
- iOS, Android full screen style - ?

## License

MIT
