import { onOuterClick } from '../helpers/outer-click'

export default {
  data () {
    return {
      isDropdownShown: false,
      unlistenOutsideClick: () => { },
      onDdShowSubs: [],
      onDdHideSubs: [],
    }
  },

  beforeDestroy () {
    this.unlistenOutsideClick()
  },

  methods: {
    toggleDropdown () {
      if (this.isDropdownShown) {
        this.hideDropdown()
      } else {
        this.showDropdown()
      }
    },

    showDropdown () {
      this.listenOutsideClick()
      this.isDropdownShown = true
      this.onDdShowSubs.forEach(cb => cb())
    },

    hideDropdown () {
      this.unlistenOutsideClick()
      this.isDropdownShown = false
      this.onDdHideSubs.forEach(cb => cb())
    },

    listenOutsideClick () {
      this.unlistenOutsideClick = onOuterClick(this.$el, this.hideDropdown)
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
