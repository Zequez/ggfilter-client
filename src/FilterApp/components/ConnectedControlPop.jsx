import React, { PropTypes as t, Component } from 'react'
import { connect } from 'react-redux'
import ControlPop from './ControlPop'
import { setParam } from '../filter/reducer'

@connect(null, { setParam })
export default class ConnectedControlPop extends Component {
  static propTypes = {
    setParam: t.func.isRequired,
    control: t.object.isRequired
  }

  onChange = (value) => {
    this.props.setParam(this.props.control.name, value)
  }

  render () {
    return (
      <ControlPop {...this.props} onChange={this.onChange}></ControlPop>
    )
  }
}
