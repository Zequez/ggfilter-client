import th from './columns'
import React, { Component, PropTypes as t } from 'react'

export default class RatioColumn extends Component {
  static propTypes = {
    up: t.number,
    down: t.number,
    value: t.number
  }

  static noOverflowContainer = true

  render () {
    var ratio = this.props.value
    if (!ratio) {
      let up = this.props.up
      let down = this.props.down
      let total = up + down
      ratio = Math.floor(up / total * 100)
    }

    var upStyle = {
      width: `${ratio}%`
    }
    var downStyle = {
      width: `${100 - ratio}%`
    }

    return (
      <div className={th.RatioColumn}>
        <div className={th.RatioColumn__up} style={upStyle}></div>
        <div className={th.RatioColumn__down} style={downStyle}></div>
      </div>
    )
  }
}
