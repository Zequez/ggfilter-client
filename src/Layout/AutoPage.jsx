import th from './Layout.sass'
import React, { PropTypes as t, Component } from 'react'
import cx from 'classnames'

import thContent from 'shared/style/utils/content'

import Page from './Page'
import AppBar from './AppBar'

export default class AutoPage extends Component {
  // static propTypes = {
  //   title: t.string,
  //   className: t.string,

  //   bigHeader: t.bool,
  //   card: t.bool,
  //   textContent: t.bool,

  //   children: t.node.isRequired
  // }

  render () {
    const { title, card, naked, textContent, children, className } = this.props

    const finalClassName = cx(className, {
      [th.Layout__Page_card]: card,
      [th.Layout__Page_naked]: naked,
      [thContent.content]: textContent
    })

    return (
      <Page className={finalClassName}>
        <AppBar><h1>{title}</h1></AppBar>
        <div className={th.Layout__PageBody}>
          {children}
        </div>
      </Page>
    )
  }
}
