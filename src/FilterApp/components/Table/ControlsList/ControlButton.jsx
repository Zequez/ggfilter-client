import th from './ControlsList.sass'
import React, { PropTypes as t, Component } from 'react'
import Button from 'shared/components/Button'
import ControlPop from '../../ControlPop'
import QueryChip from '../../QueryChip'

export default class ControlButton extends Component {
  static propTypes = {
    filter: t.object,
    query: t.oneOfType([t.bool, t.object]).isRequired,
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
    const { query, filter, onRemove } = this.props
    return (
      <div className={th.ControlsList__ControlButton}>
        { typeof query === 'object' ? (
          <QueryChip
            query={query}
            filter={filter}
            onRemove={onRemove}
            onClick={this.openControl}/>
        ) : (
          <Button flat label='Filter' onClick={this.openControl}/>
        )}
        { this.state.open ? (
          <ControlPop
            onClose={this.closeControl}
            target={this.state.targetDomNode}
            {...this.props} />
        ) : null }
      </div>
    )
  }
}
