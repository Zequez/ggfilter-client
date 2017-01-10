import React from 'react'
import { timeInWords } from 'shared/lib/utils'

export default function RelativeDateChip ({query}) {
  let { gt, lt } = query
  let label = ''

  if (gt === 0 && lt == null) {
    label = 'Unreleased'
  } else if (gt == null && lt === 0) {
    label = 'Released'
  } else if (lt === 0 && gt != null) {
    label = `Last ${timeInWords(gt, false)}`
  } else if (lt != null && gt == null) {
    label = `Older than ${timeInWords(lt)}`
  } else if (lt != null && gt != null) {
    label = `Between ${timeInWords(gt)} and ${timeInWords(lt)} ago`
  }

  return (
    <div>{label}</div>
  )
}
