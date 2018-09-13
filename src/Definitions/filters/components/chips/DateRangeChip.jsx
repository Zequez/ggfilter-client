import React from 'react'
import {
  formatShortDate as format,
  isFirstDayOfTheYear as isFD
} from 'shared/lib/utils/date'

const year = (date) => date.getUTCFullYear()

const getLabel = (gt, lt) => {
  if (gt) gt = new Date(gt * 1000)
  if (lt) lt = new Date(lt * 1000)

  if (gt != null && lt == null) {
    return isFD(gt)
      ? `≥ ${year(gt)}`
      : `After ${format(gt)}`
  } else if (lt != null && gt == null) {
    return isFD(lt)
      ? `≤ ${year(lt) - 1}`
      : `Before ${format(lt)}`
  } else if (lt != null && gt != null) {
    return isFD(gt) && isFD(lt)
      ? (year(gt) === year(lt) - 1 ? year(gt) : `${year(gt)}-${year(lt) - 1}`)
      : `Between ${format(gt)} and ${format(lt)}`
  }
}

export default function DateRangeChip ({query}) {
  let { gt, lt } = query
  let label = getLabel(gt, lt)

  return (
    <div>{label}</div>
  )
}
