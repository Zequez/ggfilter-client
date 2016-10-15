import React, { Component, PropTypes as t } from 'react'

import { FilterTitle } from 'src/FilterApp'

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
            &copy; <a href='/'>GGFilters</a> {currentYear}
          </span>
          <a href='/sources'>Data Sources</a>
          <a href='/tos'>Terms</a>
          <a href='/help'>Help</a>
          <a href='/about'>About</a>
          <a href='/contact'>Contact</a>
        </footer>
      </div>
    )
  }
}
