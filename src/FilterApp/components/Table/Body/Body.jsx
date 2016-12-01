import React from 'react'
import Batch from './Batch'

export default function Body ({games, filters, filter}) {
  let batches = []
  for (let i = 0; i < games.batches.length; ++i) {
    batches.push(
      <Batch
        key={i}
        games={games.batches[i]}
        filters={filters}
        filtersParams={filter.params}/>
    )
  }

  return batches
}
