class RawColumn extends React.Component {
  render() {
    var interp = this.props.options.interpolation
    var round = this.props.options.round

    var v = this.props.value
    if (v) {
      if (round) v = Math.floor(v*round)/round
      if (interp) v = interp.replace('%s', v)
    }
    else {
      v = '-'
    }

    return (
      <span>{v}</span>
    )
  }
}

RawColumn.propTypes = {
  value: React.PropTypes.any,
  options: React.PropTypes.shape({
    interpolation: React.PropTypes.string,
    round: React.PropTypes.number
  })
}

export default RawColumn
