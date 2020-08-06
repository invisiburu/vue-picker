export default {
  data () {
    return {
      ddKeySubs: [],
    }
  },

  created () {
    this.onDropdownShow(this.listenKeys)
    this.onDropdownHide(this.unlistenKeys)
  },

  beforeDestroy () {
    this.unlistenKeys()
  },

  methods: {
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

        case 'Home':
          event.preventDefault()
          event.stopPropagation()
          return this.selectFirst()

        case 'End':
          event.preventDefault()
          event.stopPropagation()
          return this.selectLast()

        default: break
      }
    },
  },
}
