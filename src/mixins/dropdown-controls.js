import { onOuterClick } from '../helpers/outer-click'

export default {
  data () {
    return {
      isDropdownShown: false,
      unlistenOuterClick: () => { },
      onDdShowSubs: [],
      onDdHideSubs: [],
      unsubs: [],
    }
  },

  beforeDestroy () {
    this.unlistenOuterClick()
    this.unsubs.forEach(unsub => unsub())
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
      this.listenOuterClick()
      this.isDropdownShown = true
      this.onDdShowSubs.forEach(cb => cb())
    },

    hideDropdown (isOuterClick = false) {
      this.unlistenOuterClick()
      this.isDropdownShown = false
      this.onDdHideSubs.forEach(cb => cb(isOuterClick))
    },

    hideDropdownOuter() {
      this.hideDropdown(true)
    },

    listenOuterClick () {
      this.unlistenOuterClick = onOuterClick(this.$el, this.hideDropdownOuter)
    },

    onDropdownShow (cb) {
      this.onDdShowSubs.push(cb)
      this.unsubs.push(() => {
        this.onDdShowSubs = this.onDdShowSubs.filter(el => el !== cb)
      })
    },

    onDropdownHide (cb) {
      this.onDdHideSubs.push(cb)
      this.unsubs.push(() => {
        this.onDdHideSubs = this.onDdHideSubs.filter(el => el !== cb)
      })
    },
  },
}
