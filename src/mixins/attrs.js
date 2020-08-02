const upperFirst = (str) => str.replace(/^./, v => v.toUpperCase())

export function attrs (...attrs) {
  const props = {}
  const computed = {}

  attrs.forEach(name => {
    props[name] = { type: [String, Boolean], default: false }
    computed[`is${upperFirst(name)}`] = function () {
      const val = this[name]
      const re = new RegExp(`^(true|${name})?$`, 'i')
      return typeof val === 'string' ? re.test(val.trim()) : val
    }
  })

  return {
    props,
    computed,
  }
}
