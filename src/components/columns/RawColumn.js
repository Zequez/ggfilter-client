class RawColumn extends React.Component {
  render() {
    return (
      <span>{this.props.value}</span>
    )
  }
}

RawColumn.propTypes = {
  value: React.PropTypes.any
}

export default RawColumn
