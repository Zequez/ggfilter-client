export function elementOffsetTop (el) {
  let offset = 0
  while (el) {
    offset += el.offsetTop
    el = el.offsetParent
  }
  return offset
}

export function elementOffsetLeft (el) {
  let offset = 0
  while (el) {
    offset += el.offsetLeft
    el = el.offsetParent
  }
  return offset
}

export function isParentOf (element, possibleChild) {
  let el = possibleChild
  while (el.parentElement !== null) {
    if (el.parentElement === element) {
      return true
    }
    el = el.parentElement
  }
  return false
}

export function onClickOutsideOnce (target, cb) {
  if (document) {
    let doc = document.documentElement
    const binding = (ev) => {
      if (target !== ev.target && !isParentOf(target, ev.target)) {
        if (cb(ev) !== false) {
          doc.removeEventListener('click', binding)
        }
      }
    }

    doc.addEventListener('click', binding)
  }
}

export function bindGlobalKey (keyCodes, cb) {
  if (!Array.isArray(keyCodes)) keyCodes = [keyCodes]
  return bindGlobal('keydown', (ev) => {
    let key = ev.charCode || ev.keyCode
    if (keyCodes.indexOf(key) !== -1) {
      cb(key)
    }
  })
}

export function bindGlobalKeyOnce (keyCode, cb) {
  let unbind = bindGlobalKey(keyCode, (key) => {
    unbind()
    cb(key)
  })
  return unbind
}

export function bindGlobal (event, binding) {
  if (document) {
    const doc = document.documentElement
    doc.addEventListener(event, binding)
    return () => doc.removeEventListener(event, binding)
  }
}
