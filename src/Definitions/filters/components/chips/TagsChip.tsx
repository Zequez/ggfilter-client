import * as React from 'react';
import * as th from './chips.sass';
import MicroTag from 'shared/components/MicroTag';

import { Tags } from '../../../../Api';

type TagsChipProps = {
  query: Tags
};

function mapWithSpace<T, K> (arr: T[], spaceWord: string, callback: (val: T) => K) {
  let result = [];
  arr.forEach((val, i) => {
    result.push(callback(val));
    result.push(<span key={i}>{spaceWord}</span>);
  });
  result.pop();
  return result as K[];
}

export default class TagsChip extends React.Component<TagsChipProps, null> {
  static title = (query: Tags) => {
    let tagsText = query.tags && query.tags.length &&
      (query.mode === 'or' ? query.tags.join(' or ') : query.tags.join(', '));
    let excludeText = query.reject && query.reject.length && query.reject.join(', ');
    if (tagsText && excludeText)
      return `With tags ${tagsText} but excluding ${excludeText}`;
    else if (tagsText && !excludeText) return `With tags ${tagsText}`;
    else return `Excluding tags ${excludeText}`;
  }

  render () {
    let { query } = this.props;
    let separator = query.mode === 'or' ? ' or ' : ' ';

    return (
      <div className={th.TagsChip}>
      {mapWithSpace(query.tags, separator, (tag) =>
        <MicroTag key={tag} tag={tag} className={th.TagsChip__MicroTag}/>
      )}
      <span> </span>
      {mapWithSpace(query.reject, ' ', (tag) =>
        <MicroTag key={tag} tag={tag} className={th.TagsChip__MicroTag} alt={true}/>
      )}
    </div>
    );
  }
}
