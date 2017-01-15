import th from './TextControl.sass'
import React, { Component, PropTypes as t } from 'react'
import Input from 'shared/components/Input'

export default class TextControl extends Component {
  static propTypes = {
    query: t.shape({
      value: t.string
    }).isRequired,
    onChange: t.func.isRequired
  }

  static defaultProps = { query: { value: '' } }

  onChange = (value) => {
    this.props.onChange(value ? {value} : null)
  }

  focus () {
    this.refs.input.focus()
  }

  render () {
    return (
      <div className={th.TextControl}>
        <Input
          value={this.props.query.value}
          hint='Search games by name'
          onChange={this.onChange}
          ref='input'/>
      </div>
    )
  }
}
