import React, { Component, PropTypes as t } from 'react'

export default class SysreqTokensDetailsColumn extends Component {
  static propTypes = {
    value: t.any
  }

  render () {
    let tags = []
    let tokens = this.props.value
    for (let name in tokens) {
      tags.push(
        <span className='detail' key={name}>
          <i>{tokens[name]}</i> {name}
        </span>
      )
    }

    return (
      <span>
        {tags}
      </span>
    )
  }
}
