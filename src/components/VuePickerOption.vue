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
import disabledMixin from '../mixins/disabled'

export default {
  name: 'VuePickerOption',

  mixins: [disabledMixin],

  props: {
    value: { type: String, default: undefined },
    text: { type: String, default: undefined },
  },

  inject: { picker: 'pickerContext' },

  computed: {
    isSelected () {
      return this.picker.value === this.value
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
  border: 1px lightgray solid;

  &--cur {
    font-weight: bold;
  }

  &:disabled {
    color: #cecece;
  }

  &:hover:not(:disabled) {
    background-color: #bebebe;
  }
}
</style>
