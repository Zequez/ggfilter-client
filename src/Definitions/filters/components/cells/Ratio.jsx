import th from './columns'
import React, { Component, PropTypes as t } from 'react'
import cx from 'classnames'
import MicroTag from 'shared/components/MicroTag'
import tooltipFactory from 'shared/components/Tooltip'

const TooltipMicrotag = tooltipFactory(MicroTag, {position: 'left'})
const TooltipDiv = tooltipFactory('div', {position: 'left'})

export class Ratio extends Component {
  static propTypes = {
    ratio: t.number,
    total: t.number
  }

  // static noOverflowContainer = true

  render () {
    let { ratio, total } = this.props
    let tooltip = `${total} reviews, ${ratio}% positive`

    return (total && ratio) ? (
      <div className={cx(th.Ratio, {
        [th.Ratio_sampleLow]: total && total < 100,
        [th.Ratio_sampleHigh]: total && total > 1000,
        [th.Ratio_noSamples]: total === 0
      })}>
        <TooltipDiv tooltip={tooltip} className={th.Ratio__votesContainer}>
          <div className={th.Ratio__up} style={{ width: `${ratio}%` }}></div>
          <div className={th.Ratio__down} style={{ width: `${100 - ratio}%` }}></div>
        </TooltipDiv>
        <div className={th.Ratio__microTagContainer}>
          <TooltipMicrotag
            className={th.Ratio__MicroTag}
            tag={total}
            deco={ratio + '%'}
            tooltip={tooltip}/>
        </div>
      </div>
    ) : (
      <div className={th.Ratio}>
        <div className={th.Ratio__noData}>No reviews</div>
      </div>
    )
  }
}
