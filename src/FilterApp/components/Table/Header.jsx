import th from './Table.sass'
import React, { PropTypes as t, Component } from 'react'

import ColumnsWidthFixator from './ColumnsWidthFixator'
import ControlsList from './ControlsList'
import TitlesList from './TitlesList'

export default class Header extends Component {
  static propTypes = {
    columns: t.arrayOf(t.object).isRequired,
    columnsParams: t.object.isRequired,
    sorting: t.object.isRequired
    // filter: t.shape({
    //   params: t.object.isRequired,
    //   sort: t.shape({
    //     filter: t.string.isRequired,
    //     asc: t.bool.isRequired
    //   }).isRequired
    // }).isRequired
  }

  render () {
    let { columns, columnsParams, sorting } = this.props

    return (
      <thead className={th.Table__Header}>
        <ColumnsWidthFixator columns={columns}/>
        <ControlsList/>
        <TitlesList
          columns={columns}
          columnsParams={columnsParams}
          sorting={sorting}/>
      </thead>
    )
  }
}
