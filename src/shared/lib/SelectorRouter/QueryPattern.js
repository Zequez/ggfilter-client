function readPatternKey (str) {
  let m = str.match(/(\()?:([\w]+)(\))?/)
  if (!m) throw new Error('Invalid pattern ', str)
  return [m[2], m[1] && m[3]]
}

export default class QueryPattern {
  constructor (pattern) {
    this.pattern = pattern
    this.queryKeys = Object.keys(this.pattern)
    this.conditionalParams = []
    this.paramsKeys = Object.values(this.pattern).map((val) => {
      let [name, isConditional] = readPatternKey(val)
      if (isConditional) this.conditionalParams.push(name)
      return name
    })
    this.names = this.paramsKeys
  }

  match (query) {
    let result = {}
    this.queryKeys.every((queryKey, i) => {
      let paramKey = this.paramsKeys[i]
      if (query[queryKey] != null) {
        result[paramKey] = query[queryKey]
      } else if (~this.conditionalParams.indexOf(paramKey)) {
        result[paramKey] = null
      } else {
        result = null
        return false
      }
      return true
    })
    return result
  }

  stringify (params) {
    let result = []
    for (let key in params) {
      let keyIndex = this.paramsKeys.indexOf(key)
      if (~keyIndex) {
        let queryKey = this.queryKeys[keyIndex]
        if (params[key]) {
          let value = encodeURIComponent(params[key])
          result.push(`${queryKey}=${value}`)
        }
      }
    }
    return result.join('&')
  }
}
