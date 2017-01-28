import th from './chips.sass'
import React, { Component, PropTypes as t } from 'react'
import rangeInterpolation from '../../../lib/rangeInterpolation'

export default class RangeChip extends Component {
  static propTypes = {
    query: t.shape({
      gt: t.number,
      lt: t.number
    }),
    options: t.object
    // asText: t.boolean
  }

  // static text ({query, options}) {
  //   return rangeInterpolation(query, options)
  // }

  render () {
    // if (this.props.asText) return this.text()

    return (
      <div className={th.RangeChip}>
        {rangeInterpolation(this.props.query, this.props.options)}
      </div>
    )
  }
}
