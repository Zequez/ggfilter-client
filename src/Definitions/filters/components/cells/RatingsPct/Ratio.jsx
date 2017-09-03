import th from './RatingsPct.sass'
import React, { PropTypes as t, Component } from 'react'

export default class Ratio extends Component {
  static propTypes = {
    ratio: t.number
  }

  render () {
    let { ratio } = this.props
    let positiveWidth = {
      width: `${ratio}%`
    }

    return (
      <div className={th.__Ratio} title={`${ratio}% positive`}>
        <div className={th.__ratioPositive} style={positiveWidth}>
        </div>
      </div>
    )
  }
}
