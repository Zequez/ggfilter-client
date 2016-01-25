import { Component, PropTypes as t } from 'react'

import { partial, loopNumber } from 'lib/utils'
var TagsFinder = require('lib/TagsFinder')

export default class TagsSelector extends Component {
  static propTypes = {
    tags: t.arrayOf(t.string).isRequired,
    selectedTags: t.arrayOf(t.number).isRequired,
    value: t.string.isRequired,
    onSelect: t.func.isRequired
  }

  state = { focusedTag: 0, visible: false }
  found = []

  onKeyPress = (ev)=>{
    let i = this.state.focusedTag
    let key = ev.keyCode
    switch (key) {
      case 40: // Down
        i += 2
      case 38: // Up
        i = loopNumber(i, -1, this.found)
        ev.preventDefault()
        this.setState({focusedTag: i})
      break
      case 13: // Enter
        this.select(this.found[i])
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
    this.setState({focusedTag: i})
  }

  select = (tagId, ev)=>{
    if (ev) ev.preventDefault()
    this.setState({focusedTag: 0})
    this.props.onSelect(tagId)
  }

  render() {
    let tagsFinder = new TagsFinder(this.props.tags, this.props.selectedTags)
    this.found = tagsFinder.match(this.props.value)
    let foundTags = this.found.map((tagId, j)=>{
      let liClass = this.state.focusedTag === j ? 'focused' : ''
      return (
        <li
          key={tagId}
          className={liClass}
          onMouseOver={partial(this.onMouseOver, j)}
          onMouseDown={partial(this.select, tagId)}>
          {this.props.tags[tagId]}
        </li>
      )
    })

    let input = this.props.children
    let ulStyle = {
      left: input.props.style.paddingLeft
    }
    if (!this.state.visible) ulStyle.display = 'none'

    return (
      <div
        onBlur={this.onBlur}
        onFocus={this.onFocus}
        onKeyDown={this.onKeyPress}>
        {input}
        <ul className='tags-filter-selector' style={ulStyle}>
          {foundTags}
        </ul>
      </div>
    )
  }
}
