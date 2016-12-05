import th from './columns'
import React, { Component, PropTypes as t } from 'react'
import MicroTag from 'shared/components/MicroTag'

export default class SysreqTokensDetailsColumn extends Component {
  static propTypes = {
    value: t.any
  }

  render () {
    let tags = []
    let tokens = this.props.value
    for (let name in tokens) {
      tags.push(<MicroTag key={name} tag={name} deco={tokens[name]}/>)
    }

    return (
      <span className={th.SysreqTokensDetailsColumn}>
        {tags}
      </span>
    )
  }
}
