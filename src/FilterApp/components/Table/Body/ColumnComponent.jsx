import th from './Body.sass'
import React from 'react'
import cx from 'classnames'
import { partial } from 'shared/lib/utils'

function cellInputValues (column, params, game) {
  var cellInputs = {}
  for (let inputName in column.cellInputs) {
    let columnName = column.cellInputs[inputName]
    cellInputs[inputName] = game[columnName]
  }
  cellInputs.name = column.name

  for (let inputName in column.boundInputs) {
    let paramName = column.boundInputs[inputName]
    let val = params[paramName]

    cellInputs[inputName] = (val !== true && val !== false) ? val : undefined
  }

  // if (column.boundParams) {
  //   props.columnParams = (columnParams !== true && columnParams !== false) ? columnParams : undefined
  // }

  return cellInputs
}

export default ({game, column, setParam, params, lightbox}) => {
  let tdClass = cx(
    column.name,
    th.Body__ColumnComponent, {
      [th.Body__ColumnComponent_hl]: !!game['hl_' + column.name],
      [th.Body__ColumnComponent_left]: column.alignment === -1,
      [th.Body__ColumnComponent_center]: column.alignment === 0,
      [th.Body__ColumnComponent_right]: column.alignment === 1
    }
  )

  let Component = column.cell

  let props = cellInputValues(column, params, game)

  if (Component.active) {
    props.setParam = partial(setParam, column.name)
  }

  if (Component.lightbox) {
    props.lightbox = lightbox
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
