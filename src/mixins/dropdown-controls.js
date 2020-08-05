import { onOuterClick } from '../helpers/outer-click'

export default {
  data () {
    return {
      isDropdownShown: false,
      unlistenOuterClick: () => { },
      onDdShowSubs: [],
      onDdHideSubs: [],
    }
  },

  beforeDestroy () {
    this.unlistenOuterClick()
  },

  methods: {
    toggleDropdown () {
      if (this.isDropdownShown) {
        this.hideDropdown()
        this.$refs.opener.focus()
      } else {
        this.showDropdown()
        this.$refs.opener.blur()
      }
    },

    showDropdown () {
      this.listenOuterClick()
      this.isDropdownShown = true
      this.onDdShowSubs.forEach(cb => cb())
      this.$refs.opener.blur()
    },

    hideDropdown (willFocus = true) {
      this.unlistenOuterClick()
      this.isDropdownShown = false
      this.onDdHideSubs.forEach(cb => cb())
      if (willFocus) this.$refs.opener.focus()
    },

    hideDropdownNoFocus() {
      this.hideDropdown(false)
    },

    listenOuterClick () {
      this.unlistenOuterClick = onOuterClick(this.$el, this.hideDropdownNoFocus)
    },

    onDropdownShow (cb) {
      this.onDdShowSubs.push(cb)
      return () => {
        this.onDdShowSubs = this.onDdShowSubs.filter(el => el !== cb)
      }
    },

    onDropdownHide (cb) {
      this.onDdHideSubs.push(cb)
      return () => {
        this.onDdHideSubs = this.onDdHideSubs.filter(el => el !== cb)
      }
    },
  },
}
