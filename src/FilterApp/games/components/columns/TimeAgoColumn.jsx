import React, { Component, PropTypes as t } from 'react'
import { timeAgo } from 'shared/lib/utils'

export default class TimeAgoColumn extends Component {
  static propTypes = {
    value: t.any
  }

  render () {
    if (!this.props.value) {
      return (<span>-</span>)
    }

    let date = new Date(this.props.value)
    let fullTimeAgo = timeAgo(date) + ' ago'
    let [, ago, label] = fullTimeAgo.match(/(\d+) (.*)/)

    return (
      <span title={this.props.value}>
        {ago} <span className='text-deco'>{label}</span>
      </span>
    )
  }
}
