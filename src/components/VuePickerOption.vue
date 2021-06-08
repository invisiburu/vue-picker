<template>
  <button
    ref="btnRef"
    class="vue-picker-option"
    type="button"
    :class="{ 'vue-picker-option_cur': isSelected }"
    @click="selectMyValue($event)"
    @keydown.space.prevent.stop
    :disabled="isDisabled"
    :data-value="value"
  >
    <slot />
  </button>
</template>

<script>
import { computed, onBeforeUnmount, ref } from 'vue'
import { useOptionsAsChild } from '../composables/useOptions.js'
import { useDropdownAsChild } from '../composables/useDropdown.js'

export default {
  name: 'VuePickerOption',

  props: {
    value: { type: String, default: '' },
    text: { type: String, default: '' },
    isDisabled: { type: Boolean, default: false },
  },

  setup (props) {
    const btnRef = ref()
    const isSelected = ref(false)

    const { registerOption, selectByValue } = useOptionsAsChild()
    const { hide: hideDropdown } = useDropdownAsChild()

    const option = {
      value: props.value,
      optHtml: computed(() => {
        const btnHtml = btnRef.value && btnRef.value.innerHTML
        return props.text || btnHtml || props.value
      }),
      optTxt: computed(() => {
        const btnText = btnRef.value && btnRef.value.innerText
        return props.text || btnText || props.value
      }
      ),
      setIsSelected: (val) => { isSelected.value = val },
      focus: () => { btnRef.value && btnRef.value.focus() },
    }

    const unregOpt = registerOption(option)
    onBeforeUnmount(unregOpt)

    return {
      btnRef,
      isSelected,
      selectMyValue: () => {
        selectByValue(props.value)
        hideDropdown()
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
