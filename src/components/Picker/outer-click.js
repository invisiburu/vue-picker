export function handleClickOutside (selector, callback) {
  // TODO: find by dom node, not by selector. Or create a directive.

  function handler (event) {
    if (!event.target.closest(selector)) {
      callback()
      destructor()
    }
  }

  function destructor () {
    document.removeEventListener('click', handler, false)
  }

  document.addEventListener('click', handler, false)
  return destructor
}
