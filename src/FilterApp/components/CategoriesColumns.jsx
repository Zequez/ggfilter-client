import React, { PropTypes as t, Component } from 'react'
import { connect } from 'react-redux'
import definitions from '../lib/definitions'
import categoriesDefinitions from '../config/categoriesDefinitions'

const {
  selectors: { visibleFiltersSelector },
  actions: { setParam }
} = require('../filter')

import CategoriesColumnsList from './CategoriesColumnsList'

@connect((s) => ({visibleFilters: visibleFiltersSelector(s)}), { setParam })
export default class CategoriesColumns extends Component {
  static propTypes = {
    visibleFilters: t.arrayOf(t.string).isRequired,
    setParam: t.func.isRequired
  }

  render () {
    let { visibleFilters, setParam } = this.props

    return (
      <tr className='categories-columns'>
        {definitions.categoriesList.map((cat) => (
          <CategoriesColumnsList
            key={cat.name}
            title={cat.title}
            slug={cat.name}
            filters={definitions.categoriesWithFilters[cat.name]}
            visibleFilters={visibleFilters}
            onToggle={setParam}/>
        ))}
      </tr>
    )
  }
}
