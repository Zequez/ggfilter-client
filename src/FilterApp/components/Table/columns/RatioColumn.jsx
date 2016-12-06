import th from './columns'
import React, { Component, PropTypes as t } from 'react'
import cx from 'classnames'
import MicroTag from 'shared/components/MicroTag'
import tooltipFactory from 'shared/components/Tooltip'

const TooltipMicrotag = tooltipFactory(MicroTag, {position: 'left'})
const TooltipDiv = tooltipFactory('div', {position: 'left'})

export default class RatioColumn extends Component {
  static propTypes = {
    ratio: t.number,
    total: t.number
  }

  // static noOverflowContainer = true

  render () {
    let { ratio, total } = this.props
    let tooltip = `${total} reviews, ${ratio}% positive`

    return (total && ratio) ? (
      <div className={cx(th.RatioColumn, {
        [th.RatioColumn_sampleLow]: total && total < 100,
        [th.RatioColumn_sampleHigh]: total && total > 1000,
        [th.RatioColumn_noSamples]: total === 0
      })}>
        <TooltipDiv tooltip={tooltip} className={th.RatioColumn__votesContainer}>
          <div className={th.RatioColumn__up} style={{ width: `${ratio}%` }}></div>
          <div className={th.RatioColumn__down} style={{ width: `${100 - ratio}%` }}></div>
        </TooltipDiv>
        <div className={th.RatioColumn__microTagContainer}>
          <TooltipMicrotag
            className={th.RatioColumn__MicroTag}
            tag={total}
            deco={ratio + '%'}
            tooltip={tooltip}/>
        </div>
      </div>
    ) : (
      <div className={th.RatioColumn}>
        <div className={th.RatioColumn__noData}>No reviews</div>
      </div>
    )
  }
}
