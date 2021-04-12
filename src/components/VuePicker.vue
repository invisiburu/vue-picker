<template>
  <div
    class="vue-picker"
    :class="{
      'vue-picker_open': dropdown.isShown.value,
      'vue-picker_disabled': isDisabled,
      'vue-picker_has-val': curOptVal,
    }"
    :ref="dropdown.outClickTarget"
  >
    <button
      class="vue-picker__opener"
      type="button"
      @click="dropdown.toggle($event)"
      @keydown.up.alt.stop.prevent="dropdown.toggle($event)"
      @keydown.up.exact.stop.prevent="selectPrev($event)"
      @keydown.down.alt.stop.prevent="dropdown.toggle($event)"
      @keydown.down.exact.stop.prevent="selectNext($event)"
      @keydown.home.stop.prevent="selectFirst($event)"
      @keydown.end.stop.prevent="selectLast($event)"
      :disabled="isDisabled"
      ref="openerRef"
    >
      <slot
        name="opener"
        :opener="{ value: modelValue, text: openerTxt, opt: curOpt }"
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
import { computed, nextTick, onMounted, provide, ref, toRefs, watch } from 'vue'
import useDropdown from '../composables/useDropdown.js'
import useKeyboardListener from '../composables/useKeyboardListener.js'

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

    const { listen, unlisten, registerActions } = useKeyboardListener()

    const dropdown = useDropdown()

    const openerRef = ref()
    const focusOpener = () => { openerRef.value.focus() }
    const blurOpener = () => { openerRef.value.blur() }

    onMounted(() => {
      registerActions({
        toggleDropdown: () => dropdown.toggle(),
        hideDropdown: () => dropdown.hide(),
        selectFirst: () => selectFirst(),
        selectLast: () => selectLast(),
        selectPrev: () => selectPrev(),
        selectNext: () => selectNext(),
      })

      dropdown.onShow(() => {
        listen()
        if (curOpt.value) nextTick(() => curOpt.value.focus())
        else blurOpener()
        emit('open')
      })
      dropdown.onHide(isOuterClick => {
        unlisten()
        if (!isOuterClick) focusOpener()
        emitCurOptVal()
        emit('close', isOuterClick)
      })

      if (isAutofocus.value) { focusOpener() }
      if (modelValue.value) { selectByValue(modelValue) }
    })

    // opts
    /** @type {VuePickerOption[]} */
    const opts = []
    /** @type {VuePickerOption} */
    let curOpt = ref(null)
    let curOptVal = ref(null)
    let curOptIdx = -1

    const openerTxt = computed(() => {
      if (!modelValue.value && placeholder) return placeholder
      return curOpt.value && curOpt.value.optTxt
    })
    const openerHtml = computed(() => {
      if (!modelValue.value && placeholder) return placeholder
      return curOpt.value && curOpt.value.optHtml
    })

    const selectByIdx = (idx) => {
      if (curOpt.value) curOpt.value.setIsSelected(false)

      curOptIdx = idx
      curOpt.value = opts[idx]
      curOptVal.value = curOpt && curOpt.value

      if (curOpt.value) {
        curOpt.value.focus()
        curOpt.value.setIsSelected(true)
      }

      if (dropdown.isShown.value) return
      emitCurOptVal(curOpt.value ? curOpt.value : modelValue)
    }

    const selectByValue = (value = '') => {
      const idx = opts.findIndex(el => el.value === value)
      if (curOptIdx === idx) return

      const opt = opts[idx]
      if (!opt) return selectByIdx(-1)
      selectByIdx(idx)
    }

    const selectNext = (offset = 1, startIdx = curOptIdx) => {
      const nextIdx = startIdx + offset
      const nextOpt = opts[nextIdx]
      if (!nextOpt) return
      if (nextOpt.isDisabled) return selectNext(offset, nextIdx)
      selectByIdx(nextIdx)
    }

    const selectPrev = () => {
      if (curOptIdx < 0) return selectLast()
      selectNext(-1)
    }

    const selectFirst = () => {
      selectNext(1, -1)
    }

    const selectLast = () => {
      selectNext(-1, opts.length)
    }

    const emitCurOptVal = (val = curOptVal.value) => {
      if (typeof val !== 'string') return
      emit('update:modelValue', val)
    }

    const regOpt = (opt) => {
      opts.push(opt)
    }

    provide('pickerContext', {
      selectByValue: (value = '') => { selectByValue(value) },
      regOpt: (opt) => { regOpt(opt) },
      hideDropdown: () => { dropdown.hide() },
    })

    watch(modelValue, (nV, oV) => {
      if (nV !== oV) {
        selectByValue(nV)
      }
    })

    // /opts

    return {
      dropdown,
      openerRef,
      curOpt,
      curOptVal,
      openerTxt,
      openerHtml,
      selectNext,
      selectPrev,
      selectFirst,
      selectLast,
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
