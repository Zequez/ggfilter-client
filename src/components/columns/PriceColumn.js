class PriceColumn extends React.Component {
  priceText(price) {
    if (price != null) {
      if (price > 0) {
        return '$' + price/100
      }
      else {
        return 'Free'
      }
    }
    else {
      return null
    }
  }

  render() {
    var wasE
    if (this.props.was) {
      let was = this.priceText(this.props.was)
      wasE = <span className='price-was'>{was}</span>
    }

    var is = this.priceText(this.props.price)
    var isE = <span className="price-is">{is}</span>

    return (
      <span>
        {wasE}
        {isE}
      </span>
    )
  }
}

PriceColumn.propTypes = {
  price: React.PropTypes.number.isRequired,
  was: React.PropTypes.number
}

export default PriceColumn
