import th from './theme'
import React, { PropTypes as t, Component } from 'react'
import cn from 'classnames'
import Toggle from './Toggle'

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
        <Toggle
          key={filter.name}
          active={!!active}
          name={filter.name}
          title={filter.title}
          onToggle={this.props.onToggle}/>
      )
    })

    // Ensure that the length is proportional to the icons count
    let flexStyle = {
      flexGrow: toggles.length,
      width: toggles.length * 24
    }

    let className = cn(th.category, th['category-' + slug])
    return (
      <li className={className} ref='th' style={flexStyle}>
        <div className={th.title} onClick={this.onClickTitle}>{title}</div>
        <ul className={th.togglesList}>
          {toggles}
        </ul>
      </li>
    )
  }
}
