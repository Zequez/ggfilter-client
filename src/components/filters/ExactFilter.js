class ExactFilter extends React.Component {
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

var t = React.PropTypes
ExactFilter.propTypes = {
  query: t.shape({
    value: t.string
  }).isRequired,
  onChange: t.func.isRequired
}

export default ExactFilter
