import React, { Component, PropTypes as t } from 'react'

import { FilterTitle } from 'src/FilterApp'
import Link from 'shared/components/RouterLink'

export default class Layout extends Component {
  static propTypes = {
    clickOnLogo: t.func.isRequired
  }

  clickOnLogo (ev) {
    ev.preventDefault()
    this.props.clickOnLogo()
  }

  render () {
    console.logRender('Layout')

    let className = 'container'
    if (this.props.className) className += ' ' + this.props.className

    let currentYear = new Date().getFullYear()

    return (
      <div className={className}>
        <header className='header'>
          <a className='logo' title="The Good Game Filter" href='/' onClick={::this.clickOnLogo}>
            <strong>GG</strong>Filter
            <i className='fa icon-filter'></i>
            <span className='logo-semicolons'>:</span>
          </a>
          <FilterTitle/>
        </header>
        <main className='main'>
          {this.props.children}
        </main>
        <footer className='footer'>
          <span>
            &copy; <Link to='root'>GGFilters</Link> {currentYear}
          </span>
          <Link to='sources'>Data Sources</Link>
          <Link to='tos'>Terms</Link>
          <Link to='help'>Help</Link>
          <Link to='about'>About</Link>
          <Link to='contact'>Contact</Link>
        </footer>
      </div>
    )
  }
}
