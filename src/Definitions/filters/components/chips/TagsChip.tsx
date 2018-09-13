import * as React from 'react';
import * as th from './chips.sass';
import MicroTag from 'shared/components/MicroTag';

import { Tags } from '../../../../Api';

type TagsChipProps = {
  config: {query: Tags}
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

export default function TagsChip ({config}: TagsChipProps) {
  let separator = config.query.mode === 'or' ? ' or ' : ' ';

  return (
    <div className={th.TagsChip}>
      {mapWithSpace(config.query.reject, ' ', (tag) =>
        <MicroTag key={tag} tag={tag} className={th.TagsChip__MicroTag} alt={true}/>
      )}
      <span> </span>
      {mapWithSpace(config.query.tags, separator, (tag) =>
        <MicroTag key={tag} tag={tag} className={th.TagsChip__MicroTag}/>
      )}
    </div>
  );
}
