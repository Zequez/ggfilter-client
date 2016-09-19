import React, { PropTypes as t, Component } from 'react'

export default class FancyRangeFilterBar extends Component {
  static propTypes = {
    chunkSize: t.number.isRequired,
    start: t.number,
    end: t.number,
    className: t.string
  }

  barStyle () {
    let { start, end, chunkSize } = this.props

    if (start == null || end == null) return {}

    let startX = start * chunkSize * 100
    let endX = (end * chunkSize + chunkSize) * 100
    return {
      left: `${startX}%`,
      right: `${100 - endX}%`
    }
  }

  render () {
    return (
      <div className={'fancy-rf-bar ' + this.props.className} style={this.barStyle()}></div>
    )
  }
}
