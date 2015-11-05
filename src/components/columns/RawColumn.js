var { Component, PropTypes } = React

class RawColumn extends Component {
  render() {
    return (
      <span>{this.props.game[this.props.name]}</span>
    )
  }
}

RawColumn.columns = function(filter) {
  return filter
}

RawColumn.propTypes = {
  game: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired
}

export default RawColumn
