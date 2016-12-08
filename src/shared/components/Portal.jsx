import React, { Component, PropTypes as t } from 'react'
import ReactDOM from 'react-dom'

export default class Portal extends Component {
  static propTypes: {
    onMount: t.func,
    onUpdate: t.func,
    children: t.node
  }

  portalElement: null

  componentDidMount () {
    this.portalEl = document.createElement('div')
    document.body.appendChild(this.portalEl)
    this.portalRender(this.props.onMount)
  }

  componentWillUnmount () {
    ReactDOM.unmountComponentAtNode(this.portalEl)
    document.body.removeChild(this.portalEl)
  }

  componentDidUpdate () {
    this.portalRender(this.props.onUpdate)
  }

  portalRender (afterRender) {
    let { onMount, onUpdate, ...other } = this.props //eslint-disable-line no-unused-vars
    ReactDOM.render(
      <div {...other} className='portal'>
        {this.props.children}
      </div>
    , this.portalEl, afterRender)
  }

  render () {
    return null
  }
}
