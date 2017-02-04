import th from './ControlsList.sass'
import React, { PropTypes as t, Component } from 'react'
import Button from 'shared/components/Button'
import { isQueryEmpty } from '../../../lib/utils'
import ControlPop from '../../ControlPop'
import QueryChip from '../../QueryChip'

export default class ControlButton extends Component {
  static propTypes = {
    control: t.object,
    hl: t.bool,
    query: t.object,
    onRemove: t.func
  }

  state = {
    open: false,
    targetDomNode: null
  }

  openControl = (ev) => {
    this.setState({open: true, targetDomNode: ev.currentTarget})
  }

  closeControl = () => {
    this.setState({open: false, targetDomNode: null})
  }

  render () {
    const { query, control, onRemove } = this.props
    return control.control || control.shortcuts.length ? (
      <div className={th.ControlsList__ControlButton}>
        { query ? (
          <QueryChip
            query={query}
            control={control}
            onRemove={onRemove}
            onClick={this.openControl}/>
        ) : (
          <Button flat icon='filter' onClick={this.openControl}/>
        )}
        { this.state.open ? (
          <ControlPop
            onClose={this.closeControl}
            target={this.state.targetDomNode}
            {...this.props} />
        ) : null }
      </div>
    ) : null
  }
}
