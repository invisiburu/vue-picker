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
      ref="opener"
      @click="dropdown.toggle()"
      @keydown.up.alt.stop.prevent="dropdown.toggle()"
      @keydown.up.exact.stop.prevent="selectPrev()"
      @keydown.down.alt.stop.prevent="dropdown.toggle()"
      @keydown.down.exact.stop.prevent="selectNext()"
      @keydown.home.stop.prevent="selectFirst()"
      @keydown.end.stop.prevent="selectLast()"
      :disabled="isDisabled"
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
import useDropdown from '../composables/useDropdown.js'
import useKeyboardListener from '../composables/useKeyboardListener.js'

export default {
  name: 'VuePicker',

  emits: ['open', 'close', 'update:modelValue'],

  setup () {
    const { listen, unlisten, registerActions } = useKeyboardListener()

    const dropdown = useDropdown()
    dropdown.onShow(listen)
    dropdown.onHide(unlisten)

    return {
      dropdown,
      registerKeyboardActions: registerActions,
    }
  },

  props: {
    modelValue: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    isDisabled: { type: Boolean, default: false },
    isAutofocus: { type: Boolean, default: false },
  },

  provide () {
    return { 'pickerContext': this }
  },

  data () {
    return {
      curOptIdx: -1,
      opts: [],
    }
  },

  computed: {
    curOpt () { return this.opts[this.curOptIdx] },
    curOptVal () { return (this.curOpt || {}).value },
    ph () { return !this.modelValue && this.placeholder },
    openerTxt () { return this.ph || (this.curOpt || {}).optTxt },
    openerHtml () { return this.ph || (this.curOpt || {}).optHtml },
  },

  watch: {
    modelValue (nV, oV) { (nV !== oV) && this.selectByValue(this.modelValue) },
  },

  mounted () {
    this.registerKeyboardActions({
      toggleDropdown: () => this.dropdown.toggle(),
      hideDropdown: () => this.dropdown.hide(),
      selectFirst: () => this.selectFirst(),
      selectLast: () => this.selectLast(),
      selectPrev: () => this.selectPrev(),
      selectNext: () => this.selectNext(),
    })

    this.dropdown.onShow(() => {
      if (this.curOpt) this.$nextTick(() => this.curOpt.$el.focus())
      else this.$refs.opener.blur()
      this.$emit('open')
    })
    this.dropdown.onHide(isOuterClick => {
      if (!isOuterClick) this.$refs.opener.focus()
      this.emitCurOptVal()
      this.$emit('close', isOuterClick)
    })

    if (this.isAutofocus) { this.$refs.opener.focus() }
    if (this.modelValue) { this.selectByValue(this.modelValue) }
  },

  methods: {
    selectByIdx (idx) {
      if (this.curOpt) this.curOpt.isSelected = false

      this.curOptIdx = idx

      if (this.curOpt) {
        this.curOpt.$el.focus()
        this.curOpt.isSelected = true
      }

      if (this.dropdown.isShown.value) return
      this.emitCurOptVal(this.curOpt ? this.curOpt.value : this.modelValue)
    },

    selectByValue (value = '') {
      const idx = this.opts.findIndex(el => el.value === value)
      if (this.curOptIdx === idx) return

      const opt = this.opts[idx]
      if (!opt) return this.selectByIdx(-1)
      this.selectByIdx(idx)
    },

    selectNext (offset = 1, startIdx = this.curOptIdx) {
      const nextIdx = startIdx + offset
      const nextOpt = this.opts[nextIdx]
      if (!nextOpt) return
      if (nextOpt.isDisabled) return this.selectNext(offset, nextIdx)
      this.selectByIdx(nextIdx)
    },

    selectPrev () {
      if (this.curOptIdx < 0) return this.selectLast()
      this.selectNext(-1)
    },

    selectFirst () {
      this.selectNext(1, -1)
    },

    selectLast () {
      this.selectNext(-1, this.opts.length)
    },

    emitCurOptVal (val = this.curOptVal) {
      if (typeof val !== 'string') return
      this.$emit('update:modelValue', val)
    },

    regOpt (opt) {
      this.opts.push(opt)
    },
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
