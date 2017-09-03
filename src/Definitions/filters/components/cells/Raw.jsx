import th from './columns'
import React, { Component, PropTypes as t } from 'react'

export class Raw extends Component {
  static propTypes = {
    value: t.any,
    config: t.shape({
      interpolation: t.string,
      round: t.number
    })
  }

  static defaultProps = {
    config: {
      interpolation: '%s',
      round: 2,
      na: 'N/A'
    }
  };

  render () {
    let interp = this.props.config.interpolation
    let round = this.props.config.round
    let na = this.props.config.na

    let d1 = null
    let v = this.props.value
    let d2 = null
    if (v) {
      if (round) v = Math.floor(v * round) / round
      if (interp) [d1, d2] = interp.split('%s')
    } else {
      v = na
    }

    return (
      <span>
        {d1 ? <span className={th.__deco}>{d1}</span> : null}
        {v}
        {d2 ? <span className={th.__deco}>{d2}</span> : null}
      </span>
    )
  }
}
