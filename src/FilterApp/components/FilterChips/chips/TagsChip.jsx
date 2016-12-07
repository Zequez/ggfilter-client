import React from 'react'
import MicroTag from 'shared/components/MicroTag'

export default function TagsChip ({query, options}) {
  return (
    <div>
      {query.tags.map((id) => (
        <MicroTag key={id} tag={options.tags[id]}/>
      ))}
    </div>
  )
}
