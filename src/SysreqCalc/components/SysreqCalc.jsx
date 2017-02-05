import th from '../theme'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, PUSH } from 'redux-little-router'
import { snapTo } from 'shared/lib/utils'
import Api from 'shared/lib/Api'

import { AutoPage } from 'src/Layout'

import Chip from 'shared/components/Chip'
import Button from 'shared/components/Button'

import SuggestionsBox from './SuggestionsBox'
import CalcResult from './CalcResult'
// import CustomAutocomplete from './CustomAutocomplete'

const { setControlParams, setSorting, setControl } = require('src/FilterApp').actions

@connect(() => ({}), {
  setControl: setControl,
  setParam: setControlParams,
  setSort: setSorting,
  puthLocation: (payload) => ({type: PUSH, payload})
})
export default class SysreqCalc extends Component {
  state = {
    games: []
  }

  filterGames = (value) => {
    if (!value) return []

    return Api.games.index({
      filter: JSON.stringify({
        params: {
          name: { value: value },
          sysreq_index_pct: true
        },
        sort: {
          filter: 'name',
          asc: true
        }
      }),
      limit: 8,
      page: 0
    })
    .then(({data: games}) => {
      var ids = this.state.games.map((g) => g.id)
      return games
        .filter((game) => ids.indexOf(game.id) === -1)
        .map((game) => [`${game.name} [${game.sysreq_index_pct}]`, game])
    })
  }

  selectGame = (game) => {
    this.state.games.push(game)
    this.state.games.sort((g1, g2) => g2.sysreq_index_pct - g1.sysreq_index_pct)
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
    this.props.setControl('sysreq_index_pct', true)
    this.props.setParam('sysreq_index_pct', {gt: 0, lt: snapTo(lt, 5)})
    this.props.setSort('sysreq_index_pct', false)
    this.props.puthLocation('/f')
  }

  calculatedValues () {
    let games = this.state.games
    if (!games.length) return {}
    if (games.length === 1) return {mean: games[0].sysreq_index_pct, deviation: 10}

    let values = games.map(g => g.sysreq_index_pct)
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
              <Chip
                key={game.id}
                iconText={game.sysreq_index_pct}
                onRemove={this.removeGame.bind(this, game)}
                className={th.SysreqCalc__Chip}>
                {game.name}
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
          It's <Link href='/about-sysreq'>calculated by an automated algorithm</Link>.
        </p>
        <div className={th.actionBar}>
          <Button
            label='Apply filter'
            disabled={!calcs.mean}
            onClick={this.submitFilter}/>
        </div>
      </AutoPage>
    )
  }
}
