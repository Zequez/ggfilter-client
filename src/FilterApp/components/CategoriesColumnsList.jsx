import React, { PropTypes as t, Component } from 'react'
import CategoriesColumnsListToggle from './CategoriesColumnsListToggle'

export default class CategoriesColumnsList extends Component {
  static propTypes = {
    title: t.string.isRequired,
    slug: t.string.isRequired,
    filters: t.arrayOf(t.object).isRequired,
    visibleFilters: t.arrayOf(t.string).isRequired,
    onToggle: t.func.isRequired
  }

  state = {
    open: false
  }

  toggle = () => {
    this.setState({open: !this.state.open})
  }

  render () {
    let { title, slug, filters, visibleFilters } = this.props
    let { open } = this.state

    let countVisibleFilters = 0
    let toggles = []
    filters.map((filter) => {
      let active = ~visibleFilters.indexOf(filter.name)
      if (active) ++countVisibleFilters
      if (open) {
        toggles.push(
          <CategoriesColumnsListToggle
            key={filter.name}
            active={active}
            name={filter.name}
            title={filter.title}
            onToggle={this.props.onToggle}/>
        )
      }
    })

    return (
      <th colSpan={countVisibleFilters} className={`categories-columns-${slug}`}>
        <div className='category-title' onClick={this.toggle}>{title}</div>
        {open ? (
          <ul className='category-items'>
            {toggles}
          </ul>
        ) : null}
      </th>
    )
  }
}
