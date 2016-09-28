import React, { Component } from 'react'

import NavTabs from 'components/NavTabs'
import FilterTitle from 'components/FilterTitle'

export default class Layout extends Component {
  render () {
    console.logRender('Layout')

    let className = 'container'
    if (this.props.className) className += ' ' + this.props.className

    return (
      <div className={className}>
        <header className='header'>
          <a className='logo' title="The Good Game Filter" href='/'>
            <strong>GG</strong>Filter
            <i className='fa icon-filter'></i>
            <span className='logo-semicolons'>:</span>
          </a>
          <FilterTitle/>
        </header>
        <main className='main'>
          <nav className='nav'>
            <NavTabs/>
          </nav>
          {this.props.children}
        </main>
      </div>
    )
  }
}
