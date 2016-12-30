import th from './chips.sass'
import React from 'react'
import Icon from 'shared/components/Icon'

export default function ToggleChip ({query}) {
  return (
    <div className={th.ToggleChip}>
      {query.value
        ? <Icon icon='toggle-check'/>
        : <Icon icon='toggle-uncheck'/>
      }
    </div>
  )
}
