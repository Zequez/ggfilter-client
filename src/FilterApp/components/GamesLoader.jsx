import React, { Component, PropTypes as t } from 'react'

import classNames from 'classnames'
// const debounce = require('shared/lib/utils').debounce

export default class GamesLoader extends Component {
  static propTypes = {
    fetching: t.bool.isRequired,
    failed: t.bool.isRequired,
    lastPage: t.bool.isRequired,
    onRequestMore: t.func.isRequired
  }

  componentDidMount () {
    // window.addEventListener('scroll', debounce(50, this.handleWindowScroll.bind(this)))
  }

  offsetTopDocument () {
    let el = this.refs.el
    let offset = 0
    while (el) {
      offset += el.offsetTop
      el = el.offsetParent
    }
    return offset
  }

  handleWindowScroll () {
    var clientHeight = window.innerHeight
    var scrollTop = window.scrollY
    var offsetTop = this.offsetTopDocument()
    var position = clientHeight + scrollTop
    var diff = offsetTop - position

    if (diff < 100) {
      this.requestMoreGames()
    }
  }

  handleClick (ev) {
    this.requestMoreGames()
  }

  requestMoreGames () {
    if (!this.props.fetching) {
      this.props.onRequestMore()
    }
  }

  render () {
    console.logRender('GamesLoader')
    let { fetching, failed, lastPage } = this.props

    let divClass = classNames('games-loader', {
      'games-loader-fetching': fetching,
      'games-loader-failed': failed,
      'games-loader-lastpage': lastPage
    })

    return (
      <div
        ref='el'
        className={divClass}
        onClick={this.handleClick.bind(this)}>
        <i className='fa icon-load-more-left'></i>
        <span className='games-loader-label'>Load more games</span>
        <i className='fa icon-load-more-right'></i>
      </div>
    )
  }
}
