import React, { PropTypes as t, Component } from 'react'

export default class FancyRangeControlLabel extends Component {
  static propTypes = {
    className: t.string,
    start: t.any,
    end: t.any,
    range: t.arrayOf(t.any),
    options: t.object
  }

  static defaultProps = {
    className: '',
    options: {}
  }

  constructor (props) {
    super(props)

    this.options = {
      '': '{v}',
      '*-*': '{si} to {ei}',
      '*->': '≥{si}',
      '<-*': '≤{ei}',
      '<->': 'Any',
      ...props.options
    }
  }

  label () {
    let { start, end, range } = this.props
    let interpolations = this.options

    let sv = range[start]
    let ev = range[end]
    let START = start === 0
    let END = end === range.length - 1

    let inte =
      (START && END && interpolations['<->']) ||
      (start === end && (interpolations[sv] || interpolations[''])) ||
      interpolations[`${sv}-${ev}`] ||
      (ev != null && interpolations[`${sv}-*`]) ||
      (sv != null && interpolations[`*-${ev}`]) ||
      (START && end != null && (interpolations[`<-${ev}`] || interpolations['<-*'])) ||
      (start != null && END && (interpolations[`${sv}->`] || interpolations['*->'])) ||
      (start != null && end != null && interpolations['*-*']) ||
      '{s}-{e}'

    let preInt = interpolations['']
    let preInterpolate = (index, v) =>
      start != null
        ? interpolations[v] || (preInt.call ? preInt(v) : preInt.replace('{v}', v))
        : null

    if (inte.call) {
      return inte === preInt
        ? inte(sv, ev)
        : inte(sv, ev, preInterpolate(start, sv), preInterpolate(end, ev))
    } else {
      return inte
        .replace('{v}', sv)
        .replace('{s}', sv)
        .replace('{e}', ev)
        .replace('{si}', () => preInterpolate(start, sv))
        .replace('{ei}', () => preInterpolate(end, ev))
    }
  }

  render () {
    let { className } = this.props

    return (
      <div className={`fancy-rf-label ${className}`}>
        <span>{this.label()}</span>
      </div>
    )
  }
}
