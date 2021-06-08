export function useKeyboard (dropdown, options) {
  const listener = (event) => { _onKeyDown(dropdown, options, event) }

  const listenOn = (htmlEl) => {
    htmlEl.addEventListener('keydown', listener)
  }

  const unlistenOn = (htmlEl) => {
    htmlEl.removeEventListener('keydown', listener)
  }

  return { listenOn, unlistenOn }
}

function _onKeyDown (dropdown, options, event) {
  switch (event.key) {
    case 'Esc':
    case 'Escape':
    case 'Tab':
      if (!dropdown.isShown.value) break
      event.preventDefault()
      event.stopPropagation()
      dropdown.hide()
      break

    case 'Enter':
      event.preventDefault()
      event.stopPropagation()
      dropdown.toggle()
      break

    case 'Up':
    case 'ArrowUp':
      event.preventDefault()
      event.stopPropagation()
      if (event.altKey) {
        dropdown.toggle()
      } else {
        options.selectPrev()
      }
      break

    case 'Down':
    case 'ArrowDown':
      event.preventDefault()
      event.stopPropagation()
      if (event.altKey) {
        dropdown.toggle()
      } else {
        options.selectNext()
      }
      break

    case 'Home':
      event.preventDefault()
      event.stopPropagation()
      options.selectFirst()
      break

    case 'End':
      event.preventDefault()
      event.stopPropagation()
      options.selectLast()
      break

    default: break
  }
}
