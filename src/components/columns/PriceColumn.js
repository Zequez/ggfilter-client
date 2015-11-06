class PriceColumn extends React.Component {
  render() {
    return (
      <span>${this.props.price/100}</span>
    )
  }
}

PriceColumn.propTypes = {
  price: React.PropTypes.number.isRequired,
  was: React.PropTypes.number
}

export default PriceColumn
