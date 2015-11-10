class PriceColumn extends React.Component {
  render() {
    // if (this.props.was) {
    //     <span className='strike'>{this.props.was}</span>
    // }

    return (
      <span>
        {this.props.was ? <span className='price-was'>{'$' + this.props.was/100}</span> : ''}
        <span className="price-is">{'$' + this.props.price/100}</span>
      </span>
    )
  }
}

PriceColumn.propTypes = {
  price: React.PropTypes.number.isRequired,
  was: React.PropTypes.number
}

export default PriceColumn
