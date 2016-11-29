import th from '../theme'

import React, { PropTypes as t, Component } from 'react'
import EasingNumber from './EasingNumber'

export default class CalcResult extends Component {
  static propTypes = {
    mean: t.number.isRequired,
    deviation: t.number
  }

  render () {
    let { mean, deviation } = this.props

    return (
      <div className={th.result}>
        <div className={th.resultTitle}>Your Sysreq index:</div>
        <div className={th.resultValue}>
          <EasingNumber className={th.resultValueMean} number={mean}/>
          {deviation ? (
            <span className={th.resultValueDeviation}>
              ± <EasingNumber number={deviation}/>
            </span>
          ) : null}
        </div>
      </div>
    )
  }
}
