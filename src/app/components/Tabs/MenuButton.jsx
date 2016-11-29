import th from './theme'
import React from 'react'

const MenuButton = ({onClick}) => (
  <i className={'fa icon-menu ' + th.menuButton} onClick={onClick}></i>
)

export default MenuButton
