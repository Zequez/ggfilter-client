import React from 'react'
import Batch from './Batch'

export default function Body ({gamesPages, columns, columnsParams}) {
  let batches = []
  for (let i = 0; i < gamesPages.length; ++i) {
    batches.push(
      <Batch
        key={i}
        games={gamesPages[i]}
        columns={columns}
        columnsParams={columnsParams}/>
    )
  }

  return batches
}
