import { Component, PropTypes as t } from 'react'
import { Link } from 'react-router'

var App = require('components/App')

var NavTabs =        require('components/NavTabs')
var DataTable =      require('components/DataTable')
var GamesLoader =    require('components/GamesLoader')
var Lightbox =       require('components/Lightbox')

var FiltersToggles = require('components/tabs/FiltersToggles')
var SourcesTab     = require('components/tabs/SourcesTab')
var SysreqCalc     = require('components/tabs/SysreqCalc')

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
            <ul className='nav-tabs'>
              <li>
                <Link to='/share' activeClassName='active'>
                  <i className='fa icon-share'></i>
                </Link>
              </li>
              <li>
                <Link to='/columns' activeClassName='active'>Columns</Link>
              </li>
              <li>
                <Link to='/system-requirements' activeClassName='active'>Sysreq Calculator</Link>
              </li>
              {/*<li className=''><a href='/popular-filters'>Popular Filters</a></li>*/}
              {/*<li className=''><a href='/email-alerts'>Email Alerts</a></li>*/}
              <li>
                <Link to='/sources' activeClassName='active'>Sources</Link>
              </li>
              {/*<li className=''><a href='/feedback'>Feedback</a></li>*/}
              {/*<li className=''><a href='/sponsor'>Sponsor</a></li>*/}
            </ul>
          </nav>
          {this.props.children}
        </main>
      </div>
    )
  }
}
