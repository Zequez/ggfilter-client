import React, { Component, PropTypes as t } from 'react'

export default class RawColumn extends Component {
  static propTypes = {
    value: t.any,
    options: t.shape({
      interpolation: t.string,
      round: t.number
    })
  }

  render () {
    var interp = this.props.options.interpolation
    var round = this.props.options.round

    let d1 = null
    let v = this.props.value
    let d2 = null
    if (v) {
      if (round) v = Math.floor(v * round) / round
      if (interp) [d1, d2] = interp.split('%s')
    } else {
      v = '-'
    }

    return (
      <span>
        {d1 ? <span className='text-deco'>{d1}</span> : null}
        {v}
        {d2 ? <span className='text-deco'>{d2}</span> : null}
      </span>
    )
  }
}
