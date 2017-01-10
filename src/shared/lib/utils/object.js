export function merge (from, to) {
  let result = {}
  for (let n in from) {
    result[n] = from[n]
  }
  for (let n in to) {
    result[n] = to[n]
  }
  return result
}

export function isEmpty (obj) {
  for (let key in obj) {
    return false
  }
  return true
}

export function mapObject (obj, cb) {
  let results = []
  for (let key in obj) {
    results.push(cb(key, obj[key]))
  }
  return results
}

export function pairs (obj) {
  return mapObject(obj, (key, value) => [key, value])
}

export function removeObjectKey (key, object) {
  const newObject = {}
  Object.keys(object)
    .filter(k => k !== key)
    .forEach(k => { newObject[k] = object[k] })
  return newObject
}
