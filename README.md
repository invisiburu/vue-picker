# vue-picker

A native-like select field, but better.

![version](https://badgen.net/github/tag/invisiburu/vue-picker)
![min size](https://badgen.net/bundlephobia/min/@invisiburu/vue-picker)
![minzip size](https://badgen.net/bundlephobia/minzip/@invisiburu/vue-picker)
![deps count](https://badgen.net/bundlephobia/dependency-count/@invisiburu/vue-picker)
![tree shaking](https://badgen.net/bundlephobia/tree-shaking/@invisiburu/vue-picker)

Mostly behaves like native `<select>` but accepts custom markup for the options
and the opener button.

The options are navigatable from the keyboard. The opener text is easily
customizable.

The package versions of 2 and higher work with Vue3. For Vue2, use prior
versions of the package.

## Demo
See the demo: https://invisiburu.github.io/vue-picker/

See the demo sources in [demo/](demo/)

## The Problem
When you think about a custom selector, you usually come to provide the
options as an array. For sure, it resolves some reactivity issues by default
but also has some pitfalls.

One such pitfall that in most cases, you need to map your data list to an
array of something like `{ label, value }` thus spending extra resources.
Additionally, you write dummy code to display an options selector.

The second pitfall is that default `<select>` provides a more natural way
to render lists - just by giving the elements by themselves, not the arrays.

The third pitfall is the poor customization capabilities of the options.
Which mostly looks similar to the problem of default `<select>`
but a bit milder.

`VuePicker` resolves all of these issues.

## TypeScript
Currently, `VuePicker` comes with no TS declarations because of the poor TS
support within Vue infrastructure. Please contact me or craft an issue if you
think the times have changed or you have any other arguments of introducing
TypeScript to the package. Also, you're welcome to contribute.

## Installation
### Using unpkg:
```html
<head>
  <script src="https://unpkg.com/vue@3"></script>
  <script src="https://unpkg.com/@invisiburu/vue-picker"></script>
  <!-- optional css -->
  <link rel="stylesheet" href="https://unpkg.com/@invisiburu/vue-picker/dist/vue-picker.min.css">
</head>

<body>
  <div id="app"></div>
  <script>
    const App = {
      template:
        '<div>' +
          '<h3>Hello world</h3>' +
          '<VuePicker v-model="mv">' +
            '<VuePickerOption value="opt0">Option 0</VuePickerOption>' +
            '<VuePickerOption value="opt1">Option 1</VuePickerOption>' +
          '</VuePicker>' +
        '</div>',
      data: function () { return { mv: 'opt1' } },
    }
    const app = Vue.createApp(App)
    app.use(window.VuePicker)
    app.mount('#app')
  </script>
</body>
```

### Using npm:
```bash
npm i --save @invisiburu/vue-picker
```

Import in your project:
```js
import { VuePicker, VuePickerOption } from '@invisiburu/vue-picker'
// optional css
import '@invisiburu/vue-picker/dist/vue-picker.min.css'

const app = createApp(/* ... */)
app.component('VuePicker', VuePicker)
app.component('VuePickerOption', VuePickerOption)
```

## Usage
### Basic:
```html
<VuePicker v-model="color" :isAutofocus="true">
  <VuePickerOption value="">Empty</VuePickerOption>
  <VuePickerOption value="red">Red</VuePickerOption>
  <VuePickerOption value="green">Green</VuePickerOption>
  <VuePickerOption value="blue">Blue</VuePickerOption>
  <VuePickerOption value="yellow" :isDisabled="true">Yellow</VuePickerOption>
  <VuePickerOption value="teal" text="Teal">
    How about teal (Teal will be shown instead)
  </VuePickerOption>
</VuePicker>
```

### Custom options:
```html
<template>
  <VuePicker v-model="variant">
    <VuePickerOption value="italic-bold">
      Some <i>italics</i> or <b>bold</b>?
    </VuePickerOption>

    <VuePickerOption value="special" text="Special! Yes!">
      <div class="grid">
        <span class="title">Or something more special?</span>
        <span class="subtitle">I am a subheading!</span>
      </div>
    </VuePickerOption>
  </VuePicker>
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

### Custom opener:
```html
<template>
  <VuePicker v-model="custom">
    <template #opener="{ opener }">
      <span>
        <i>{{ opener.value }}</i>
        <b>{{ opener.text }}</b>
      </span>
    </template>

    <VuePickerOption value="value-1">Value 1</VuePickerOption>
    <VuePickerOption value="value-2">Value 2</VuePickerOption>
  </VuePicker>
</template>
```

## Api
### `VuePicker`
#### Props:
- `isAutofocus` - focus the opener on mount.
- `isDisabled` - disable the component.
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
- `isDisabled` - disable the option. Disabled options cannot be picked or
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

## Issues
In case of a bug or a suggestion, please report on the [Issues page](https://github.com/invisiburu/vue-picker/issues)
or contact me by email.

## Changelog
Check the changes in [CHANGELOG.md](CHANGELOG.md)

## TODO
- JSDoc generated docs
- Unit tests
- Search
- Handle keys: Page down, Page up
- Animation support
- Dropdown position switch if does not fit the screen
- Outer label[for=""] support
- Readonly attr - ?
- iOS, Android full screen style - ?

## License

MIT
