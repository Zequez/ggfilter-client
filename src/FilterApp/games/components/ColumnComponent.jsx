import React from 'react'
import cn from 'classnames'
import columnsDefinitions from './columns'
import { partial } from 'shared/lib/utils'

function columnInputValues (game, filter) {
  var columnInputs = {}
  for (let inputName in filter.columnInputs) {
    let columnName = filter.columnInputs[inputName]
    columnInputs[inputName] = game[columnName]
  }
  return columnInputs
}

export default ({game, filter, setFilter, filterParams}) => {
  let tdClass = cn(
    'filter-column',
    filter.name,
    'column-' + filter.column, {
      hl: !!game['hl_' + filter.name]
    }
  )

  let Component = columnsDefinitions[filter.column]

  let props = {
    options: filter.columnOptions,
    name: filter.name,
    ...columnInputValues(game, filter)
  }

  if (filter.columnActive) {
    props.setFilter = partial(setFilter, filter.name)
    props.filterParams = (filterParams !== true && filterParams !== false) ? filterParams : undefined
  }

  let comp = <Component {...props}/>

  return (
    <td className={tdClass}>
      {Component.noOverflowContainer
        ? comp
        : <div className='overflow-cell'>{comp}</div>}
    </td>
  )
}
