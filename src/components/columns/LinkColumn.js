class LinkColumn extends React.Component {
  render() {
    var url = this.props.options.urlTemplate.replace('%s', this.props.urlValue)
    return (
      <a
        href={url}
        className='hover-hidden-column'>
        {this.props.text}
      </a>
    )
  }
}

LinkColumn.propTypes = {
  text: React.PropTypes.string,
  urlValue: React.PropTypes.any,
  options: React.PropTypes.shape({
    urlTemplate: React.PropTypes.string
  }).isRequired
}

export default LinkColumn
