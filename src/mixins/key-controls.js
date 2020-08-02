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
        case 'Escape': return this.hideDropdown()
        default: break
      }
    },
  },
}
