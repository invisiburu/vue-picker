import { onBeforeUnmount } from 'vue'

/**
 * @typedef {object} KeyboardActions
 * @property {Function} actions.toggleDropdown
 * @property {Function} actions.hideDropdown
 * @property {Function} actions.selectFirst
 * @property {Function} actions.selectLast
 * @property {Function} actions.selectPrev
 * @property {Function} actions.selectNext
 */

export default function useKeyboardListener () {
  const kbActions = {}

  /** @param {KeyboardActions} actions */
  const registerActions = (actions) => { Object.assign(kbActions, actions) }

  const onKeyDown = onKeyDownHandler.bind(null, kbActions)
  const listen = () => { document.addEventListener('keydown', onKeyDown) }
  const unlisten = () => { document.removeEventListener('keydown', onKeyDown) }

  onBeforeUnmount(unlisten)

  return { listen, unlisten, registerActions }
}

/**
 * @param {KeyboardActions} actions
 * @param {KeyboardEvent} event
 */
function onKeyDownHandler (actions, event) {
  switch (event.key) {
    case 'Esc':
    case 'Escape':
    case 'Tab':
    case 'Enter':
      event.preventDefault()
      event.stopPropagation()
      actions.hideDropdown()
      break

    case 'Up':
    case 'ArrowUp':
      event.preventDefault()
      event.stopPropagation()
      if (event.altKey) {
        actions.toggleDropdown()
      } else {
        actions.selectPrev()
      }
      break

    case 'Down':
    case 'ArrowDown':
      event.preventDefault()
      event.stopPropagation()
      if (event.altKey) {
        actions.toggleDropdown()
      } else {
        actions.selectNext()
      }
      break

    case 'Home':
      event.preventDefault()
      event.stopPropagation()
      actions.selectFirst()
      break

    case 'End':
      event.preventDefault()
      event.stopPropagation()
      actions.selectLast()
      break

    default: break
  }
}
