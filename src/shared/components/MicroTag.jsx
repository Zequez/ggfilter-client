import React from 'react'
import th from './MicroTag.sass'
import cx from 'classnames'
import Icon from 'shared/components/Icon'

export default ({tag, deco, children, onDelete, onClick, className, highlighted}) => (
  <span onClick={onClick} className={cx(
    th.MicroTag, className, {
      [th.MicroTag_high]: highlighted,
      [th.MicroTag_deletable]: !!onDelete,
      [th.MicroTag_clickable]: !!onClick
    }
  )}>
    {tag || children}
    {deco ? <span className={th.MicroTag__deco}>{deco}</span> : null}
    {onDelete ? (
      <Icon className={th.MicroTag__delete} icon='remove-tag' onClick={onDelete}/>
    ) : null}
  </span>
)
