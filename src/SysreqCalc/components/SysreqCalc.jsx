import th from '../theme'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { snapTo } from 'shared/lib/utils'
import { getGames } from 'shared/lib/api'
import { MODES, setMode } from 'shared/reducers/uiReducer'

import Link from 'shared/components/RouterLink'
import { AutoPage } from 'src/Layout'

import Chip from 'react-toolbox/lib/chip'
import { Button } from 'react-toolbox/lib/button'

import SuggestionsBox from './SuggestionsBox'
import CalcResult from './CalcResult'
// import CustomAutocomplete from './CustomAutocomplete'

const { setParam, setSort } = require('src/FilterApp').actions

@connect(() => ({}), {
  setParam,
  setSort,
  setMode
})
export default class SysreqCalc extends Component {
  state = {
    games: []
  }

  filterGames = (value) => {
    if (!value) return []

    return getGames({
      filter: JSON.stringify({
        params: {
          name: { value: value },
          sysreq_index_centile: true
        },
        sort: {
          filter: 'name',
          asc: true
        }
      }),
      limit: 8,
      page: 0
    })
    .then((response) => {
      let games = response.data
      var ids = this.state.games.map((g) => g.id)
      return games
        .filter((game) => ids.indexOf(game.id) === -1)
        .map((game) => [`${game.name} [${game.sysreq_index_centile}]`, game])
    })
  }

  selectGame = (game) => {
    this.state.games.push(game)
    this.state.games.sort((g1, g2) => g2.sysreq_index_centile - g1.sysreq_index_centile)
    this.setState({games: this.state.games})
    this.refs.box.clean()
  }

  removeGame = (game) => {
    this.state.games.splice(this.state.games.indexOf(game), 1)
    this.setState({games: this.state.games})
  }

  submitFilter = () => {
    let calcs = this.calculatedValues()
    if (!calcs.mean) return
    let lt = Math.min(100, calcs.mean + calcs.deviation)
    this.props.setParam('sysreq_index_centile', {gt: 0, lt: snapTo(lt, 5)})
    this.props.setSort('sysreq_index_centile', false)
    this.props.setMode(MODES.filter)
  }

  calculatedValues () {
    let games = this.state.games
    if (!games.length) return {}
    if (games.length === 1) return {mean: games[0].sysreq_index_centile, deviation: 10}

    let values = games.map(g => g.sysreq_index_centile)
    let len = values.length
    let sum = values.reduce((a, b) => a + b, 0)
    let mean = sum / len
    let squaredDistanceFromTheMean = values.map((a) => (mean - a) * (mean - a))
    let variance = squaredDistanceFromTheMean.reduce((a, b) => a + b, 0) / len
    let deviation = Math.sqrt(variance)

    return {
      mean: Math.round(mean),
      deviation: Math.round(deviation)
    }
  }

  handleChange = (value) => {
    this.setState({ggames: value})
  }

  render () {
    let calcs = this.calculatedValues()
    let { games } = this.state

    return (
      <AutoPage className={th.sysreqCalc} card title='System Requirements Calculator'>
        <SuggestionsBox
          ref='box'
          filter={this.filterGames}
          onSelect={this.selectGame}
          placeholder='Type the most resource-intensive games your computer can run'/>
        {games.length ? (
          <div className={th.chips}>
            {games.map((game, i) => (
              <Chip key={game.id} deletable onDeleteClick={this.removeGame.bind(this, game)}>
                {`${game.name} [${game.sysreq_index_centile}]`}
              </Chip>
            ))}
          </div>
        ) : null}
        {calcs.mean ? (
          <CalcResult mean={calcs.mean} deviation={calcs.deviation}/>
        ) : null}
        <p className={th.info}>
          The System Requirements Index is a very coarse number
          that we are working on improving.
          It's <Link to='aboutSysreq'>calculated by an automated algorithm</Link>.
        </p>
        <div className={th.actionBar}>
          <Button label='Apply filter' raised primary accent
            disabled={!calcs.mean}
            onClick={this.submitFilter}/>
        </div>
      </AutoPage>
    )
  }
}
