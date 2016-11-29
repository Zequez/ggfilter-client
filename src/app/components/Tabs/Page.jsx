import th from './theme'
import contentTh from '../content.sass'
import React from 'react'
import cn from 'classnames'

import AppBar from './AppBar'

const Page = ({onClickMenu, card, bigHeader, textContent, Title, className, children, barClass, bodyClass}) => {
  let pageClass = cn(th.page, className, {
    [th.cardPage]: card
  })

  let finalBodyClass = cn(th.appBody, bodyClass, {
    [contentTh.content]: textContent
  })

  let appBarClass = cn(barClass, {
    [th.bigHeader]: bigHeader
  })

  return (
    <div className={pageClass}>
      <AppBar onClickMenu={onClickMenu} className={appBarClass}>
        {typeof Title === 'string' ? <h1>{Title}</h1> : <Title/>}
      </AppBar>
      <div className={finalBodyClass}>
        {children}
      </div>
    </div>
  )
}

export default Page
