export function onOuterClick (el, cb) {
  const handler = (e) => {
    if (!el.contains(e.target)) cb()
  }

  document.addEventListener('click', handler, false)
  return () => document.removeEventListener('click', handler, false)
}
