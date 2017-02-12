/* @flow */
import th from './SfilterBar.sass'
import React, { Component } from 'react'
import { inputWithTheme } from 'shared/components/Input'
import BigInputTheme from './BigInputTheme'

const Input = inputWithTheme(BigInputTheme)

type Props = {
  value: string,
  onChange: () => void,
  canEdit: boolean
}

export default class NameEditor extends Component {
  props : Props

  render () {
    let { value, onChange, canEdit } = this.props

    return (
      <Input
        className={th.__NameChanger}
        value={value}
        onChange={onChange}
        label='Filter name'
        disabled={!canEdit}/>
    )
  }
}
