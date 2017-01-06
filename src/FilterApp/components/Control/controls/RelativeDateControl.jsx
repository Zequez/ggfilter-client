import th from './RelativeDateControl.sass'
import React, { PropTypes as t, Component } from 'react'
import SingleTimespanInput from 'shared/components/SingleTimespanInput'

const cn = (n) => th['RelativeDateControl' + n]

export default class RelativeDateControl extends Component {
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
    let { query } = this.props

    return (
      <div className={cn()}>
        <div className={cn('__gt')}>
          <span className={cn('__label')}>From</span>
          <SingleTimespanInput
            value={query.gt}
            onChange={this.onGtChange}
            className={cn('__TimeSpanInput')}/>
          <span className={cn('__ago')}>ago</span>
        </div>
        <div className={cn('__gt')}>
          <span className={cn('__label')}>To</span>
          <SingleTimespanInput
            value={query.lt}
            onChange={this.onLtChange}
            className={cn('__TimeSpanInput')}/>
          <span className={cn('__ago')}>ago</span>
        </div>
      </div>
    )
  }
}
