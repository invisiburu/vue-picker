import { ref, onUnmounted, provide, inject } from 'vue'

export function useDropdown () {
  const isShown = ref(false)

  let _unlistenOuterClick = () => { }
  let _onShowSubs = []
  let _onHideSubs = []

  let _clickOutTarget
  const useClickOutTarget = (el) => {
    _clickOutTarget = el
  }

  const toggle = () => {
    isShown.value ? hide() : show()
  }

  const show = () => {
    isShown.value = true
    _unlistenOuterClick = _onClickOut(_clickOutTarget, () => hide(true))
    _onShowSubs.forEach(cb => cb())
  }

  const hide = (isOuterClick = false) => {
    isShown.value = false
    _unlistenOuterClick()
    _onHideSubs.forEach(cb => cb(isOuterClick))
  }

  const onShow = (cb) => {
    _onShowSubs.push(cb)
    return () => {
      _onShowSubs = _onShowSubs.filter(el => el !== cb)
    }
  }

  const onHide = (cb) => {
    _onHideSubs.push(cb)
    return () => {
      _onHideSubs = _onHideSubs.filter(el => el !== cb)
    }
  }

  provide('dropdownHide', () => hide())

  onUnmounted(() => {
    _unlistenOuterClick()
    _onShowSubs = []
    _onHideSubs = []
  })

  return {
    isShown,
    toggle,
    show,
    hide,
    onShow,
    onHide,
    useClickOutTarget,
  }
}

function _onClickOut (el, cb) {
  const handler = (e) => {
    if (!el.contains(e.target)) cb()
  }

  document.addEventListener('click', handler, false)
  return () => { document.removeEventListener('click', handler, false) }
}

export function useDropdownAsChild () {
  return {
    hide: inject('dropdownHide', () => { }),
  }
}
