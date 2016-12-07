import th from './chips.sass'
import React from 'react'
import MicroTag from 'shared/components/MicroTag'

export default function TagsChip ({query, options}) {
  return (
    <div className={th.TagsChip}>
      {query.tags.map((id) => (
        <MicroTag key={id} tag={options.tags[id]} className={th.TagsChip__MicroTag}/>
      ))}
    </div>
  )
}
