<template>
  <button
    class="vue-picker-option"
    type="button"
    :class="{ 'vue-picker-option_cur': isSelected }"
    @click="selectMyValue($event)"
    :disabled="isDisabled"
    ref="btnRef"
  >
    <slot />
  </button>
</template>

<script>
import { computed, inject, onBeforeUnmount, ref, toRefs } from 'vue'
// TODO: test if dynamically add options works
// TODO: refactor provide-inject https://v3.vuejs.org/guide/composition-api-provide-inject.html
// TODO: cleanup comments: https://github.com/aMarCruz/rollup-plugin-cleanup
// TODO: space should not close the dropdown

// spell-checker:words unregister

export default {
  name: 'VuePickerOption',

  props: {
    value: { type: String, default: '' },
    text: { type: String, default: '' },
    isDisabled: { type: Boolean, default: false },
  },

  setup (props) {
    const { value, text } = toRefs(props)
    const btnRef = ref()
    const isSelected = ref(false)

    const option = {
      value: value.value,
      isDisabled: props.isDisabled,
      optHtml: computed(() => {
        const btnHtml = btnRef.value && btnRef.value.innerHTML
        return text.value || btnHtml || value.value
      }),
      optTxt: computed(() => {
        const btnText = btnRef.value && btnRef.value.innerText
        return text.value || btnText || value.value
      }
      ),
      setIsSelected: (val) => { isSelected.value = val },
      focus: () => { btnRef.value && btnRef.value.focus() },
    }

    const picker = inject('pickerContext')
    picker.registerOption(option)

    onBeforeUnmount(() => {
      console.log('Unmounted', option)
      picker.unregisterOption(option)
    })

    return {
      btnRef,
      isSelected,
      selectMyValue: () => {
        picker.selectByValue(value.value)
        picker.hideDropdown()
      },
    }
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
