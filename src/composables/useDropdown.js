import { ref, onUnmounted } from 'vue'
import { onOuterClick } from '../helpers/outer-click'

export default function useDropdown () {
  const dropdown = new Dropdown()

  onUnmounted(() => dropdown.destroy())

  return dropdown
}

class Dropdown {
  constructor () {
    this.isShown = ref(false)
    this.outClickTarget = ref()
    this._unlistenOuterClick = () => { }
    this._onShowSubs = []
    this._onHideSubs = []
    this._unsubs = []
  }

  destroy () {
    console.log('DESTROYED')
    this._unlistenOuterClick()
    this._unsubs.forEach(unsub => unsub())
  }

  toggle () {
    if (this.isShown.value) {
      this.hide()
    } else {
      this.show()
    }
  }

  show () {
    console.log('SHOW')
    this._listenOuterClick()
    this.isShown.value = true
    this._onShowSubs.forEach(cb => cb())
  }

  hide (isOuterClick = false) {
    console.log('HIDE')
    this._unlistenOuterClick()
    this.isShown.value = false
    this._onHideSubs.forEach(cb => cb(isOuterClick))
  }

  onShow (cb) {
    this._onShowSubs.push(cb)
    this._unsubs.push(() => {
      this._onShowSubs = this._onShowSubs.filter(el => el !== cb)
    })
  }

  onHide (cb) {
    this._onHideSubs.push(cb)
    this._unsubs.push(() => {
      this._onHideSubs = this._onHideSubs.filter(el => el !== cb)
    })
  }

  _listenOuterClick () {
    const listener = () => this.hide(true)
    this._unlistenOuterClick = onOuterClick(this.outClickTarget.value, listener)
  }
}
