import React from 'react'

export default function RawChip ({query}) {
  return (
    <div>{JSON.stringify(query)}</div>
  )
}
