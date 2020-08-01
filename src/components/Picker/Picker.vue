<template>
  <div
    class="picker"
    :class="{
      'picker--open': isDropdownShown,
      'picker--disabled': isDisabled,
      'picker--has-val': openerTxt,
      'picker--has-err': hasError,
      'picker--has-lbl': hasLabel,
    }"
  >
    <div class="picker__opener-wrp">
      <label class="picker__label">
        <template v-if="label">
          {{ label }}
        </template>
      </label>

      <button
        class="picker__opener"
        type="button"
        @click="toggleDropdown()"
        :disabled="isDisabled"
      >
        <slot
          name="opener"
          :opener="{ value, openerTxt }"
        >
          {{ openerTxt || placeholder || '&nbsp;' }}
        </slot>

        <slot name="opener-ico">
          <i class="picker__opener-ico" />
        </slot>
      </button>

      <div
        class="picker__dropdown"
        v-show="isDropdownShown"
      >
        <div class="picker__dropdown-inner">
          <slot />
        </div>
      </div>
    </div>

    <template v-if="hasError">
      <p class="picker__err-mes">
        {{ errorMessage }}
      </p>
    </template>
  </div>
</template>

<script>
import dropdownControls from './dropdown-controls'
import keyControls from './key-controls'
import disabledMixin from './disabled'
import { createAutofocusMixin } from './autofocus'

const autofocus = createAutofocusMixin({
  selector: '.picker__opener',
  isAutoSelect: false,
})

// TODO: search feature
// TODO: label slot
// TODO: error slot
// TODO: readonly attr?
// TODO: dropdown auto-position
// TODO: outside click should work on the other picker click

export default {
  name: 'picker',

  mixins: [autofocus, disabledMixin, dropdownControls, keyControls],

  props: {
    value: { type: String, default: undefined },
    errorMessage: { type: String, default: undefined },
    label: { type: String, default: undefined },
    placeholder: { type: String, default: undefined },
  },

  provide () {
    return { 'pickerContext': this }
  },

  data () {
    return {
      openerTxt: '',
    }
  },

  computed: {
    hasError () { return Boolean(this.errorMessage) },
    hasLabel () { return Boolean(this.label) },
  },

  methods: {
    selectOption (value = '', label = '') {
      this.openerTxt = label || value || ''
      if (this.value !== value) this.$emit('input', value)
      if (this.isDropdownShown) this.hideDropdown()
    },

    hasSlot (name) { return Boolean(this.$slots[name]) },
  },
}
</script>

<style lang="scss" scoped>
.picker {
  /* stylelint-disable length-zero-no-unit */
  --opener-bottom-border: 1px solid lightgray;
  --opener-padding: 10px;
  --opener-height: auto;
  --opener-arrow-margin: 0 14px;
  --option-side-padding: 24px;
  --dropdown-offset: 0px;
  --dropdown-width: 100%;
  --dropdown-side-adjustment: var(--option-side-padding);
  --dropdown-max-height: 300px;

  width: 100%;
  display: grid;

  &--has-err {
    --opener-bottom-border: 0.2rem solid tomato;
  }
}

.picker__label {
  pointer-events: none;
  position: absolute;
  top: 10px;
  left: 0;
  transition: all 180ms;
  color: lightgray;
  font-size: 16px;

  &--minimized {
    top: 0;
    color: gray;
    font-size: 10px;
  }
}

.picker__opener {
  background: none;
  border: 1px solid lightgray;
  display: grid;
  grid: '. ico' / 1fr auto;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
  width: inherit;
  height: var(--opener-height);
  text-align: start;
  color: #0e0e0e;
  padding: var(--opener-padding);
  font-weight: 500;
  border-bottom: var(--opener-bottom-border);

  &--placeholder {
    color: lightgray;
  }

  &:disabled {
    filter: grayscale(100%);
    cursor: not-allowed;
  }
}

.picker__opener-wrp {
  width: inherit;
  height: inherit;
  position: relative;
}

.picker__dropdown {
  padding: 12px 0;
  display: grid;
  grid: auto-flow auto / 1fr;
  background: white;
  position: absolute;
  width: 100%;
  z-index: 1;
}

.picker__dropdown-inner {
  max-height: var(--dropdown-max-height);
  overflow-y: auto;
}

.picker__opener-ico {
  grid-area: ico;
  user-select: none;
  pointer-events: none;

  &:after {
    content: '';
    display: block;
    width: 0.5em;
    height: 0.5em;
    border: solid gray;
    border-width: 0 2px 2px 0;
    transform: translate(0, -25%) rotate(45deg);
  }
}

.picker__err-mes {
  color: tomato;
  margin-top: 10px;
}
</style>
