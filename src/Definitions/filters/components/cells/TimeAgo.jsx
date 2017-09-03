import th from './columns'
import React, { Component, PropTypes as t } from 'react'
import { relativeTimeInWords } from 'shared/lib/utils'

export class TimeAgo extends Component {
  static propTypes = {
    value: t.any
  }

  timePastLabel (text) {
    let [, value, unit] = text.match(/(\d+) (.*)/)

    return (
      <span>
        {value}<span className={th.__deco}> {unit} ago</span>
      </span>
    )
  }

  timeFutureLabel (text) {
    let [, value, unit] = text.match(/(\d+) (.*)/)

    return (
      <span className={th.TimeAgo__future}>
        <span className={th.__deco}>in</span> {value} <span className={th.__deco}>{unit}</span>
      </span>
    )
  }

  render () {
    if (!this.props.value) {
      return (<span>-</span>)
    }

    let el = relativeTimeInWords(new Date(this.props.value), this.timePastLabel, this.timeFutureLabel)

    return (
      <span title={this.props.value} className={th.TimeAgo}>
        {el}
      </span>
    )
  }
}
