import React, { PropTypes as t, Component } from 'react'
import { connect } from 'react-redux'
import ControlPop from './ControlPop'
import { setParam } from '../filter/reducer'

@connect(null, { setParam })
export default class ConnectedControlPop extends Component {
  static propTypes = {
    setParam: t.func.isRequired,
    filter: t.object.isRequired
  }

  onChange = (value) => {
    console.log(this.props.filter.name, value)
    this.props.setParam(this.props.filter.name, value)
  }

  render () {
    return (
      <ControlPop {...this.props} onChange={this.onChange}></ControlPop>
    )
  }
}
