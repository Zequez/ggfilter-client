import React, { Component, PropTypes as t } from 'react'
import { partial, loopNumber } from 'lib/utils'

export default class SuggestionsDropdown extends Component {
  static propTypes = {
    /**
     * List of strings to search in
     */
    list: t.arrayOf(t.string).isRequired,
    /**
     * Items associated with the #list prop, it should
     * be the same length. It will be passed along in the callback
     */
    listValues: t.array,
    /**
     * Callback called when the user selects an item
     */
    onSelect: t.func.isRequired
  }

  state = { focused: 0, visible: false }
  found = []

  onKeyPress = (ev)=>{
    let list = this.props.listValues || this.props.list
    let i = this.state.focused
    let key = ev.keyCode
    switch (key) {
      case 40: // Down
        i += 2
      case 38: // Up
        i = loopNumber(i, -1, list)
        ev.preventDefault()
        this.setState({focused: i})
      break
      case 13: // Enter
        this.select(list[i])
      break
    }
  }

  onFocus = ()=>{
    this.setState({visible: true})
  }

  onBlur = ()=>{
    this.setState({visible: false})
  }

  onMouseOver = (i)=>{
    this.setState({focused: i})
  }

  select = (value, ev)=>{
    if (ev) ev.preventDefault()
    this.setState({focused: 0})
    this.props.onSelect(value)
  }

  componentWillReceiveProps (np) {
    if (this.state.focused + 1 > np.list.length) {
      let focused = np.list.length ? np.list.length - 1 : 0
      this.setState({focused: focused})
    }
  }

  render() {
    let list = this.props.list
    let listValues = this.props.listValues || list

    let liElements = list.map((option, i)=>{
      let liClass = this.state.focused === i ? 'focused' : ''
      return (
        <li
          key={i}
          className={liClass}
          onMouseOver={partial(this.onMouseOver, i)}
          onMouseDown={partial(this.select, listValues[i])}>
          {list[i]}
        </li>
      )
    })

    let ulStyle = {}
    if (!this.state.visible) ulStyle.display = 'none'

    return (
      <div
        className='suggestions-dropdown'
        onBlur={this.onBlur}
        onFocus={this.onFocus}
        onKeyDown={this.onKeyPress}>
        {this.props.children}
        <ul className='suggestions-dropdown-selector' style={ulStyle}>
          {liElements}
        </ul>
      </div>
    )
  }
}
