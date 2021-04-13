import { ref, onUnmounted } from 'vue'

/**
 * @callback HideFunc
 * @param {boolean} [isOuterClick]
 */

/**
 * @callback OnShowFunc
 * @param {Function} cb
 */

/**
 * @callback OnHideFunc
 * @param {OnHideCallback} cb
 */

/**
 * @callback OnHideCallback
 * @param {boolean} [isOuterClick]
 */

/**
 * @typedef {object} DropdownHookResult
 * @property {import('vue').Ref<boolean>} isShown
 * @property {import('vue').Ref<HTMLElement>} clickOutRef
 * @property {Function} toggle
 * @property {Function} show
 * @property {HideFunc} hide
 * @property {OnShowFunc} OnShowFunc
 * @property {OnHideFunc} onHide
 */

/**
 * @returns {DropdownHookResult}
 */
export default function useDropdown () {
  const isShown = ref(false)
  const clickOutRef = ref()

  let _unlistenOuterClick = () => { }
  let _onShowSubs = []
  let _onHideSubs = []
  const _unsubs = []

  const toggle = () => {
    isShown.value ? hide() : show()
  }

  const show = () => {
    console.log('SHOW')
    isShown.value = true
    _unlistenOuterClick = _onClickOut(clickOutRef.value, () => hide(true))
    _onShowSubs.forEach(cb => cb())
  }

  const hide = (isOuterClick = false) => {
    console.log('HIDE')
    isShown.value = false
    _unlistenOuterClick()
    _onHideSubs.forEach(cb => cb(isOuterClick))
  }

  const onShow = (cb) => {
    _onShowSubs.push(cb)
    _unsubs.push(() => {
      _onShowSubs = _onShowSubs.filter(el => el !== cb)
    })
  }

  const onHide = (cb) => {
    _onHideSubs.push(cb)
    _unsubs.push(() => {
      _onHideSubs = _onHideSubs.filter(el => el !== cb)
    })
  }

  onUnmounted(() => {
    _unlistenOuterClick()
    _unsubs.forEach(unsub => unsub())
  })

  return {
    isShown,
    clickOutRef,
    toggle,
    show,
    hide,
    onShow,
    onHide,
  }
}

function _onClickOut (el, cb) {
  const handler = (e) => {
    if (!el.contains(e.target)) cb()
  }

  document.addEventListener('click', handler, false)
  return () => { document.removeEventListener('click', handler, false) }
}

