var { Component, PropTypes } = React

class SteamReviewsColumn extends Component {
  render() {
    var positive = this.props.game.positive_steam_reviews_count
    var negative = this.props.game.negative_steam_reviews_count
    return (
      <span>{positive}/{negative}</span>
    )
  }
}

SteamReviewsColumn.columns = ['positive_steam_reviews_count', 'negative_steam_reviews_count']

SteamReviewsColumn.propTypes = {
  game: PropTypes.object.isRequired
}

export default SteamReviewsColumn
