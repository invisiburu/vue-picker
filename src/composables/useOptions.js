import { nextTick, onMounted, onUpdated, ref } from 'vue'

/**
 * @typedef {object} VuePickerOption
 * @property {string} value
 * @property {boolean} isDisabled
 * @property {Function} setIsSelected
 * @property {Function} focus
 * @property {import('vue').ComputedRef<string>} optTxt
 * @property {import('vue').ComputedRef<string>} optHtml
 */

/**
 * @callback OnSelectFunc
 * @param {OnSelectCallback} cb
 */

/**
 * @callback SelectByValueFunc
 * @param {string} value
 */

/**
 * @callback OnSelectCallback
 * @param {string} value
 */

/**
 * @callback RegisterOptionFunc
 * @param {VuePickerOption} option
 * @returns {Function}
 */

/**
 * @typedef {object} OptionsHookResult
 * @property {import('vue').Ref<VuePickerOption>} current
 * @property {import('vue').Ref<string>} currentValue
 * @property {OnSelectFunc} onSelect
 * @property {RegisterOptionFunc} registerOption
 * @property {SelectByValueFunc} selectByValue
 * @property {Function} selectNext
 * @property {Function} selectPrev
 * @property {Function} selectFirst
 * @property {Function} selectLast
 */

/**
 * @param {import('vue').Ref<HTMLElement>} optsContRef
 * @returns {OptionsHookResult}
 */
export default function useOptions (optsContRef) {
  /** @type {import('vue').Ref<VuePickerOption>} */
  const current = ref(null)
  /** @type {import('vue').Ref<string} */
  const currentValue = ref(null)
  /** @type {Object<string,VuePickerOption>} */
  const _options = {}
  /** @type {NodeListOf<HTMLButtonElement>} */
  let _nodes = []
  let _nodesUpdateRequired = false
  let _currentIdx = -1
  let _onSelect = () => { }

  const selectByValue = (value = '') => {
    const opt = _options[value]
    if (opt === current.value) return

    if (current.value) current.value.setIsSelected(false)

    if (!opt) {
      current.value = null
      currentValue.value = null
      _currentIdx = -1
      _onSelect(null)
      return
    }

    opt.setIsSelected(true)
    current.value = opt
    currentValue.value = opt.value
    _currentIdx = _getNodeIdx(opt.value)
    _onSelect(opt.value)
  }

  const selectNext = (offset = 1, startIdx = _currentIdx) => {
    const nextIdx = startIdx + offset
    const nextNode = _nodes[startIdx + offset]
    if (!nextNode) return

    if (nextNode.disabled) return selectNext(offset, nextIdx)

    const nextVal = nextNode.dataset.value
    selectByValue(nextVal, true)
    current.value.focus()
  }

  const selectPrev = () => _currentIdx < 0 ? selectLast() : selectNext(-1)
  const selectFirst = () => selectNext(1, -1)
  const selectLast = () => selectNext(-1, _nodes.length)

  const registerOption = (opt) => {
    _nodesUpdateRequired = true
    _options[opt.value] = _options[opt.value] || opt
    return () => {
      _nodesUpdateRequired = true
      delete _options[opt.value]
    }
  }

  onMounted(() => _updateNodes())
  onUpdated(() => nextTick(_updateNodes))

  const _getNodeIdx = (value) => {
    for (let idx = 0; idx < _nodes.length; idx++) {
      const node = _nodes[idx]
      if (node.dataset.value === value) return idx
    }
    return -1
  }

  const _updateNodes = () => {
    if (!_nodesUpdateRequired) return
    _nodesUpdateRequired = false
    _nodes = optsContRef.value.querySelectorAll('.vue-picker-option')
    if (current.value) _currentIdx = _getNodeIdx(current.value)
  }

  return {
    current,
    currentValue,
    onSelect: (cb = () => { }) => { _onSelect = cb },
    registerOption,
    selectByValue,
    selectNext,
    selectPrev,
    selectFirst,
    selectLast,
    _getOpts: () => _options
  }
}
