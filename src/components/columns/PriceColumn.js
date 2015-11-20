export default class PriceColumn extends React.Component {
  static propTypes = {
    price: React.PropTypes.number.isRequired,
    was: React.PropTypes.number
  }

  elem (val, className) {
    return (val != null ?
      <span className={className}>
        {val > 0 ? <span><span className='text-deco'>$</span>{val/100}</span> : 'Free'}
      </span>
    : null)
  }

  render () {
    return (
      <span>
        {this.elem(this.props.was, 'price-was')}
        {this.elem(this.props.price, 'price-is')}
      </span>
    )
  }
}
