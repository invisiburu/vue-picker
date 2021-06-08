import { inject, nextTick, onMounted, onUpdated, provide, ref } from 'vue'

export function useOptions (optsContRef) {
  const current = ref(null)
  const _options = {}

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
      _currentIdx = -1
      _onSelect(null)
      return
    }

    opt.setIsSelected(true)
    current.value = opt
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

  provide('registerOption', (opt) => {
    _nodesUpdateRequired = true
    _options[opt.value] = _options[opt.value] || opt
    return () => {
      _nodesUpdateRequired = true
      delete _options[opt.value]
    }
  })
  provide('selectByValue', selectByValue)

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
    onSelect: (cb = () => { }) => { _onSelect = cb },
    selectByValue,
    selectNext,
    selectPrev,
    selectFirst,
    selectLast,
  }
}

export function useOptionsAsChild () {
  return {
    registerOption: inject('registerOption', (opt) => () => { opt }),
    selectByValue: inject('selectByValue', (val) => { val })
  }
}
