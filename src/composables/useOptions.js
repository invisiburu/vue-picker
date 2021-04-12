import { ref } from 'vue'

export default function useOptions (onSelect = () => { }) {
  const _options = []
  const current = ref(null)
  let _currentIdx = -1

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
    onSelect(option && option.value)
  }

  const registerOption = (opt) => { _options.push(opt) }

  return {
    current,
    registerOption,
    selectByValue,
    selectNext,
    selectPrev,
    selectFirst,
    selectLast,
  }
}
