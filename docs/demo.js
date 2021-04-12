/* global Vue */

const App = {
  template: `
    <div class="demo">
      <p class="demo__description">
        Try out how the default select behaves comparing to the vue-picker.<br>
        Try the keyboard shortcuts, ensure the input field reacts to change of
        the external model, etc.
      </p>

      <aside class="demo__aside">
        <div class="demo__unit">
          <p class="demo__lbl">Default select (val1)</p>
          <select v-model="selVal1">
            <option value="">Empty</option>
            <option value="" disabled>Empty disabled</option>
            <option value="val-1">Value 1</option>
            <option value="val-2">Value 2</option>
            <option value="val-3" disabled>Value 3 (disabled)</option>
            <option value="val-4" disabled>Value 4 (disabled)</option>
            <option value="val-5">Value 5</option>
            <option value="val-6">Value 6</option>
            <option value="val-7">Value 7</option>
            <option value="val-8">Value 8</option>
            <option value="val-9">Value 9</option>
            <option value="val-10">Value 10</option>
            <option value="val-11">Value 11</option>
            <option value="val-12">Value 12</option>
            <option value="val-13">Value 13</option>
            <option value="val-14">Value 14</option>
            <option value="val-15">Value 15</option>
            <option value="val-16">Value 16</option>
            <option value="val-17">Value 17</option>
            <option value="val-18">Value 18</option>
            <option value="val-19">Value 19</option>
            <option value="val-20">Value 20</option>
            <option value="val-21">Value 21</option>
            <option value="val-22">Value 22</option>
          </select>
        </div>
      </aside>

      <div class="demo__units">
        <div class="demo__unit">
          <p class="demo__lbl">VuePicker (val1)</p>
          <VuePicker class="demo__picker" v-model="selVal1" autofocus>
            <VuePickerOption value="">Empty</VuePickerOption>
            <VuePickerOption value="" :isDisabled="true">Empty disabled</VuePickerOption>
            <VuePickerOption value="val-1">Value 1</VuePickerOption>
            <VuePickerOption value="val-2">Value 2</VuePickerOption>
            <VuePickerOption value="val-3">Value 3</VuePickerOption>
            <VuePickerOption value="val-4" :isDisabled="true">Value 4 (disabled)</VuePickerOption>
            <VuePickerOption value="val-5" :isDisabled="true">Value 5 (disabled)</VuePickerOption>
            <VuePickerOption value="val-6" >Value 6</VuePickerOption>
            <VuePickerOption value="val-7" text="Hello">Custom text: Hello</VuePickerOption>
            <VuePickerOption value="val-8">Value 8</VuePickerOption>
          </VuePicker>
        </div>

        <div class="demo__unit">
          <p class="demo__lbl">Disabled (val1)</p>
          <VuePicker class="demo__picker" v-model="selVal1" :isDisabled="true">
            <VuePickerOption value="">Empty</VuePickerOption>
            <VuePickerOption value="" :isDisabled="true">Empty disabled</VuePickerOption>
            <VuePickerOption value="val-1">Value 1</VuePickerOption>
            <VuePickerOption value="val-2">Value 2</VuePickerOption>
            <VuePickerOption value="val-3">Value 3</VuePickerOption>
            <VuePickerOption value="val-4" :isDisabled="true">Value 4 (disabled)</VuePickerOption>
            <VuePickerOption value="val-5" :isDisabled="true">Value 5 (disabled)</VuePickerOption>
            <VuePickerOption value="val-6" >Value 6</VuePickerOption>
            <VuePickerOption value="val-7" text="Hello">Custom text: Hello</VuePickerOption>
            <VuePickerOption value="val-8">Value 8</VuePickerOption>
          </VuePicker>
        </div>

        <div class="demo__unit">
          <p class="demo__lbl">Long (val1)</p>
          <VuePicker class="demo__picker" v-model="selVal1">
            <VuePickerOption value="">Empty</VuePickerOption>
            <VuePickerOption v-for="id in 100" :key="id" :value="'val-' + id">Value {{id}}</VuePickerOption>
          </VuePicker>
        </div>

        <div class="demo__unit">
          <p class="demo__lbl">Preset value (val2)</p>
          <VuePicker class="demo__picker" v-model="selVal2">
            <VuePickerOption value="">Empty</VuePickerOption>
            <VuePickerOption value="val-1">Value 1</VuePickerOption>
            <VuePickerOption value="val-2">Value 2</VuePickerOption>
            <VuePickerOption value="val-3">Value 3</VuePickerOption>
          </VuePicker>
        </div>

        <div class="demo__unit">
          <p class="demo__lbl">With placeholder (val3)</p>
          <VuePicker class="demo__picker" v-model="selVal3" placeholder="Select...">
            <VuePickerOption value="">Empty</VuePickerOption>
            <VuePickerOption value="val-1">Value 1</VuePickerOption>
            <VuePickerOption value="val-2">Value 2</VuePickerOption>
            <VuePickerOption value="val-3">Value 3</VuePickerOption>
          </VuePicker>
        </div>

        <div class="demo__unit">
          <p class="demo__lbl">No model</p>
          <VuePicker class="demo__picker">
            <VuePickerOption value="">Empty</VuePickerOption>
            <VuePickerOption value="val-1">Value 1</VuePickerOption>
            <VuePickerOption value="val-2">Value 2</VuePickerOption>
            <VuePickerOption value="val-3">Value 3</VuePickerOption>
          </VuePicker>
        </div>

        <div class="demo__unit">
          <p class="demo__lbl">Custom dropdown (val4)</p>
          <VuePicker class="demo__picker" v-model="selVal4">
            <template #dropdownInner>
              <div class="demo__dropdown-custom">
                <VuePickerOption v-for="id in 24" :key="id" :value="'val-' + id">Value {{id}}</VuePickerOption>
              </div>
            </template>
          </VuePicker>
        </div>

        <div class="demo__unit">
          <p class="demo__lbl">Custom options (val5)</p>
          <VuePicker class="demo__picker" v-model="selVal5">
            <VuePickerOption value="">Empty</VuePickerOption>
            <VuePickerOption value="val-1">Value 1 <i>Italics</i></VuePickerOption>
            <VuePickerOption value="val-2">Value 2 <p style="display:inline-block; margin:0;"><strong>Strong P</strong></p></VuePickerOption>
            <VuePickerOption value="val-3" text="Custom text"><del>Value 3</del> Custom text</VuePickerOption>
          </VuePicker>
        </div>

        <div class="demo__unit">
          <p class="demo__lbl">Custom opener (val6)</p>
          <VuePicker class="demo__picker" v-model="selVal6">
            <template #opener="{ opener }">
              <span v-if="opener.value">
                <i class="demo__dot" />
                <i>V:{{ opener.value }}</i>
                <span> - {{ opener.text }}</span>
              </span>
            </template>
            <VuePickerOption value="">Empty</VuePickerOption>
            <VuePickerOption value="val-1">Value <i>Italics</i></VuePickerOption>
            <VuePickerOption value="val-2">Value <strong>Strong</strong></VuePickerOption>
            <VuePickerOption value="val-3" text="Custom text"><del>Value 3</del> Custom text</VuePickerOption>
          </VuePicker>
        </div>
      </div>
    </div>

    <div>
      <p>val1: {{ selVal1 }}</p>
      <p>val2: {{ selVal2 }}</p>
      <p>val3: {{ selVal3 }}</p>
      <p>val4: {{ selVal4 }}</p>
      <p>val5: {{ selVal5 }}</p>
      <p>val6: {{ selVal6 }}</p>
    </div>
  `,

  data () {
    return {
      selVal1: undefined,
      selVal2: 'val-2',
      selVal3: undefined,
      selVal4: undefined,
      selVal5: undefined,
      selVal6: undefined,
    }
  }
}

const app = Vue.createApp(App)

app.config.productionTip = false
app.use(window.VuePicker)

app.mount('#app')
