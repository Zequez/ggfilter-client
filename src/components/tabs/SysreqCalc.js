import { setQueryFilter } from 'stores/actions'
import { snapTo } from 'lib/utils'
var gamesFetcher = require('sources/gamesFetcher')
var SuggestionsBox = require('components/utils/SuggestionsBox')
var connect = require('react-redux').connect
var t = React.PropTypes

class SysreqCalc extends React.Component {
  // static propTypes = {
  //   query: t.string.isRequired,
  //   result: t.arrayOf(t.shape({
  //     name: t.string.isRequired,
  //     sysreq_index_centile: t.number.isRequired,
  //   })).isRequired
  // }

  state = {
    games: []
  }

  filterGames = (value)=>{
    return gamesFetcher(
      ['name', 'sysreq_index_centile'],
      {
        filters: {
          name: { value: value }
        },
        sort: 'name',
        sort_asc: true,
        batchSize: 5
      },
      0
    )
    .then((games)=>{
      var ids = this.state.games.map((g)=> g.id)
      return games
        .filter((game)=> ids.indexOf(game.id) === -1)
        .map((game)=> [game.name, game])
    })
  }

  selectGame = (game)=>{
    this.state.games.push(game)
    this.state.games.sort((g1, g2)=> g1.sysreq_index_centile - g2.sysreq_index_centile)
    this.setState({games: this.state.games})
    this.refs.box.clean()
    this.submitFilter()
  }

  removeGame = (game)=>{
    this.state.games.splice(this.state.games.indexOf(game), 1)
    this.setState({games: this.state.games})
    this.submitFilter()
  }

  submitFilter () {
    let calcs = this.calculatedValues()
    if (!calcs.mean) return
    let gt = Math.max(0, calcs.mean - calcs.deviation)
    let lt = Math.min(100, calcs.mean + calcs.deviation)
    this.props.dispatch(setQueryFilter('sysreq_index_centile', {gt: snapTo(gt, 5), lt: snapTo(lt, 5)}))
  }

  calculatedValues () {
    let games = this.state.games
    if (!games.length) return {}
    if (games.length === 1) return {mean: games[0].sysreq_index_centile, deviation: 10}

    let values = games.map(g => g.sysreq_index_centile)
    let len = values.length
    let sum = values.reduce((a, b)=> a+b, 0)
    let mean = sum / len
    let squaredDistanceFromTheMean = values.map((a)=> (mean-a)*(mean-a))
    let variance = squaredDistanceFromTheMean.reduce((a, b)=> a+b, 0) / len
    let deviation = Math.sqrt(variance)

    return {
      mean: Math.round(mean),
      deviation: Math.round(deviation)
    }
  }

  render() {
    let calcs = this.calculatedValues()

    return (
      <div className='sysreq-calc'>
        <p>
        The System Requirements Index is a very coarse number
        that we are working on improving. To find more about
        how is calculated, visit the <a href='/sources'>sources</a> tab.
        </p>
        <SuggestionsBox
          ref='box'
          filter={this.filterGames}
          onSelect={this.selectGame}
          placeholder='Type the most resource-intensive games your computer can run'/>
        <ul className='sysreq-calc-games-list'>
          {this.state.games.map((game, i)=>{
            return (
              <li key={i} className='sysreq-calc-game'>
                <div className='sysreq-calc-game-name'>{game.name}</div>
                <div className='sysreq-calc-game-separator'></div>
                <div className='sysreq-calc-game-value'>{game.sysreq_index_centile}</div>
              </li>
            )
          })}
        </ul>
        <div className='sysreq-calc-result'>
          <div className='sysreq-calc-result-title'>Your Sysreq index:</div>
          <div className='sysreq-calc-result-value'>
            {calcs.mean ? <span className='sysreq-calc-result-value-mean'>{calcs.mean}</span> : '-'}
            {calcs.deviation ? <span className='sysreq-calc-result-value-deviation'> ± {calcs.deviation}</span> : ''}
          </div>
        </div>
      </div>
    )
  }
}

export default connect()(SysreqCalc)
