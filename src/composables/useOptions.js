import { inject, nextTick, onBeforeUnmount, onMounted, onUpdated, provide, ref } from 'vue'

export function useOptions (optsContRef) {
  const current = ref(null)
  const _options = {}

  let _nodes = []
  let _nodesUpdateRequired = false
  let _currentIdx = -1

  let _onSelectSubs = []
  function onSelect (cb) {
    _onSelectSubs.push(cb)
    return () => {
      _onSelectSubs = _onSelectSubs.filter(el => el !== cb)
    }
  }

  const selectByValue = (value = '') => {
    const opt = _options[value]
    if (opt === current.value) return

    if (current.value) current.value.setIsSelected(false)

    if (!opt) {
      selectNone()
      return
    }

    opt.setIsSelected(true)
    current.value = opt
    _currentIdx = _getNodeIdx(opt.value)
    _onSelectSubs.forEach(cb => cb(opt.value))
  }

  const selectNone = () => {
    current.value = null
    _currentIdx = -1
    _onSelectSubs.forEach(cb => cb(null))
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
  onBeforeUnmount(() => { _onSelectSubs = [] })

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
    onSelect,
    selectByValue,
    selectNone,
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
