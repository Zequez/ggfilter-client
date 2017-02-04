import React, { PropTypes as t, Component } from 'react'
import QueryChip from '../QueryChip'
import ConnectedControlPop from '../ConnectedControlPop'

export default class ControlOpeningChip extends Component {
  static propTypes = {
    control: t.object,
    query: t.oneOfType([t.bool, t.object])
  }

  state = {
    controlOpen: false,
    popTarget: null
  }

  openControl = (ev) => {
    this.setState({controlOpen: true, popTarget: ev.currentTarget})
  }

  closeControl = () => {
    this.setState({controlOpen: false, popTarget: null})
  }

  render () {
    let { query, control } = this.props

    return (
      <QueryChip {...this.props} onClick={this.openControl}>
        { this.state.controlOpen ? (
          <ConnectedControlPop
            query={query}
            control={control}
            target={this.state.popTarget}
            onClose={this.closeControl}/>
        ) : null }
      </QueryChip>
    )
  }
}
