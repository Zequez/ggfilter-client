import React, { Component, PropTypes as t } from 'react'

export default class RawColumn extends Component {
  static propTypes = {
    value: t.any
  }

  render () {
    console.log(this.props.value)

    let tags = []
    let tokens = this.props.value
    for (let name in tokens) {
      tags.push(
        <span className='detail'>
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
