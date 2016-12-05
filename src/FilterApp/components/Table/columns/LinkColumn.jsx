import th from './columns.sass'
import React, { Component, PropTypes as t } from 'react'

export default class LinkColumn extends Component {
  static propTypes = {
    text: t.string,
    urlValue: t.any,
    options: t.shape({
      urlTemplate: t.string
    }).isRequired
  }

  render () {
    var url = this.props.options.urlTemplate.replace('%s', this.props.urlValue)
    return (
      <a
        href={url}
        className={th.LinkColumn}>
        {this.props.text}
      </a>
    )
  }
}
