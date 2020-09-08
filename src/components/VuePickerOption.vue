<template>
  <button
    class="vue-picker-option"
    type="button"
    :class="{ 'vue-picker-option--cur': isSelected }"
    @click="selectMyValue()"
    :disabled="isDisabled"
  >
    <slot />
  </button>
</template>

<script>
import { attrs } from '../mixins/attrs'

const attrsMixin = attrs('disabled')

export default {
  name: 'VuePickerOption',

  mixins: [attrsMixin],

  props: {
    value: { type: String, default: '' },
    text: { type: String, default: '' },
  },

  data () {
    return { isSelected: false }
  },

  inject: { picker: 'pickerContext' },

  computed: {
    optHtml () { return this.text || this.$el.innerHTML || this.value },
    optTxt () { return this.text || this.$el.innerText || this.value },
  },

  created () {
    this.picker.regOpt(this)
  },

  methods: {
    selectMyValue () {
      this.picker.selectByValue(this.value)
      this.picker.hideDropdown()
    },
  },
}
</script>

<style lang="scss">
.vue-picker-option {
  display: block;
  text-align: start;
  width: 100%;
  background: none;
  border: none;
  padding: 8px;

  &--cur {
    font-weight: bold;
  }

  &:disabled {
    color: var(--col-disabled);
  }

  &:hover:not(:disabled) {
    background-color: lightgray;
  }
}
</style>
