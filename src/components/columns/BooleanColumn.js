import React, { Component, PropTypes as t } from 'react'
var enumColumns = require('sources/enumColumns')
var classNames = require('classnames')

export default class BooleanColumn extends Component {
  static propTypes = {
    value: t.number.isRequired,
    name: t.string.isRequired
  }

  static noOverflowContainer = true

  constructor(props) {
    super(props)
    this.values = enumColumns.values[props.name]
    this.names = enumColumns.names[props.name]
    this.keys = Object.keys(this.values)
  }

  checked(val) {
    return (this.props.value & val) > 0
  }

  render() {
    let icons = this.keys.map((k)=>{
      let className = this.checked(this.values[k]) ? ('icon-' + k) : ''
      return (
        <i key={k} title={this.names[k]} className={'fa ' + className}></i>
      )
    })

    return (
      <div className='icons-list'>
        {icons}
      </div>
    )
  }
}
