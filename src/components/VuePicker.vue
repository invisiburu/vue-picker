<template>
  <div
    class="vue-picker"
    :class="{
      'vue-picker--open': isDropdownShown,
      'vue-picker--disabled': isDisabled,
      'vue-picker--has-val': openerTxt,
    }"
  >
    <button
      class="vue-picker__opener"
      type="button"
      ref="opener"
      @click="toggleDropdown()"
      :disabled="isDisabled"
    >
      <slot
        name="opener"
        :opener="{ value, openerTxt }"
      >
        {{ openerTxt || placeholder }}
      </slot>

      <slot name="openerIco">
        <i class="vue-picker__opener-ico" />
      </slot>
    </button>

    <div
      class="vue-picker__dropdown"
      v-show="isDropdownShown"
    >
      <slot name="dropdownInner">
        <slot />
      </slot>
    </div>

  </div>
</template>

<script>
import dropdownControls from '../mixins/dropdown-controls'
import keyControls from '../mixins/key-controls'
import { attrs } from '../mixins/attrs'

const attrsMixin = attrs('disabled', 'autofocus')

export default {
  name: 'VuePicker',

  mixins: [attrsMixin, dropdownControls, keyControls],

  props: {
    value: { type: String, default: '' },
    placeholder: { type: String, default: '' },
  },

  provide () {
    return { 'pickerContext': this }
  },

  data () {
    return {
      openerTxt: '',
    }
  },

  mounted () {
    if (this.isAutofocus) { this.$refs.opener.focus() }
  },

  methods: {
    selectOption (value = '', label = '') {
      this.openerTxt = this.placeholder
        ? value ? label : ''
        : label || value || ''
      if (this.value !== value) this.$emit('input', value)
      if (this.isDropdownShown) this.hideDropdown()
    },
  },
}
</script>

<style lang="scss" scoped>
.vue-picker {
  --col: black;
  --col-dd-bg: white;
  --col-disabled: lightgray;
  --col-placeholder: lightgray;
  --col-border: gray;

  display: inline-block;
  position: relative;

  &--disabled {
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

  .vue-picker:not(.vue-picker--has-val) > & {
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
  display: grid;
  grid: auto-flow auto / auto;
  gap: 8px;

  &:after {
    // fix bot padding render on scroll
    content: '';
    height: 1px;
    margin-top: -1px;
  }
}
</style>
