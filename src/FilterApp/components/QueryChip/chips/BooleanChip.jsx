import th from './chips.sass'
import React from 'react'
import enumColumns from '../../../config/enumColumns'
import Icon from 'shared/components/Icon'

function checked (currentValue, specificValue) {
  return (currentValue & specificValue) > 0
}

export default function BooleanChip ({query, name}) {
  let values = enumColumns.values[name]
  let names = enumColumns.names[name]

  let words = []
  let keys = []
  for (let key in values) {
    if (checked(query.value, values[key])) {
      words.push(names[key])
      keys.push(key)
    }
  }

  let separator = query.mode
  // let text = words.join(separator)
  let iconsOnly = words.length > 1
  let lastWord = words.length - 1

  let components = []
  words.forEach((word, i) => {
    components.push(<Icon key={keys[i] + 'i'} icon={'boolean-' + keys[i]}/>)
    if (!iconsOnly) {
      components.push(<span key={keys[i] + 'w'}>{word}</span>)
    }
    if (i < lastWord) {
      components.push(
        <span key={keys[i] + 's'} className={th.BooleanChip__separator}>
          {separator}
        </span>
      )
    }
  })

  return (
    <div className={th.BooleanChip}>{components}</div>
  )
}
