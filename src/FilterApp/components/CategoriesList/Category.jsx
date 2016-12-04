import th from './CategoriesList.sass'
import { flex } from 'src/style'

import React, { PropTypes as t, Component } from 'react'
import cn from 'classnames'
import TooltipRippledToggle from './TooltipRippledToggle'

export default class Category extends Component {
  static propTypes = {
    title: t.string.isRequired,
    slug: t.string.isRequired,
    filters: t.arrayOf(t.object).isRequired,
    visibleFilters: t.arrayOf(t.string).isRequired,
    onToggle: t.func.isRequired
  }

  render () {
    let { title, slug, filters, visibleFilters } = this.props

    let toggles = []
    filters.map((filter) => {
      let active = ~visibleFilters.indexOf(filter.name)
      toggles.push(
        <TooltipRippledToggle
          key={filter.name}
          active={!!active}
          name={filter.name}
          title={filter.title}
          onToggle={this.props.onToggle}/>
      )
    })

    let className = cn(
      th.CategoriesList__Category,
      th['CategoriesList__Category_' + slug],
      flex['flex-' + toggles.length]
    )

    return (
      <li className={className}>
        <div className={th.CategoriesList__Title} onClick={this.onClickTitle}>
          {title}
        </div>
        <ul className={th.CategoriesList__TogglesList}>
          {toggles}
        </ul>
      </li>
    )
  }
}
