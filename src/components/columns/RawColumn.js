export default class RawColumn extends React.Component {
  static propTypes = {
    value: React.PropTypes.any,
    options: React.PropTypes.shape({
      interpolation: React.PropTypes.string,
      round: React.PropTypes.number
    })
  }

  render () {
    var interp = this.props.options.interpolation
    var round = this.props.options.round

    let d1 = null
    let v = this.props.value
    let d2 = null
    if (v) {
      if (round) v = Math.floor(v*round)/round
      if (interp) [d1, d2] = interp.split('%s')
    } else {
      v = '-'
    }

    return (
      <span>
        {d1 ? <span className='text-deco'>{p1}</span> : null}
        {v}
        {d2 ? <span className='text-deco'>{d2}</span> : null}
      </span>
    )
  }
}
