import React, { Component } from 'react'
import ReactDOM from 'react-dom'

export default class Portal extends Component {
  portalElement: null

  componentDidMount () {
    this.portalEl = document.createElement('div')
    document.body.appendChild(this.portalEl)
    this.componentDidUpdate()
  }

  componentWillUnmount () {
    ReactDOM.unmountComponentAtNode(this.portalEl)
    document.body.removeChild(this.portalEl)
  }

  componentDidUpdate () {
    ReactDOM.render(
      <div {...this.props} className='portal'>
        {this.props.children}
      </div>
    , this.portalEl)
  }

  render () {
    return null
  }
}
