import th from './columns.sass'
import React, { PropTypes as t, Component } from 'react'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export default class DateColumn extends Component {
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

    let date = new Date(this.props.value)
    let day = date.getDate().toString()
    let month = MONTHS[date.getMonth()]
    let year = date.getFullYear()

    day = '00'.substring(0, 2 - day.length) + day

    let textDate = `${year} `
    let secondaryTextDate = `${month} ${day}`

    return (
      <span title={this.props.value} className={th.DateColumn}>
        {textDate}<span className={th.__deco}>{secondaryTextDate}</span>
      </span>
    )
  }
}
