import th from './ControlsList.sass'
import React, { PropTypes as t, Component } from 'react'
import Button from 'shared/components/Button'
import ControlPop from './ControlPop'

export default class ControlButton extends Component {
  static propTypes = {

  }

  state = {
    open: false,
    targetDomNode: null
  }

  onClickButton = (ev) => {
    this.setState({open: true, targetDomNode: ev.currentTarget})
  }

  onClosePop = () => {
    this.setState({open: false, targetDomNode: null})
  }

  render () {
    return (
      <div className={th.ControlsList__ControlButton}>
        <Button flat label='Filter' onClick={this.onClickButton}/>
        { this.state.open ? (
          <ControlPop
            onClose={this.onClosePop}
            target={this.state.targetDomNode}
            {...this.props} />
        ) : null }
      </div>
    )
  }
}
