import th from './Body.sass'
import React from 'react'
import cx from 'classnames'
import * as columnsDefinitions from '../columns'
import { partial } from 'shared/lib/utils'

function columnInputValues (game, column) {
  var columnInputs = {}
  for (let inputName in column.columnInputs) {
    let columnName = column.columnInputs[inputName]
    columnInputs[inputName] = game[columnName]
  }
  return columnInputs
}

export default ({game, column, setParam, columnParams}) => {
  let tdClass = cx(
    column.name,
    th.Body__ColumnComponent, {
      [th.Body__ColumnComponent_hl]: !!game['hl_' + column.name],
      [th.Body__ColumnComponent_left]: column.alignment === -1,
      [th.Body__ColumnComponent_center]: column.alignment === 0,
      [th.Body__ColumnComponent_right]: column.alignment === 1
    }
  )

  let Component = columnsDefinitions[column.column]

  let props = {
    options: column.columnOptions,
    name: column.name,
    ...columnInputValues(game, column)
  }

  if (column.columnActive) {
    props.setParam = partial(setParam, column.name)
    props.columnParams = (columnParams !== true && columnParams !== false) ? columnParams : undefined
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
