import th from './theme'
import contentTh from '../content.sass'

import React from 'react'
import cn from 'classnames'

const AppBody = ({children, card}) => {
  let classNames = cn(th.appBody, {
    [th.card]: card,
    [contentTh.content]: card
  })

  return (
    <div className={classNames}>
      {children}
    </div>
  )
}

export default AppBody
