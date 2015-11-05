var { Component, PropTypes } = React
var connect = require('react-redux').connect

import { setQueryFilter, removeQueryFilter } from 'stores/actions'

class ExactFilter extends Component {
  handleChange(ev) {
    console.log(setQueryFilter(this.props.filter.name, true, false, {
      value: ev.target.value
    }))

    if (ev.target.value) {
      this.props.dispatch(setQueryFilter(this.props.filter.name, true, false, {
        value: ev.target.value
      }))
    }
    else {
      this.props.dispatch(removeQueryFilter(this.props.filter.name))
    }
  }

  render() {
    return (
      <input
        type='text'
        value={this.props.query.value}
        onChange={this.handleChange.bind(this)} />
    )
  }
}

ExactFilter.propTypes = {
  filter: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired,
  query: PropTypes.shape({
    value: PropTypes.string,
    filter: PropTypes.bool,
    highlight: PropTypes.bool
  }).isRequired
}

export default connect()(ExactFilter)
