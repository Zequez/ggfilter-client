export function escapeHtml (unsafe) {
  return unsafe.toString()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export function parseQuery (search) {
  let args = search.substring(1).split('&')
  let argsParsed = {}
  let i, arg, kvp, key, value
  for (i = 0; i < args.length; i++) {
    arg = args[i]
    if (arg.indexOf('=') === -1) {
      argsParsed[decodeURIComponent(arg).trim()] = true
    } else {
      kvp = arg.split('=')
      key = decodeURIComponent(kvp[0]).trim()
      value = decodeURIComponent(kvp[1]).trim()
      argsParsed[key] = value
    }
  }
  return argsParsed
}

export function camelizeKeys (obj) {
  if (obj instanceof Array) {
    let camelizedArr = []
    for (let i = 0; i < obj.length; ++i) {
      camelizedArr.push(camelizeKeys(obj[i]))
    }
    return camelizedArr
  } else {
    let camelizedObj = {}
    for (let k in obj) {
      camelizedObj[camelCase(k)] = obj[k]
    }
    return camelizedObj
  }
}

export function camelCase (snakeCase) {
  return snakeCase.replace(/([_-]\w)/g, (m) => m[1].toUpperCase())
}

export function snakeizeKeys (obj, recursive = true) {
  let snakeizedObj = {}
  for (let k in obj) {
    let key = snakeCase(k)
    let val = obj[k]
    if (recursive) {
      if (obj[k] instanceof Object && !(val instanceof Array)) {
        val = snakeizeKeys(val, recursive)
      }
    }
    snakeizedObj[key] = val
  }
  return snakeizedObj
}

export function snakeCase (camelCase) {
  return camelCase.replace(/[A-Z]+/g, (m) => '_' + m.toLowerCase())
}

export function capitalizeFirstLetter (text) {
  return text.charAt(0).toUpperCase() + text.slice(1)
}
