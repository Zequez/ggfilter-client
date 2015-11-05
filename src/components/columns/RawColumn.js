var { Component, PropTypes } = React

class RawColumn extends Component {
  render() {
    return (
      <span>Hello</span>
    )
  }
}

RawColumn.columns = function(filter) {
  return filter.name
}

export default RawColumn
