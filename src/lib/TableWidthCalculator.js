class TableWidthCalculator {
  constructor(filters, columnsWidthAdjust, docWidth = document.documentElement.clientWidth) {
    this.filters = filters
    this.columnsWidthAdjust = columnsWidthAdjust
    this.docWidth = docWidth
  }

  tableBaseWidth() {
    return this._tableBaseWidth =
      this._tableBaseWidth ||
      this.columnsBaseWidth().reduce((b, w)=>b + w, 0)
  }

  tableAdjustedWidth() {
    return this._tableAdjustedWidth =
      this._tableAdjustedWidth ||
      this.columnsAdjustedWidth().reduce((b, w)=>b + w, 0)
  }

  tableWidth() {
    if (this._tableWidth) return this._tableWidth
    var adjustedWidth = this.tableAdjustedWidth()

    this._tableWidth =
      (adjustedWidth < this.docWidth) ? this.docWidth : adjustedWidth

    return this._tableWidth
  }

  columnsBaseWidth() {
    return this._columnsBaseWidth =
      this._columnsBaseWidth ||
      this.filters.map((f)=> f.width)
  }

  columnsAdjustedWidth() {
    return this._columnsAdjustedWidth =
      this._columnsAdjustedWidth ||
      this.filters.map((f)=> f.width + (this.columnsWidthAdjust[f.name] || 0))
  }

  columnsWidth() {
    var tableAdjustedWidth = this.tableAdjustedWidth()
    var tableBaseWidth = this.tableBaseWidth()

    var propWidths
    if (tableAdjustedWidth < this.docWidth) {
      let widthsAdjust = []
      propWidths = this.filters.map((f)=>{
        widthsAdjust.push(this.columnsWidthAdjust[f.name] || 0)
        return f.width / tableBaseWidth * this.docWidth
      })

      this._adjustWidths(propWidths, widthsAdjust)
    }
    else {
      propWidths = this.columnsAdjustedWidth()
    }

    propWidths = propWidths.map((w)=> Math.round(w))
    var propWidthsTotal = propWidths.reduce((b, w)=> b+w, 0)
    var tableWidth = this.tableWidth()
    propWidths[propWidths.length-1] -= propWidthsTotal-tableWidth

    return propWidths
  }

  // Distributes the adjusts of each width into
  // the rest of the widths on the right
  // unless it's the last column. In that case
  // it distributes it among all the widths on the left.
  _adjustWidths(widths, adjusts) {
    var len = widths.length
    for(let i = 0; i < len; ++i) {
      let a = adjusts[i]
      if (a !== 0) {
        widths[i] += a

        let rightLen = len - i - 1
        let aSpread, start, end
        if (rightLen > 0) { // Not last
          aSpread = a/rightLen
          start = i+1
          end = len
        }
        else { // Last
          aSpread = a/(len-1)
          start = 0
          end = len - 1
        }

        for(let j = start; j < end; ++j) {
          widths[j] -= aSpread
        }
      }
    }
  }
}

export default TableWidthCalculator
