import th from './columns.sass'
import React, { Component, PropTypes as t } from 'react'

import { partial } from 'shared/lib/utils'

import MicroTag from 'shared/components/MicroTag'

export class Tags extends Component {
  static tags = [];
  static active = true;

  static propTypes = {
    value: t.arrayOf(t.number).isRequired,
    filterParams: t.object,
    setQuery: t.func.isRequired
  }

  paramsTags () {
    return (this.props.filterParams && this.props.filterParams.tags) || []
  }

  selectTag = (tagId) => {
    let paramsTags = this.paramsTags()

    if (paramsTags.indexOf(tagId) === -1) {
      this.props.setQuery({tags: paramsTags.concat(tagId)})
    }
  }

  render () {
    const tags = Tags.tags
    const paramsTags = this.paramsTags()

    return (
      <span className={th.Tags}>
        {this.props.value.map((tagId) =>
          <MicroTag
            key={tagId}
            tag={tags[tagId]}
            onClick={partial(this.selectTag, tagId)}
            highlighted={paramsTags.indexOf(tagId) !== -1}
            className={th.Tags__MicroTag}/>
        )}
      </span>
    )
  }
}
