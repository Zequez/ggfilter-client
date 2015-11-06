class SteamReviewsColumn extends React.Component {
  render() {
    return (
      <span>{this.props.up}/{this.props.down}</span>
    )
  }
}

SteamReviewsColumn.propTypes = {
  up: React.PropTypes.number.isRequired,
  down: React.PropTypes.number.isRequired
}

export default SteamReviewsColumn
