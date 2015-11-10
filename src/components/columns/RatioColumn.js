class RatioColumn extends React.Component {
  render() {
    var ratio = this.props.value
    if (!ratio) {
      let up = this.props.up,
          down = this.props.down,
          total = up + down
      ratio = Math.floor(up/total*100)
    }

    var upStyle = {
      width: `${ratio}%`
    }
    var downStyle = {
      width: `${100-ratio}%`
    }

    return (
      <div className='ratio-column'>
        <div className='ratio-column-up' style={upStyle}></div>
        <div className='ratio-column-down' style={downStyle}></div>
      </div>
    )
  }
}

RatioColumn.propTypes = {
  up: React.PropTypes.number,
  down: React.PropTypes.number,
  value: React.PropTypes.number
}

export default RatioColumn
