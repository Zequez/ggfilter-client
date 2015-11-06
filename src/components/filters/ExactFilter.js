var { Component, PropTypes } = React

class ExactFilter extends Component {
  handleChange(ev) {
    var value = ev.target.value
    this.props.onChange(value ? {value: value} : null)
  }

  render() {
    return (
      <div>
        <input
          type='text'
          value={this.props.query.value}
          onChange={this.handleChange.bind(this)} />
      </div>
    )
  }
}

ExactFilter.propTypes = {
  query: PropTypes.shape({
    value: PropTypes.string
  }).isRequired,
  onChange: PropTypes.func.isRequired
}

export default ExactFilter
