import th from './TagsControl.sass'
import React, { Component, PropTypes as t } from 'react'
import cx from 'classnames'

import { partial, loopNumber } from 'shared/lib/utils'
import TagsFinder from 'shared/lib/TagsFinder'
import FloatingMenu from 'shared/components/FloatingMenu'

export default class TagsSelector extends Component {
  static propTypes = {
    tags: t.arrayOf(t.string).isRequired,
    selectedTags: t.arrayOf(t.number).isRequired,
    value: t.string.isRequired,
    onSelect: t.func.isRequired
  }

  state = { focusedTag: 0, visible: false }
  found = []

  onKeyPress = (ev) => {
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

  onFocus = () => {
    this.setState({visible: true})
  }

  onBlur = () => {
    this.setState({visible: false})
  }

  onMouseOver = (i) => {
    this.setState({focusedTag: i})
  }

  select = (tagId, ev) => {
    if (ev) ev.preventDefault()
    this.setState({focusedTag: 0})
    this.props.onSelect(tagId)
  }

  onSelect = (value) => {
    this.select(value)
    // console.log('Selected!', value)
  }

  render () {
    let tagsFinder = new TagsFinder(this.props.tags, this.props.selectedTags)
    this.found = tagsFinder.match(this.props.value)

    let { focusedTag } = this.state
    let focusedTagId = null
    let selectOptions = this.found.map((tagId, j) => {
      if (focusedTag === j) {
        focusedTagId = tagId
      }
      return [this.props.tags[tagId], tagId]
    })

    return (
      <div
        className={th.TagsControl__TagsSelector}
        onBlur={this.onBlur}
        onFocus={this.onFocus}
        onKeyDown={this.onKeyPress}
      >
        {this.props.children}
        {selectOptions.length
          ? (
            <FloatingMenu
              className={th.TagsControl__FloatingMenu}
              options={selectOptions}
              selected={focusedTagId}
              onSelect={this.onSelect}
            />
          )
          : null }

        {/*<ul className={th.TagsControl__TagsSelector} style={ulStyle}>
          {foundTags}
        </ul>*/}
      </div>
    )
  }
}
