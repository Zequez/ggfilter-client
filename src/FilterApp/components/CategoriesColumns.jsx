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

  categoriesWithFilters = {}
  componentWillMount () {
    for (let title in categoriesDefinitions) {
      this.categoriesWithFilters[title] = this.categoriesWithFilters[title] || []
      this.categoriesWithFilters[title] =
        categoriesDefinitions[title].map((name) => definitions.filters[name])
    }
  }

  render () {
    let { visibleFilters, setParam } = this.props

    let lists = []
    for (let title in this.categoriesWithFilters) {
      let slug = title.toLowerCase().replace(/ /g, '-')
      let filters = this.categoriesWithFilters[title]
      lists.push(
        <CategoriesColumnsList
          key={slug}
          title={title}
          slug={slug}
          filters={filters}
          visibleFilters={visibleFilters}
          onToggle={setParam}/>
      )
    }

    return (
      <tr className='categories-columns'>
        {lists}
      </tr>
    )
  }
}
