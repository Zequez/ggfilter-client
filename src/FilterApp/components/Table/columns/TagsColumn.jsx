import th from './columns.sass'
import React, { Component, PropTypes as t } from 'react'
import cx from 'classnames'

import { partial } from 'shared/lib/utils'

export default class TagsColumn extends Component {
  static propTypes = {
    value: t.arrayOf(t.number).isRequired,
    options: t.shape({
      tags: t.arrayOf(t.string)
    }).isRequired,
    filterParams: t.object,
    setFilter: t.func.isRequired
  }

  paramsTags () {
    return (this.props.filterParams && this.props.filterParams.tags) || []
  }

  selectTag = (tagId) => {
    let paramsTags = this.paramsTags()

    if (paramsTags.indexOf(tagId) === -1) {
      this.props.setFilter({tags: paramsTags.concat(tagId)})
    }
  }

  render () {
    let tags = this.props.options.tags
    let paramsTags = this.paramsTags()

    let tagsElements = this.props.value.map((tagId) => {
      let liClass = cx(th.TagsColumn__Tag, {
        [th.TagsColumn__Tag_selected]: paramsTags.indexOf(tagId) !== -1
      })
      return (
        <li key={tagId} onClick={partial(this.selectTag, tagId)} className={liClass}>
          {tags[tagId]}
        </li>
      )
    })

    return (
      <ul className={th.TagsColumn}>
        {tagsElements}
      </ul>
    )
  }
}
