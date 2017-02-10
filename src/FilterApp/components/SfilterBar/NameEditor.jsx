import th from './SfilterBar.sass'
import React, { PropTypes as t, Component } from 'react'
import { inputWithTheme } from 'shared/components/Input'
import BigInputTheme from './BigInputTheme'

const Input = inputWithTheme(BigInputTheme)

export default class NameEditor extends Component {
  static propTypes = {
    value: t.string,
    onChange: t.func.isRequired
  }

  render () {
    let { value, onChange } = this.props

    return (
      <Input className={th.__NameChanger} value={value} onChange={onChange} label='Filter name'/>
    )
  }
}
