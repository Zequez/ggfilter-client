import th from '../theme'

import React, { PropTypes as t, Component } from 'react'

function travelToNumber (start, end, cb) {

}

export default class CalcResult extends Component {
  static propTypes = {
    mean: t.number.isRequired,
    deviation: t.number
  }

  state = {
    mean: 0
  }

  componentWillMount (props) {
    this.setState({mean: props.mean})
  }

  componentWillReceiveProps (np) {
    travelToNumber (this.state.mean, np.mean, (mean) => {
      this.setState({mean: mean})
    })
  }





  render () {
    let { mean, deviation } = this.props

    return (
      <div className={th.result}>
        <div className={th.resultTitle}>Your Sysreq index:</div>
        <div className={th.resultValue}>
          <span className={th.resultValueMean}>{calcs.mean}</span>
          {calcs.deviation ? <span className={th.resultValueDeviation}> ± {calcs.deviation}</span> : ''}
        </div>
      </div>
    )
  }
}
