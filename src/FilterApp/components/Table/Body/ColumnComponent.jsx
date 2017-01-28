import th from './Body.sass'
import React from 'react'
import cx from 'classnames'
import * as columnsDefinitions from '../columns'
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
    th.Body__ColumnComponent, {
      [th.Body__ColumnComponent_hl]: !!game['hl_' + filter.name],
      [th.Body__ColumnComponent_left]: filter.alignment === -1,
      [th.Body__ColumnComponent_center]: filter.alignment === 0,
      [th.Body__ColumnComponent_right]: filter.alignment === 1
    }
  )

  let Component = columnsDefinitions[filter.column]

  let props = {
    options: filter.columnOptions,
    name: filter.name,
    ...columnInputValues(game, filter)
  }

  // console.log(filter, filterParams)

  if (filter.columnActive) {
    props.setFilter = partial(setFilter, filter.name)
    props.filterParams = (filterParams !== true && filterParams !== false) ? filterParams : undefined
  }

  let comp = <Component {...props}/>

  return (
    <td className={tdClass}>
      {Component.noOverflowContainer
        ? comp
        : <div className={th.Body__OverflowCell}>{comp}</div>}
    </td>
  )
}
