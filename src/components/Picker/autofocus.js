export function createAutofocusMixin ({
  selector = '', // selector of a child to select
  refName = '', // ref of a child to select
  isAutoSelect = true, // should select the content after focus
} = {}) {
  let autofocusElComputed = function () { return this.$el }
  if (selector) {
    autofocusElComputed = function () {
      let el = this.$el.querySelector(selector)
      if (el) return el
      return undefined
    }
  }
  if (refName) {
    autofocusElComputed = function () {
      let ref = this.$refs[refName]
      if (!ref) return undefined
      if (Array.isArray(ref)) return this.ref[0]
      return ref
    }
  }

  let mountedHook = isAutoSelect
    ? function () {
      if (!this.isAutofocus || !this.autofocusEl) return
      this.autofocusEl.focus()
      this.autofocusEl.select()
    }
    : function () {
      if (!this.isAutofocus || !this.autofocusEl) return
      this.autofocusEl.focus()
    }

  return {
    props: {
      autofocus: { type: [Boolean, String], default: false },
    },

    computed: {
      isAutofocus () {
        if (typeof this.autofocus === 'string') {
          return ['', 'true', 'autofocus'].includes(this.autofocus.trim())
        }
        return this.autofocus
      },
      autofocusEl: autofocusElComputed,
    },

    mounted: mountedHook,
  }
}
