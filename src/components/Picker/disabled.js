export default {
  props: {
    disabled: { type: [String, Boolean], default: false }
  },

  computed: {
    isDisabled () {
      return typeof this.autofocus === 'string'
        ? this.disabled.trim().test(/^(true|autofocus)?$/i)
        : this.disabled
    }
  },
}
