import th from '../Table.sass'
import React from 'react'
import cx from 'classnames'
import columnsDefinitions from '../columns'
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
  let tdClass = cx(
    filter.name,
    th.Table__ColumnComponent, {
      [th.Table__ColumnComponent_hl]: !!game['hl_' + filter.name],
      [th.Table__ColumnComponent_numeric]: !!filter.numeric
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
      <div className={th.Table__OverflowCell}>{comp}</div>
      {/*{Component.noOverflowContainer
        ? comp
        : <div className={th.Table__OverflowCell}>{comp}</div>}*/}
    </td>
  )
}
