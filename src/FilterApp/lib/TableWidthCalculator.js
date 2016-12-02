function sum (arr) {
  return arr.reduce((b, w) => b + w, 0)
}

class TableWidthCalculator {
  constructor (filters, deltas, containerWidth) {
    this.filters = filters
    this.deltas = deltas
    this.containerWidth = containerWidth

    this.columnsBaseWidth = this.filters.map((f) => f.width)
    this.tableBaseWidth = sum(this.columnsBaseWidth)

    this.columnsAdjustedWidth = this.filters.map((f) => f.width + (this.deltas[f.name] || 0))
    this.tableAdjustedWidth = sum(this.columnsAdjustedWidth)

    this.tableWidth = this.tableAdjustedWidth < this.containerWidth
      ? this.containerWidth
      : this.tableAdjustedWidth

    this.columnsWidth = this._columnsWidth()
  }

  _columnsWidth () {
    let propWidths
    if (this.tableAdjustedWidth < this.containerWidth) {
      let widthsAdjust = []
      propWidths = this.filters.map((f) => {
        widthsAdjust.push(this.deltas[f.name] || 0)
        return f.width / this.tableBaseWidth * this.containerWidth
      })

      this._adjustWidths(propWidths, widthsAdjust)
    } else {
      propWidths = this.columnsAdjustedWidth
    }

    propWidths = propWidths.map((w) => Math.round(w))

    // I have no idea what this does, removing it doesn't break the tests
    let propWidthsTotal = sum(propWidths)
    propWidths[propWidths.length - 1] -= propWidthsTotal - this.tableWidth

    return propWidths
  }

  map (cb) {
    let columnsWidth = this.columnsWidth
    return this.filters.map((filter, i) => cb(filter, columnsWidth[i], i))
  }

  // Distributes the adjusts of each width into
  // the rest of the widths on the right
  // unless it's the last column. In that case
  // it distributes it among all the widths on the left.
  _adjustWidths (widths, adjusts) {
    let len = widths.length
    for (let i = 0; i < len; ++i) {
      let a = adjusts[i]
      if (a !== 0) {
        widths[i] += a

        let rightLen = len - i - 1
        let aSpread, start, end
        if (rightLen > 0) { // Not last
          aSpread = a / rightLen
          start = i + 1
          end = len
        } else { // Last
          aSpread = a / (len - 1)
          start = 0
          end = len - 1
        }

        for (let j = start; j < end; ++j) {
          widths[j] -= aSpread
        }
      }
    }
  }
}

export default TableWidthCalculator
