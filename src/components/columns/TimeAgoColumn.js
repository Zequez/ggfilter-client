import { Component, PropTypes as t } from 'react'

var plural = function (num) {
  return num == 1 ? '' : 's'
}

export default class RawColumn extends Component {
  static propTypes = {
    value: t.any,
    options: t.shape({
      interpolation: t.string,
      round: t.number
    })
  }

  render () {
    if (!this.props.value) {
      return (<span>-</span>)
    }

    var timeAgo = (new Date() - new Date(this.props.value)) / 1000 / 60 / 60 / 24 / 365

    var label
    if (timeAgo < 23/24) {
      timeAgo = timeAgo * 12
      timeAgo = Math.round(timeAgo)
      label = `month${plural(timeAgo)} ago`
    }
    else {
      timeAgo = Math.round(timeAgo)
      label = `year${plural(timeAgo)} ago`
    }

    return (
      <span title={this.props.value}>
        {timeAgo} <span className='text-deco'>{label}</span>
      </span>
    )
  }
}
