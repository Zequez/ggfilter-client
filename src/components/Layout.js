import React, { Component, PropTypes as t } from 'react'

const App     = require('components/App')
const NavTabs = require('components/NavTabs')

export default class Layout extends Component {
  render () {
    console.info('Render <Layout/>')

    return (
      <div className='container'>
        <header className='header'>
          <div className='logo' title="The Good Game Filter">
            GGFilter
          </div>
          <div className='slogan' title="We have no proof whatsoever of this claim, but we really aspire to!">
            The Internet's Nº1 source to find good games, <em>allegedly</em>
          </div>
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
