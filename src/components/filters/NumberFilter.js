var ExactFilter = require('./ExactFilter')

class NumberFilter extends ExactFilter {
  render() {

    return (
      <div>
        <input
          type='number'
          value={this.props.query.value}
          onChange={this.handleChange.bind(this)} />
      </div>
    )
  }
}

NumberFilter.propTypes = ExactFilter.propTypes

export default NumberFilter
