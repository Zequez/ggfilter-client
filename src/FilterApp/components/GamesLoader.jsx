import th from './GamesLoader.sass'
import React, { Component, PropTypes as t } from 'react'
import Button from 'shared/components/Button'

import classNames from 'classnames'

export default class GamesLoader extends Component {
  static propTypes = {
    fetching: t.bool.isRequired,
    failed: t.bool.isRequired,
    lastPage: t.bool.isRequired,
    onRequestMore: t.func.isRequired,
    loadedGames: t.number,
    totalGames: t.number
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
    let { fetching, failed, lastPage, loadedGames, totalGames } = this.props

    let divClass = classNames(th.GamesLoader, {
      [th.GamesLoader_fetching]: fetching,
      [th.GamesLoader_failed]: failed,
      [th.GamesLoader_lastPage]: lastPage
    })

    return (
      <div
        ref='el'
        className={divClass}
        onClick={this.handleClick.bind(this)}>
        <span className={th.GamesLoader__label}>
          <Button>Load more games ({loadedGames}/{totalGames})</Button>
        </span>
      </div>
    )
  }
}
