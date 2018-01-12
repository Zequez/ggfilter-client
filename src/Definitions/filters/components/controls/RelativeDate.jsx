import th from './RelativeDate.sass'
import React, { PropTypes as t, Component } from 'react'
import SingleTimespanInput from 'shared/components/SingleTimespanInput'

export class RelativeDate extends Component {
  static propTypes = {
    query: t.shape({
      gt: t.number,
      lt: t.number
    }),
    onChange: t.func.isRequired
  }

  static defaultProps = {
    query: {
      lt: null,
      gt: null
    }
  }

  onGtChange = (value) => {
    this.onChange(value, this.props.query.lt)
  }

  onLtChange = (value) => {
    this.onChange(this.props.query.gt, value)
  }

  onChange (gt, lt) {
    if (gt != null || lt != null) {
      this.props.onChange({gt, lt})
    } else {
      this.props.onChange(null)
    }
  }

  render () {
    let { lt, gt } = this.props.query

    return (
      <div className={th.RelativeDate}>
        <div className={th.__gt}>
          <span className={th.__label}>From</span>
          <SingleTimespanInput
            value={gt}
            onChange={this.onGtChange}
            className={th.__TimeSpanInput}
            hint='∞'/>
          <span className={th.__ago}>ago</span>
        </div>
        <div className={th.__gt}>
          <span className={th.__label}>To</span>
          <SingleTimespanInput
            value={lt}
            onChange={this.onLtChange}
            className={th.__TimeSpanInput}
            hint='-∞'/>
          <span className={th.__ago}>ago</span>
        </div>
      </div>
    )
  }
}
