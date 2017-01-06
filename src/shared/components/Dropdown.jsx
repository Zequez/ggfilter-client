import th from './Dropdown.sass'
import React, { PropTypes as t, Component } from 'react'
import cx from 'classnames'
import FloatingMenu from './FloatingMenu'
import Icon from './Icon'

const ARROW_DOWN = 40
const ARROW_UP = 38

export default class EditableDropdown extends Component {
  static propTypes = {
    value: t.any,
    onChange: t.func,
    options: t.arrayOf(t.array)
  }

  static defaultProps = {
    options: [],
    onChange: () => {}
  }

  state = {
    dropdownVisible: false,
    transformOffset: 0,
    index: 0
  }

  componentWillMount () {
    this.componentWillReceiveProps(this.props)
  }

  componentWillReceiveProps (props) {
    let { options, value } = props
    this.setState({index: options.findIndex((v) => v[1] === value)})
  }

  handleKeyDown = (ev) => {
    const { options } = this.props
    const { index } = this.state

    let newIndex = index
    if (ev.keyCode === ARROW_DOWN) {
      newIndex = index + 1
      if (newIndex >= options.length) newIndex = 0
    } else if (ev.keyCode === ARROW_UP) {
      newIndex = index - 1
      if (newIndex <= -1) newIndex = options.length - 1
    }

    if (newIndex !== index) {
      this.onChange(options[newIndex][1], newIndex)
      ev.preventDefault()
    }
  }

  onSelect = (value, index) => {
    this.onChange(value, index)
    this.closeDropdown()
  }

  onChange = (value, index) => {
    this.props.onChange(value, index)
  }

  openDropdown = () => {
    this.setState({
      dropdownVisible: true,
      transformOffset: this.transformOffset()
    })

    this.refs.floatingMenu.onClickOutsideOnce(() => {
      this.closeDropdown()
    })
  }

  closeDropdown = () => {
    if (this.state.dropdownVisible) {
      this.setState({dropdownVisible: false})
    }
  }

  toggleDropdown = () => {
    this.state.dropdownVisible ? this.closeDropdown() : this.openDropdown()
  }

  transformOffset () {
    return -this.state.index * 8 * 6
  }

  render () {
    let {
      options,
      className,
      ...other //eslint-disable-line no-unused-vars
    } = this.props
    let { dropdownVisible, transformOffset, index } = this.state

    let classes = cx(th.Dropdown, {
      [className]: !!className,
      [th.Dropdown_dropdownVisible]: dropdownVisible
    })

    let selectedLabel = options[index][0]
    let flotingMenuTransform = `translateY(${transformOffset}px)`

    return (
      <div className={classes} tabIndex='0' ref='el' onKeyDown={this.handleKeyDown}>
        <div className={th.Dropdown__selected} onClick={this.toggleDropdown}>
          {selectedLabel}
        </div>
        <Icon
          icon={dropdownVisible ? 'dropdown-up' : 'dropdown'}
          className={th.Dropdown__arrow}
          onClick={this.toggleDropdown}/>
        <FloatingMenu
          ref='floatingMenu'
          className={th.Dropdown__FloatingMenu}
          style={{transform: flotingMenuTransform}}
          options={options}
          onSelect={this.onSelect}/>
      </div>
    )
  }
}
