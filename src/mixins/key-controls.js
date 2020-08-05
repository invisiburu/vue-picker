export default {
  data () {
    return {
      ddKeySubs: [],
    }
  },

  created () {
    this.subscribeDropdown()
  },

  beforeDestroy () {
    this.unlistenKeys()
    this.unsubscribeDropdown()
  },

  methods: {
    subscribeDropdown () {
      this.ddKeySubs.push(
        this.onDropdownShow(this.listenKeys),
        this.onDropdownHide(this.unlistenKeys),
      )
    },

    unsubscribeDropdown () {
      this.ddKeySubs.forEach(unsub => unsub())
    },

    listenKeys () {
      document.addEventListener('keydown', this.listenKeyDown)
    },

    unlistenKeys () {
      document.removeEventListener('keydown', this.listenKeyDown)
    },

    listenKeyDown (event) {
      switch (event.key) {
        case 'Esc':
        case 'Escape':
        case 'Tab':
        case 'Enter':
          event.preventDefault()
          event.stopPropagation()
          return this.hideDropdown()

        case 'Up':
        case 'ArrowUp':
          event.preventDefault()
          event.stopPropagation()
          if (event.altKey)
            return this.toggleDropdown()
          return this.selectPrev()

        case 'Down':
        case 'ArrowDown':
          event.preventDefault()
          event.stopPropagation()
          if (event.altKey)
            return this.toggleDropdown()
          return this.selectNext()

        default: break
      }
    },
  },
}
