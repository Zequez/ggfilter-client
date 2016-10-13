import React, { PropTypes as t, Component } from 'react'

export default class ConfirmDeleteButton extends Component {
  static propTypes = {
    onConfirm: t.func,
    text: t.string
  }

  state = {
    confirming: false
  }

  cancel = () => {
    this.setState({confirming: false})
  }

  trigger = () => {
    this.setState({confirming: true})
  }

  render () {
    let { confirming } = this.state

    return (
      <span className='confirm-delete-button'>
        {confirming ? (
          <span className='confirm-delete-button-confirm'>
            Are you sure? <a onClick={this.props.onConfirm}>Yes</a> / <a onClick={this.cancel}>No</a>
          </span>
        ) : (
          <a onClick={this.trigger} className='confirm-delete-button-x'>
            {this.props.text || 'Delete'}
          </a>
        )}
      </span>
    )
  }
}
