<template>
  <div
    class="vue-picker"
    :class="{
      'vue-picker_open': dropdown.isShown.value,
      'vue-picker_disabled': isDisabled,
      'vue-picker_has-val': placeholder ? modelValue : curOptVal,
    }"
    :ref="dropdown.clickOutRef"
  >
    <button
      class="vue-picker__opener"
      type="button"
      @click="dropdown.toggle()"
      @keydown.up.alt.stop.prevent="dropdown.toggle()"
      @keydown.up.exact.stop.prevent="options.selectPrev()"
      @keydown.down.alt.stop.prevent="dropdown.toggle()"
      @keydown.down.exact.stop.prevent="options.selectNext()"
      @keydown.home.stop.prevent="options.selectFirst()"
      @keydown.end.stop.prevent="options.selectLast()"
      :disabled="isDisabled"
      ref="openerRef"
    >
      <slot
        name="opener"
        :opener="{ value: curOptVal, text: openerTxt, opt: curOpt }"
      >
        <span class="vue-picker__opener-txt" v-html="openerHtml" />
      </slot>

      <slot name="openerIco">
        <i class="vue-picker__opener-ico" />
      </slot>
    </button>

    <div class="vue-picker__dropdown" v-show="dropdown.isShown.value">
      <slot name="dropdownInner">
        <slot />
      </slot>
    </div>
  </div>
</template>

<script>
import { computed, nextTick, onBeforeUnmount, onMounted, provide, ref, toRefs, watch } from 'vue'
import useDropdown from '../composables/useDropdown.js'
import useOptions from '../composables/useOptions.js'
import useKeyboard from '../composables/useKeyboard.js'

export default {
  name: 'VuePicker',

  emits: ['open', 'close', 'update:modelValue'],

  props: {
    modelValue: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    isDisabled: { type: Boolean, default: false },
    isAutofocus: { type: Boolean, default: false },
  },

  setup (props, { emit }) {
    const { modelValue, placeholder, isAutofocus } = toRefs(props)
    const openerRef = ref()


    const dropdown = useDropdown()
    const options = useOptions()
    const kb = useKeyboard(dropdown, options)

    options.onSelect((value) => {
      if (dropdown.isShown.value) return
      emitModelValue(value !== undefined ? value : modelValue.value)
    })

    watch(modelValue, (nV, oV) => { nV !== oV && options.selectByValue(nV) })

    onMounted(() => {
      dropdown.onShow(() => {
        kb.listenOn(document)
        if (options.current.value) {
          nextTick(() => options.current.value.focus())
        } else {
          openerRef.value.blur()
        }
        emit('open')
      })
      dropdown.onHide(isOuterClick => {
        kb.unlistenOn(document)
        if (!isOuterClick) openerRef.value.focus()
        emitModelValue()
        emit('close', isOuterClick)
      })

      if (isAutofocus.value) { openerRef.value.focus() }
      if (modelValue.value) { options.selectByValue(modelValue.value) }
    })

    onBeforeUnmount(() => kb.unlisten(document))

    const openerTxt = computed(() => {
      if (!modelValue.value && placeholder.value) return placeholder.value
      return options.current.value && options.current.value.optTxt
    })
    const openerHtml = computed(() => {
      if (!modelValue.value && placeholder.value) return placeholder.value
      return options.current.value && options.current.value.optHtml
    })

    provide('pickerContext', {
      selectByValue: (value = '') => { options.selectByValue(value) },
      registerOption: (opt) => { options.registerOption(opt) },
      hideDropdown: () => { dropdown.hide() },
    })

    const emitModelValue = (val = options.currentValue.value) => {
      if (typeof val !== 'string') return
      emit('update:modelValue', val)
    }

    return {
      dropdown,
      options,
      openerRef,
      curOpt: options.current,
      curOptVal: options.currentValue,
      openerTxt,
      openerHtml,
    }
  },
}
</script>

<style lang="scss">
.vue-picker {
  --col: black;
  --col-dd-bg: white;
  --col-disabled: lightgray;
  --col-placeholder: lightgray;
  --col-border: gray;

  display: inline-block;
  position: relative;

  &_disabled {
    --col-border: var(--col-disabled);
  }
}

.vue-picker__opener {
  background: none;
  text-align: start;
  width: inherit;
  border: 1px solid var(--col-border);
  color: var(--col);
  padding: 10px;
  display: grid;
  grid: '. ico' / 1fr auto;
  gap: 10px;
  align-items: center;

  &:focus {
    outline: none;
    border-color: var(--col);
    box-shadow: inset 0 0 0 1px var(--col);
  }

  &:disabled {
    color: var(--col-disabled);
    cursor: not-allowed;
  }

  .vue-picker:not(.vue-picker_has-val) > & {
    color: var(--col-placeholder);
  }
}

.vue-picker__opener-ico {
  grid-area: ico;
  pointer-events: none;

  &:after {
    content: '';
    display: block;
    width: 0.5em;
    height: 0.5em;
    border: solid var(--col-border);
    border-width: 0 2px 2px 0;
    transform: translate(0, -25%) rotate(45deg);
  }
}

.vue-picker__dropdown {
  background: var(--col-dd-bg);
  border: 1px solid var(--col-border);
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 1;
  max-height: 240px;
  padding: 8px 0;
  overflow-y: auto;
  display: inline-block;
}
</style>
