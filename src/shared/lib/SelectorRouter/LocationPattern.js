import UrlPattern from 'url-pattern'
import QueryPattern from './QueryPattern'

const URL_PATTERN_OPTIONS = {
  segmentValueCharset: 'a-zA-Z0-9_+-'
}

export default class LocationPattern {
  constructor (pathPatternStr, queryPatternObj) {
    this.pathPattern = new UrlPattern(pathPatternStr, URL_PATTERN_OPTIONS)
    this.queryPattern = new QueryPattern(queryPatternObj)
    this.names = this.pathPattern.names.concat(this.queryPattern.names)
  }

  match (location) {
    let pathParams = this.pathPattern.match(location.pathname)
    if (pathParams) {
      let queryParams = this.queryPattern.match(location.query)
      if (queryParams) {
        return {...pathParams, ...queryParams}
      }
    }

    return null
  }

  stringify (params) {
    let pathStr = this.pathPattern.stringify(params)
    let queryStr = this.queryPattern.stringify(params)

    pathStr = pathStr.replace(/\/$/, '')

    return queryStr ? (pathStr + '?' + queryStr) : pathStr
  }
}
