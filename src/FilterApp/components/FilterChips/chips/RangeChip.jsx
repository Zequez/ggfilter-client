import React from 'react'

export default function RangeChip ({query}) {
  return (
    <div>&lt; {query.lt} && &gt; {query.gt}</div>
  )
}
