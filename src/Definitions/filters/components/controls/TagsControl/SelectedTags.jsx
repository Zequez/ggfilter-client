import th from './TagsControl.sass'
import React, { Component, PropTypes as t } from 'react'
import MicroTag from 'shared/components/MicroTag'

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
    const { tags, selectedTags } = this.props

    return (
      <div className={th.TagsControl__SelectedTags} ref='ul'>
        {selectedTags.map(tagId =>
          <MicroTag
            key={tagId}
            tag={tags[tagId]}
            onDelete={this.onRemove.bind(this, tagId)}/>
        )}
      </div>
    )
  }
}
