import React from 'react'
import cx from 'classnames'

export default ({icon, className, ...other}) => {
  return <i className={cx(className, 'fa icon-' + icon)} {...other}></i>
}
