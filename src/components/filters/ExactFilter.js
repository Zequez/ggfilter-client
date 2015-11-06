class ExactFilter extends React.Component {
  handleChange(ev) {
    var value = ev.target.value
    if (value) {
      this.props.onChange({value: value})
    }
    else if (this.props.query.value) {
      this.props.onChange(null)
    }
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

var t = React.PropTypes
ExactFilter.propTypes = {
  query: t.shape({
    value: t.string
  }).isRequired,
  onChange: t.func.isRequired
}

export default ExactFilter
