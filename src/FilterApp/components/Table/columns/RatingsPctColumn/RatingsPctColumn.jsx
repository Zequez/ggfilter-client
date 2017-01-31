import th from './RatingsPctColumn.sass'
import React, { PropTypes as t, Component } from 'react'

import { TTDiv } from 'shared/components/Tooltip'
import Count from './Count'
import Ratio from './Ratio'
import Percentiles from './Percentiles'

export default class PercentileColumn extends Component {
  static propTypes = {
    pct: t.number,
    count: t.number,
    ratio: t.number
  }

  render () {
    let { pct, count, ratio } = this.props
    let tooltip = `${count} ratings, ${ratio}% positive, top ${pct}th percentiles average`

    return (
      <TTDiv className={th.RatingsPctColumn} tooltip={tooltip}>
        <Count count={count}/>
        <div className={th.__bars}>
          <Percentiles divisions={10} pct={pct}/>
          <Ratio ratio={ratio}/>
        </div>
      </TTDiv>
    )
  }
}
