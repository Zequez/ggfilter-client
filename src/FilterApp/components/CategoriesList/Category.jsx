import th from './CategoriesList.sass'
import { flex } from 'src/style'

import React, { PropTypes as t, Component } from 'react'
import cn from 'classnames'
import TooltipRippledToggle from './TooltipRippledToggle'

export default class Category extends Component {
  static propTypes = {
    title: t.string.isRequired,
    slug: t.string.isRequired,
    definedControls: t.arrayOf(t.object).isRequired,
    visibleControls: t.arrayOf(t.string).isRequired,
    onToggle: t.func.isRequired
  }

  render () {
    let { title, slug, definedControls, visibleControls } = this.props

    let toggles = []
    definedControls.map((control) => {
      let active = ~visibleControls.indexOf(control.name)
      toggles.push(
        <TooltipRippledToggle
          key={control.name}
          active={!!active}
          name={control.name}
          title={control.longTitle || control.title}
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
