import React, { PropTypes as t, Component } from 'react'

export default class FancyRangeFilterLabel extends Component {
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
      namedRanges: {},
      interpolation: '{v}',
      rangeInterpolation: '{si} to {ei}',
      gtInterpolation: '≥{si}',
      ltInterpolation: '≤{ei}',
      fullRangeLabel: 'Any',
      ...props.options
    }
  }

  label () {
    let { start, end, range } = this.props
    let { interpolation, gtInterpolation, ltInterpolation, rangeInterpolation, fullRangeLabel } = this.options
    let startVal = range[start]
    let endVal = range[end]

    if (start === end) {
      return this.interpolateSingle(interpolation, startVal)
    } else if (start === 0 && end === range.length - 1) {
      return fullRangeLabel != null
        ? fullRangeLabel
        : this.interpolate(rangeInterpolation, startVal, endVal)
    } else if (start === 0) {
      return this.interpolate(ltInterpolation, startVal, endVal)
    } else if (end === range.length - 1) {
      return this.interpolate(gtInterpolation, startVal, endVal)
    } else {
      return this.interpolate(rangeInterpolation, startVal, endVal)
    }
  }

  interpolateSingle (inter, val) {
    let { namedRanges } = this.options
    return namedRanges[val]
      ? namedRanges[val]
      : inter.call
        ? inter(val)
        : inter.replace('{v}', val)
  }

  interpolate (inter, val1, val2) {
    let { namedRanges, interpolation } = this.options
    let namedKey = `${val1}-${val2}`
    if (namedRanges[namedKey]) {
      return namedRanges[namedKey]
    } else {
      if (inter.call) {
        return inter(
          val1,
          val2,
          this.interpolateSingle(interpolation, val1),
          this.interpolateSingle(interpolation, val2)
        )
      } else {
        return inter
          .replace('{s}', val1)
          .replace('{e}', val2)
          .replace('{si}', () => this.interpolateSingle(interpolation, val1))
          .replace('{ei}', () => this.interpolateSingle(interpolation, val2))
      }
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
