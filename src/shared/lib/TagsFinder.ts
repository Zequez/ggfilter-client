export default class TagsFinder {
  private tags: string[];
  private exclude: string[];

  constructor (tags: string[], exclude: string[]) {
    this.tags = tags;
    this.exclude = exclude;
  }

  match (val: string, limit = 10) {
    if (!val) return [];
    let regex = this.regex(val);
    let found = [];
    let match = null;
    for (let i = 0, len = this.tags.length; i < len; ++i) {
      let tag = this.tags[i];
      if (tag && (match = tag.match(regex))) {
        if (this.exclude.indexOf(tag) === -1) {
          found.push([tag, match.index]);
        }
      }
    }
    found = found.sort((a, b) => a[1] - b[1]);
    return found.slice(0, limit).map((v) => v[0]);
  }

  private regex (val: string) {
    return new RegExp(
      val
        .replace(/[^a-z0-9\.]/ig, ' ')
        .replace(/\./g, '\\.')
        .split(/\s+/g)
        .join('[\\s-]*')
    , 'i')
  }
}
