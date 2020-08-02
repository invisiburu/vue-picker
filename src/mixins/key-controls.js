export default {
  data () {
    return {
      dropdownListeners: [],
    }
  },

  created () {
    const isDropdownControlsPresent = typeof this.toggleDropdown === 'function'
    if (isDropdownControlsPresent) {
      this.listenDropdown()
    } else {
      console.warn('key-controls requires dropdown controls to be present')
    }
  },

  beforeDestroy () {
    this.unListenKeys()
    this.unListenDropdown()
  },

  methods: {
    listenDropdown () {
      this.dropdownListeners.push(
        this.listenDropdownShow(this.listenKeys),
        this.listenDropdownHide(this.unListenKeys),
      )
    },

    unListenDropdown () {
      this.dropdownListeners.forEach(unlisten => unlisten())
    },

    listenKeys () {
      document.addEventListener('keydown', this.listenKeyDown)
    },

    unListenKeys () {
      document.removeEventListener('keydown', this.listenKeyDown)
    },

    listenKeyDown (event) {
      // TODO: more key events

      switch (event.key) {
        case 'Esc':
        case 'Escape': return this.hideDropdown()
        default: break
      }
    },
  },
}
