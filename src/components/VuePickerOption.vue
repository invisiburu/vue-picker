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

  inject: { picker: 'pickerContext' },

  computed: {
    isSelected () {
      return this.picker.value
        ? this.picker.value === this.value
        : !this.picker.placeholder  && this.picker.value === this.value
    },

    slotTxt () {
      return (this.$slots.default || []).map(el => el.text).join(' ')
    },

    optTxt () {
      return this.text || this.slotTxt || this.value
    }
  },

  watch: {
    'picker.value': {
      immediate: true,
      handler (newV) {
        if (newV !== this.value || this.picker.openerTxt === this.optTxt) return
        this.selectMyValue()
      },
    },
  },

  methods: {
    selectMyValue () {
      this.picker.selectOption(this.value, this.optTxt)
    },
  },
}
</script>

<style lang="scss" scoped>
.vue-picker-option {
  display: block;
  text-align: start;
  width: 100%;
  background: none;
  border: none;
  padding: 4px 8px;

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
