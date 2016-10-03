import React, { Component, PropTypes as t } from 'react'

import NavTabs from 'components/NavTabs'
import FilterTitle from 'components/FilterTitle'

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
          <nav className='general-nav'>
            <ul>
              <li>
                <a href=''>
                  Filter <i className='fa icon-unlock' title='Lock filtering table into view'></i>
                </a>
              </li>
              <li>
                <a href='/system-requirements-calculator' className='active'>
                  System Requirements Calculator
                </a>
              </li>
              <li>
                <a href='/interesting-filters'>
                  Interesting Filters
                </a>
              </li>
              <li>
                <a href='/feedback'>
                  Feedback
                </a>
              </li>
              <li>
                <a href='/contribute'>
                  Contribute
                </a>
              </li>
              <li>
                <a href='/users/login'>
                  Log In
                </a>
              </li>
            </ul>
          </nav>
          <nav className='nav'>
            <NavTabs/>
          </nav>
          {this.props.children}
        </main>
      </div>
    )
  }
}
