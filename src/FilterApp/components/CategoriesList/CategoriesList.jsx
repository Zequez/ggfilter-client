import th from './theme'
import React, { PropTypes as t, Component } from 'react'
import { connect } from 'react-redux'
import definitions from '../../lib/definitions'

const {
  selectors: { visibleFiltersSelector },
  actions: { setParam }
} = require('../../filter')

import Category from './Category'

@connect((s) => ({visibleFilters: visibleFiltersSelector(s)}), { setParam })
export default class CategoriesList extends Component {
  static propTypes = {
    visibleFilters: t.arrayOf(t.string).isRequired,
    setParam: t.func.isRequired
  }

  render () {
    let { visibleFilters, setParam } = this.props

    return (
      <ul className={th.categoriesList}>
        {definitions.categoriesList.map((cat) => (
          <Category
            key={cat.name}
            title={cat.title}
            slug={cat.name}
            filters={definitions.categoriesWithFilters[cat.name]}
            visibleFilters={visibleFilters}
            onToggle={setParam}/>
        ))}
      </ul>
    )
  }
}
