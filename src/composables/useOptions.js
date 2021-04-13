import { ref } from 'vue'

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
 * @returns {OptionsHookResult}
 */
export default function useOptions () {
  /** @type {import('vue').Ref<VuePickerOption>} */
  const current = ref(null)
  /** @type {import('vue').Ref<string} */
  const currentValue = ref(null)
  /** @type {VuePickerOption[]} */
  const _options = []
  let _currentIdx = -1
  let _onSelect = () => { }

  const selectByValue = (value = '') => {
    const idx = _options.findIndex(el => el.value === value)
    if (_currentIdx === idx) return

    const opt = _options[idx]
    if (!opt) return _selectByIdx(-1)
    _selectByIdx(idx)
  }

  const selectNext = (offset = 1, startIdx = _currentIdx) => {
    const nextIdx = startIdx + offset
    const nextOpt = _options[nextIdx]
    console.log('NEXT')
    if (!nextOpt) return
    if (nextOpt.isDisabled) return selectNext(offset, nextIdx)
    _selectByIdx(nextIdx)
  }

  const selectPrev = () => {
    console.log('PREV')
    if (_currentIdx < 0) return selectLast()
    selectNext(-1)
  }

  const selectFirst = () => {
    console.log('FIRST')
    selectNext(1, -1)
  }

  const selectLast = () => {
    console.log('LAST')
    selectNext(-1, _options.length)
  }

  const _selectByIdx = (idx) => {
    if (current.value) current.value.setIsSelected(false)

    _currentIdx = idx
    const option = _options[idx]

    if (option) {
      option.focus()
      option.setIsSelected(true)
    }

    current.value = option
    currentValue.value = option && option.value
    _onSelect(option && option.value)
  }

  const registerOption = (opt) => { _options.push(opt) }
  const onSelect = (cb = () => { }) => { _onSelect = cb }

  return {
    current,
    currentValue,
    onSelect,
    registerOption,
    selectByValue,
    selectNext,
    selectPrev,
    selectFirst,
    selectLast,
  }
}
