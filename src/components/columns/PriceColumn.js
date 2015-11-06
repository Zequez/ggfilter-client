class PriceColumn extends React.Component {
  render() {
    // if (this.props.was) {
    //     <span className='strike'>{this.props.was}</span>
    // }

    return (
      <span>
        {this.props.was ? <span className='strike'>${this.props.was}</span> : ''}
        ${this.props.price/100}
      </span>
    )
  }
}

PriceColumn.propTypes = {
  price: React.PropTypes.number.isRequired,
  was: React.PropTypes.number
}

export default PriceColumn
