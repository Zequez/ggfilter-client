import th from './CategoriesList.sass'
import React, { PropTypes as t, Component } from 'react'
import { connect } from 'react-redux'
import definitions from '../../lib/definitions'

const {
  selectors: { controlsList },
  actions: { setControl }
} = require('../../filter')

import Category from './Category'

@connect((s) => ({controlsList: controlsList(s)}), { setControl })
export default class CategoriesList extends Component {
  static propTypes = {
    controlsList: t.arrayOf(t.string).isRequired,
    setControl: t.func.isRequired
  }

  render () {
    let { controlsList, setControl } = this.props

    return (
      <ul className={th.CategoriesList}>
        {definitions.categoriesList.map((cat) => (
          <Category
            key={cat.name}
            title={cat.title}
            slug={cat.name}
            definedControls={definitions.categoriesWithFilters[cat.name]}
            visibleControls={controlsList}
            onToggle={setControl}/>
        ))}
      </ul>
    )
  }
}
