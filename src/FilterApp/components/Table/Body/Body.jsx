import React from 'react'
import Batch from './Batch'

export default function Body ({gamesPages, filters, filter}) {
  let batches = []
  for (let i = 0; i < gamesPages.length; ++i) {
    batches.push(
      <Batch
        key={i}
        games={gamesPages[i]}
        filters={filters}
        filtersParams={filter.params}/>
    )
  }

  return batches
}
