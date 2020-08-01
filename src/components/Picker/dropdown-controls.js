import { handleClickOutside } from './outer-click'

export default {
  data () {
    return {
      isDropdownShown: false,
      unListenOutsideClick: () => { },
      onDropdownShowListeners: [],
      onDropdownHideListeners: [],
    }
  },

  beforeDestroy () {
    this.unListenOutsideClick()
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
      this.onDropdownShowListeners.forEach(cb => cb())
    },

    hideDropdown () {
      this.isDropdownShown = false
      this.onDropdownHideListeners.forEach(cb => cb())
    },

    listenOutsideClick () {
      const selector = `.${this.$el.classList[0]}`
      const destructor = handleClickOutside(selector, this.hideDropdown)
      this.unListenOutsideClick = destructor
    },

    listenDropdownShow (callback) {
      this.onDropdownShowListeners.push(callback)

      const unListen = () => {
        this.onDropdownShowListeners =
          this.onDropdownShowListeners.filter(el => el !== callback)
      }

      return unListen
    },

    listenDropdownHide (callback) {
      this.onDropdownHideListeners.push(callback)

      const unListen = () => {
        this.onDropdownHideListeners =
          this.onDropdownHideListeners.filter(el => el !== callback)
      }

      return unListen
    },
  },
}
