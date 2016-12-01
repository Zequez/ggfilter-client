import React, { Component, PropTypes as t } from 'react'

export default class SelectedTags extends Component {
  static propTypes = {
    tags: t.arrayOf(t.string).isRequired,
    selectedTags: t.arrayOf(t.number).isRequired,
    onRemove: t.func.isRequired,
    onWidthChange: t.func.isRequired
  }

  componentDidMount () {
    this.componentDidUpdate()
  }

  componentDidUpdate () {
    this.refs.ul.scrollLeft = 9999
    setTimeout(() => {
      this.props.onWidthChange(this.refs.ul.clientWidth)
    }, 0)
  }

  shouldComponentUpdate (nextProps) {
    return (this.props.selectedTags !== nextProps.selectedTags) || (this.props.tags !== nextProps.tags)
  }

  onRemove (tagId) {
    this.props.onRemove(tagId)
  }

  render () {
    let tags = this.props.selectedTags.map(tagId => {
      return (
        <li key={tagId}>
          {this.props.tags[tagId]}
          <span className='selected-tag-remove' onClick={this.onRemove.bind(this, tagId)}></span>
        </li>
      )
    })

    return (
      <ul className='tags-filter-selected-tags' ref='ul'>
        {tags}
      </ul>
    )
  }
}
