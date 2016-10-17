export default class TagsFinder {
  constructor (tags, exclude) {
    this.tags = tags
    this.exclude = exclude
  }

  match (val, limit = 10) {
    if (!val) return []
    let regex = this._regex(val)
    let found = []
    let match = null
    for (let i = 0, len = this.tags.length; i < len; ++i) {
      if (this.tags[i] && (match = this.tags[i].match(regex))) {
        if (this.exclude.indexOf(i) === -1) {
          found.push([i, match.index, this.tags[i]])
        }
      }
    }
    found = found.sort((a, b) => a[1] - b[1])
    return found.slice(0, limit).map((v) => v[0])
  }

  _regex (val) {
    return new RegExp(
      val
        .replace(/[^a-z0-9\.]/ig, ' ')
        .replace(/\./g, '\\.')
        .split(/\s+/g)
        .join('[\\s-]*')
    , 'i')
  }
}
