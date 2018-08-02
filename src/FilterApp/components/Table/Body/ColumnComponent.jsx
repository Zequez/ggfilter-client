import th from './Body.sass'
import React from 'react'
import cx from 'classnames'
import { partial } from 'shared/lib/utils'

function cellInputValues (game, column) {
  var cellInputs = {}
  for (let inputName in column.cellInputs) {
    let columnName = column.cellInputs[inputName]
    cellInputs[inputName] = game[columnName]
  }
  cellInputs.name = column.name
  return cellInputs
}

export default ({game, column, setParam, columnParams, lightbox}) => {
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

  let props = cellInputValues(game, column)

  if (Component.active) {
    props.setParam = partial(setParam, column.name)
    props.columnParams = (columnParams !== true && columnParams !== false) ? columnParams : undefined
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
