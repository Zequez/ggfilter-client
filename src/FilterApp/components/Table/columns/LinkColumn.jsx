import th from './columns.sass'
import React, { Component, PropTypes as t } from 'react'

import Icon from 'shared/components/Icon'

export default class LinkColumn extends Component {
  static propTypes = {
    text: t.string,
    urls: t.object
  }

  render () {
    let { text, urls } = this.props
    let storesNames = Object.keys(urls)
    let mainLinkStore = storesNames.shift()

    return (
      <span className={th.LinkColumn}>
        <a href={urls[mainLinkStore]}>
          {text}
        </a>
        {storesNames.map((name) =>
          <a href={urls[name]} key={name}>
            <Icon icon={`store-${name}`}/>
          </a>
        )}
      </span>
    )
  }
}
