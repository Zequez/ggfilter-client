import th from './GamesLoader.sass'
import React, { Component, PropTypes as t } from 'react'
import Button from 'shared/components/Button'

export default class GamesLoader extends Component {
  static propTypes = {
    failed: t.bool.isRequired,
    fetching: t.bool.isRequired,
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
    let { failed, fetching, loadedGames, totalGames } = this.props
    let lastPage = totalGames === loadedGames

    let el = null
    if (failed) {
      el = 'Failed to load games'
    } else if (lastPage) {
      el = `All ${totalGames} games loaded`
    } else if (fetching) {
      el = 'Fetching...'
    } else {
      el = (
        <Button disabled={fetching}>
          Load more games ({loadedGames}/{totalGames})
        </Button>
      )
    }

    return (
      <div
        ref='el'
        className={th.GamesLoader}
        onClick={this.handleClick.bind(this)}>
        <span className={th.GamesLoader__label}>
          { el }
        </span>
      </div>
    )
  }
}
