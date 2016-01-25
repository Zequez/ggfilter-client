import { Component, PropTypes as t } from 'react'

class LinkColumn extends Component {
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
  text: t.string,
  urlValue: t.any,
  options: t.shape({
    urlTemplate: t.string
  }).isRequired
}

export default LinkColumn
