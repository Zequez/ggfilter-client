import th from './columns.sass'
import React, { Component, PropTypes as t } from 'react'

import { partial } from 'shared/lib/utils'

import MicroTag from 'shared/components/MicroTag'

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
    const tags = this.props.options.tags
    const paramsTags = this.paramsTags()

    return (
      <span className={th.TagsColumn}>
        {this.props.value.map((tagId) =>
          <MicroTag
            key={tagId}
            tag={tags[tagId]}
            onClick={partial(this.selectTag, tagId)}
            highlighted={paramsTags.indexOf(tagId) !== -1}
            className={th.TagsColumn__MicroTag}/>
        )}
      </span>
    )
  }
}
