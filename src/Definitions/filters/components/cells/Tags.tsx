import * as React from 'react';
import * as th from './columns.sass';

import { partial } from 'shared/lib/utils';

import MicroTag from 'shared/components/MicroTag';

interface TagsParams {
  value: number[];
  filterParams?: {tags: number[]};
  setQuery: (object: {tags: number[]}) => void;
};

export class Tags extends React.Component<TagsParams> {
  static tags = [];
  static active = true;

  paramsTags () {
    return (this.props.filterParams && this.props.filterParams.tags) || [];
  }

  selectTag = (tagId) => {
    let paramsTags = this.paramsTags();

    if (paramsTags.indexOf(tagId) === -1) {
      this.props.setQuery({tags: paramsTags.concat(tagId)});
    }
  }

  render () {
    const allTags = Tags.tags;
    const paramsTags = this.paramsTags();

    return (
      <span className={th.Tags}>
        {this.props.value.map((tagId) =>
          <MicroTag
            key={tagId}
            tag={allTags[tagId]}
            onClick={partial(this.selectTag, tagId)}
            highlighted={paramsTags.indexOf(tagId) !== -1}
            className={th.Tags__MicroTag}/>
        )}
      </span>
    )
  }
}
