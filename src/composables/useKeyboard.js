/**
 * @callback ListenUnlistenCallback
 * @param {HTMLElement} element
 */

/**
 * @typedef {object} KeyboardHookResult
 * @property {ListenUnlistenCallback} listenOn
 * @property {ListenUnlistenCallback} unlistenOn
 */

/**
 * @param {import('./useDropdown').DropdownHookResult} dropdown
 * @param {import('./useOptions').OptionsHookResult} options
 * @returns {KeyboardHookResult}
 */
export default function useKeyboard (dropdown, options) {
  const listener = (event) => { _onKeyDown(dropdown, options, event) }

  /** @type {ListenUnlistenCallback} */
  const listenOn = (htmlEl) => {
    htmlEl.addEventListener('keydown', listener)
  }

  /** @type {ListenUnlistenCallback} */
  const unlistenOn = (htmlEl) => {
    htmlEl.removeEventListener('keydown', listener)
  }

  return { listenOn, unlistenOn }
}

/**
 * @param {import('./useDropdown').DropdownHookResult} dropdown
 * @param {import('./useOptions').OptionsHookResult} options
 * @param {KeyboardEvent} event
 */
function _onKeyDown (dropdown, options, event) {
  switch (event.key) {
    case 'Esc':
    case 'Escape':
    case 'Tab':
    case 'Enter':
      event.preventDefault()
      event.stopPropagation()
      dropdown.hide()
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
