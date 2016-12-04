import th from './EditableDropdown.sass'
import React, { PropTypes as t, Component } from 'react'
import cx from 'classnames'
import { onClickOutsideOnce } from 'shared/lib/utils'
import Input from './Input'
import NumericInput from './NumericInput'
import FloatingMenu from './FloatingMenu'

export default class EditableDropdown extends Component {
  static propTypes = {
    value: t.any,
    onChange: t.func,
    options: t.arrayOf(t.array),
    hint: t.string,
    numeric: t.bool
  }

  static defaultProps = {
    options: [],
    onChange: () => {}
  }

  state = {
    dropdownVisible: false
  }

  onSelect = (value) => {
    console.log('SELECT!')
    this.props.onChange(value)
    this.closeDropdown()
  }

  onChange = (value) => {
    this.props.onChange(value)
  }

  openDropdownFromArrow = () => {
    onClickOutsideOnce(this.refs.div, () => this.closeDropdown())
    this.openDropdown()
  }

  openDropdown = () => {
    this.setState({dropdownVisible: true})
  }

  closeDropdown = () => {
    this.setState({dropdownVisible: false})
  }

  render () {
    let {
      options,
      value,
      className,
      numeric,
      ...other
    } = this.props

    let classes = cx(th.EditableDropdown, {
      [className]: !!className,
      [th.EditableDropdown_dropdownVisible]: this.state.dropdownVisible
    })

    let Comp = numeric ? NumericInput : Input
    let arrowClass = cx(th.EditableDropdown__arrow, 'fa icon-dropdown')

    return (
      <div className={classes} ref='div'>
        <Comp
          {...other}
          className={th.EditableDropdown__input}
          value={value}
          onChange={this.onChange}
          onFocus={this.openDropdown}
          onBlur={this.closeDropdown}
        />
        <span className={arrowClass} onClick={this.openDropdownFromArrow}></span>
        <FloatingMenu
          className={th.EditableDropdown__FloatingMenu}
          options={options}
          onSelect={this.onSelect}/>
      </div>
    )
  }
}
