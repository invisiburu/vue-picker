<template>
  <div class="demo">
    <p class="demo__description">
      Try out how the default select behaves comparing to the vue-picker.<br />
      Try the keyboard shortcuts, ensure the input field reacts to change of the
      external model, etc.
    </p>

    <div class="demo__values">
      <h4 class="demo__values-title">Values:</h4>
      <table class="demo__table">
        <tr class="table__table-row">
          <th class="demo__table-cell">val1</th>
          <th class="demo__table-cell">val2</th>
          <th class="demo__table-cell">val3</th>
          <th class="demo__table-cell">val4</th>
          <th class="demo__table-cell">val5</th>
          <th class="demo__table-cell">val6</th>
        </tr>
        <tr class="table__table-row">
          <td class="demo__table-cell">{{ selVal1 }}</td>
          <td class="demo__table-cell">{{ selVal2 }}</td>
          <td class="demo__table-cell">{{ selVal3 }}</td>
          <td class="demo__table-cell">{{ selVal4 }}</td>
          <td class="demo__table-cell">{{ selVal5 }}</td>
          <td class="demo__table-cell">{{ selVal6 }}</td>
        </tr>
      </table>
    </div>

    <div class="demo__units">
      <div class="demo__unit">
        <p class="demo__lbl">Default select (val1)</p>
        <select class="demo__picker" v-model="selVal1">
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

      <div class="demo__unit">
        <p class="demo__lbl">Default select disabled (val1)</p>
        <select class="demo__picker" v-model="selVal1" disabled>
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

      <div class="demo__unit">
        <p class="demo__lbl">Default select preset (val2)</p>
        <select class="demo__picker" v-model="selVal2">
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
        </select>
      </div>
    </div>

    <div class="demo__units">
      <div class="demo__unit">
        <p class="demo__lbl">VuePicker (val1)</p>
        <VuePicker class="demo__picker" v-model="selVal1" :isAutofocus="true">
          <VuePickerOption value="">Empty</VuePickerOption>
          <VuePickerOption value="" :isDisabled="true"
            >Empty disabled</VuePickerOption
          >
          <VuePickerOption value="val-1">Value 1</VuePickerOption>
          <VuePickerOption value="val-2">Value 2</VuePickerOption>
          <VuePickerOption value="val-3">Value 3</VuePickerOption>
          <VuePickerOption value="val-4" :isDisabled="true"
            >Value 4 (disabled)</VuePickerOption
          >
          <VuePickerOption value="val-5" :isDisabled="true"
            >Value 5 (disabled)</VuePickerOption
          >
          <VuePickerOption value="val-6">Value 6</VuePickerOption>
          <VuePickerOption value="val-7" text="Hello"
            >Custom text: Hello</VuePickerOption
          >
          <VuePickerOption value="val-8">Value 8</VuePickerOption>
        </VuePicker>
      </div>

      <div class="demo__unit">
        <p class="demo__lbl">Disabled (val1)</p>
        <VuePicker class="demo__picker" v-model="selVal1" :isDisabled="true">
          <VuePickerOption value="">Empty</VuePickerOption>
          <VuePickerOption value="" :isDisabled="true"
            >Empty disabled</VuePickerOption
          >
          <VuePickerOption value="val-1">Value 1</VuePickerOption>
          <VuePickerOption value="val-2">Value 2</VuePickerOption>
          <VuePickerOption value="val-3">Value 3</VuePickerOption>
          <VuePickerOption value="val-4" :isDisabled="true"
            >Value 4 (disabled)</VuePickerOption
          >
          <VuePickerOption value="val-5" :isDisabled="true"
            >Value 5 (disabled)</VuePickerOption
          >
          <VuePickerOption value="val-6">Value 6</VuePickerOption>
          <VuePickerOption value="val-7" text="Hello"
            >Custom text: Hello</VuePickerOption
          >
          <VuePickerOption value="val-8">Value 8</VuePickerOption>
        </VuePicker>
      </div>

      <div class="demo__unit">
        <p class="demo__lbl">Long (val1)</p>
        <VuePicker class="demo__picker" v-model="selVal1">
          <VuePickerOption value="">Empty</VuePickerOption>
          <VuePickerOption v-for="id in 100" :key="id" :value="'val-' + id"
            >Value {{ id }}</VuePickerOption
          >
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
        <VuePicker
          class="demo__picker"
          v-model="selVal3"
          placeholder="Select..."
        >
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
              <VuePickerOption v-for="id in 24" :key="id" :value="'val-' + id"
                >Value {{ id }}</VuePickerOption
              >
            </div>
          </template>
        </VuePicker>
      </div>

      <div class="demo__unit">
        <p class="demo__lbl">Custom options (val5)</p>
        <VuePicker class="demo__picker" v-model="selVal5">
          <VuePickerOption value="">Empty</VuePickerOption>
          <VuePickerOption value="val-1"
            >Value 1 <i>Italics</i></VuePickerOption
          >
          <VuePickerOption value="val-2"
            >Value 2
            <p style="display: inline-block; margin: 0">
              <strong>Strong P</strong>
            </p></VuePickerOption
          >
          <VuePickerOption value="val-3" text="Custom text"
            ><del>Value 3</del> Custom text</VuePickerOption
          >
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
          <VuePickerOption value="val-2"
            >Value <strong>Strong</strong></VuePickerOption
          >
          <VuePickerOption value="val-3" text="Custom text"
            ><del>Value 3</del> Custom text</VuePickerOption
          >
        </VuePicker>
      </div>
    </div>

    <h3>Dynamic options:</h3>
    <div class="demo__values">
      <h4 class="demo__values-title">Dynamic values:</h4>
      <table class="demo__table">
        <tr class="table__table-row">
          <th class="demo__table-cell">d-val1</th>
        </tr>
        <tr class="table__table-row">
          <td class="demo__table-cell">{{ dynVal1 }}</td>
        </tr>
      </table>
    </div>

    <div class="demo__units">
      <div class="demo__unit">
        <p class="demo__lbl">Default select (d-val1)</p>
        <select class="demo__picker" v-model="dynVal1">
          <option value="">Empty</option>
          <option v-for="opt of dynOpts1" :key="opt.value" :value="opt.value">
            {{ opt.text }}
          </option>
        </select>
      </div>

      <div class="demo__unit">
        <p class="demo__lbl">Custom select (d-val1)</p>
        <VuePicker class="demo__picker" v-model="dynVal1">
          <VuePickerOption value="">Empty</VuePickerOption>
          <VuePickerOption
            v-for="(opt, idx) in dynOpts1"
            :key="opt.value"
            :value="opt.value"
            :data-idx="idx"
          >
            {{ opt.text }}
          </VuePickerOption>
        </VuePicker>
      </div>

      <div class="demo__unit">
        <p class="demo__lbl">Actions</p>
        <button type="button" @click="genDynOpts1()">Re-generate d-val1</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    const _randOptions = () => {
      const len = _randInt(3, 5)
      const suf = String(_randInt(3, 5))

      const options = []
      for (let idx = 0; idx < len; idx++) {
        options.push({ value: `val-${suf}-${idx}`, text: `Value-${suf} #${idx}` })
      }
      console.log('Generated options:', options)
      return options
    }

    const _randInt = (min, max) => {
      return Math.floor(Math.random() * (max - min)) + min
    }

    const dynOpts1 = ref(_randOptions())
    const dynVal1 = ref(undefined)
    const genDynOpts1 = () => {
      dynOpts1.value = _randOptions()
      dynVal1.value = undefined
    }

    return {
      selVal1: ref(undefined),
      selVal2: ref('val-2'),
      selVal3: ref(undefined),
      selVal4: ref(undefined),
      selVal5: ref(undefined),
      selVal6: ref(undefined),

      dynOpts1,
      dynVal1,
      genDynOpts1,
    }
  }
}
</script>

<style scoped>
.demo__values {
  grid-area: values;
}

.demo__values-title {
  margin: 0;
}

.demo__table {
  border: 1px solid #333333;
  border-collapse: collapse;
  margin-top: 4px;
}

.demo__table-cell {
  border: 1px solid #333333;
  padding: 4px;
}

.demo__description {
  grid-area: description;
}

.demo__picker {
  width: 100%;
  min-height: 37px;
}

.demo__picker > .vue-picker__opener {
  min-height: 37px;
}

.demo__units {
  grid-area: units;
  display: grid;
  grid: auto / repeat(auto-fill, minmax(100px, 200px));
  gap: 20px;
}

.demo__unit {
  width: auto;
}

.demo__lbl {
  width: auto;
}

.demo__dropdown-custom {
  background: lightcyan;
  padding: 8px;
  overflow: auto;
  max-height: 100px;
}

.demo__dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  margin-right: 4px;
  border-radius: 50%;
  border: 1px solid blue;
  background: orange;
}

@media screen and (max-width: 376px) {
  .demo__units {
    grid: auto-flow auto / auto;
  }
}
</style>
