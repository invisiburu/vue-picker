<template>
  <button
    class="vue-picker-option"
    type="button"
    :class="{ 'vue-picker-option_cur': isSelected }"
    @click="selectMyValue($event)"
    :disabled="isDisabled"
    :ref="btnRef"
  >
    <slot />
  </button>
</template>

<script>
import { computed, inject, ref, toRefs } from 'vue'
// TODO: test if dynamically add options works
// TODO: refactor provide-inject https://v3.vuejs.org/guide/composition-api-provide-inject.html

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

    const picker = inject('pickerContext')
    picker.regOpt({
      value: value.value,
      optHtml: computed(
        () => { console.log(text.value, (btnRef.value && btnRef.value.innerHTML), value.value); text.value || (btnRef.value && btnRef.value.innerHTML) || value.value }
      ),
      optTxt: computed(
        () => { console.log(text.value, (btnRef.value && btnRef.value.innerText), value.value); text.value || (btnRef.value && btnRef.value.innerText) || value.value }
      ),
      setIsSelected: () => { isSelected.value = false },
      focus: () => { btnRef.value && btnRef.value.focus() },
    })

    const selectMyValue = () => {
      picker.selectByValue(value.value)
      picker.dropdown.hide()
    }

    return {
      btnRef,
      isSelected,
      selectMyValue,
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
