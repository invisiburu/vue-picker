<template>
  <div class="hello">
    <select v-model="selectValue">
      <option value="">Empty</option>
      <option value="" disabled>Empty disabled</option>
      <option value="privet">Privet</option>
      <option value="privet-2">Privet 2</option>
      <option value="privet-3">Privet 3</option>
      <option value="privet-4" disabled>Privet 4 (disabled</option>
    </select>

    <picker class="hello__picker" v-model="pickerValue">
      <picker-option value="">
        Empty
      </picker-option>
      <picker-option value="" :disabled="true">
        Empty disabled
      </picker-option>
      <picker-option value="privet">
        Privet
      </picker-option>
      <picker-option value="privet-2">
        Privet 2
      </picker-option>
      <picker-option value="privet-3">
        Privet 3
      </picker-option>
      <picker-option value="privet-4" :disabled="true">
        Privet 4 (disabled)
      </picker-option>
      <picker-option value="custom" selected-label="Hello">
        Custom label: Hello
      </picker-option>
    </picker>

    <picker class="hello__picker" v-model="pickerValue">
      <picker-option value="">
        Empty
      </picker-option>
      <picker-option value="" :disabled="true">
        Empty disabled
      </picker-option>
      <picker-option value="privet">
        Privet
      </picker-option>
      <picker-option value="privet-2">
        Privet 2
      </picker-option>
      <picker-option value="privet-3">
        Privet 3
      </picker-option>
      <picker-option value="privet-4" :disabled="true">
        Privet 4 (disabled)
      </picker-option>
      <picker-option value="custom" selected-label="Hello">
        Custom label: Hello
      </picker-option>
    </picker>

      <picker class="hello__picker" v-model="pickerValue2">
      <picker-option value="">
        Empty
      </picker-option>
      <picker-option value="" :disabled="true">
        Empty disabled
      </picker-option>
      <picker-option value="privet">
        Privet
      </picker-option>
      <picker-option value="privet-2">
        Privet 2
      </picker-option>
      <picker-option value="privet-3">
        Privet 3
      </picker-option>
      <picker-option value="privet-4" :disabled="true">
        Privet 4 (disabled)
      </picker-option>
      <picker-option value="custom" selected-label="Hello">
        Custom label: Hello
      </picker-option>
    </picker>
  </div>
</template>

<script>
import { Picker, PickerOption } from './Picker'

export default {
  name: 'HelloWorld',
  data () {
    return {
      selectValue: undefined,
      pickerValue: undefined,
      pickerValue2: 'privet-3',
    }
  },
  components: {
    Picker,
    PickerOption,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello__picker {
  max-width: 200px;
  margin: auto;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
