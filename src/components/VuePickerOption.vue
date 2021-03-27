<template>
  <button
    class="vue-picker-option"
    type="button"
    :class="{ 'vue-picker-option_cur': isSelected }"
    @click="selectMyValue()"
    :disabled="isDisabled"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'VuePickerOption',

  props: {
    value: { type: String, default: '' },
    text: { type: String, default: '' },
    isDisabled: { type: Boolean, default: false },
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
      this.picker.dropdown.hide()
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

  &_cur {
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
