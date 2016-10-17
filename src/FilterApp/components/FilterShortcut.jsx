import React, { PropTypes as t, Component } from 'react'
import { connect } from 'react-redux'
import { objectMatchesExtension as ome } from 'shared/lib/utils'
import { setShortcut } from '../filter/reducer'
import { filterSelector } from '../filter/selectors'

@connect((s) => ({ currentFilter: filterSelector(s) }), { setShortcut })
export default class FilterShortcut extends Component {
  static propTypes = {
    children: t.string,
    shortcut: t.object.isRequired,
    setShortcut: t.func.isRequired,
    currentFilter: t.object.isRequired
  }

  applyShortcut = () => {
    this.props.setShortcut(this.props.shortcut)
  }

  render () {
    let { shortcut, currentFilter, children } = this.props

    console.log(currentFilter, shortcut)
    let active =
      ome(currentFilter, shortcut)
      ? 'active' : ''

    return (
      <li className='filter-shortcut'>
        <a className={`btn ${active}`} onClick={::this.applyShortcut}>
          {children}
        </a>
      </li>
    )
  }
}
