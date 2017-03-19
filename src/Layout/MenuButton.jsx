import th from './Layout.sass'
import React from 'react'
import { connect } from 'react-redux'
import { openDrawer } from './reducer'
import Icon from 'shared/components/Icon'

const MenuButton = ({openDrawer}) => (
  <Icon icon='menu' className={th.Layout__MenuButton} onClick={openDrawer}/>
)

export default connect(null, { openDrawer })(MenuButton)
