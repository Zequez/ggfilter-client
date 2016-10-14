import React, { PropTypes as t, Component } from 'react'

export default class Feedback extends Component {
  render () {
    return (
      <div className='feedback content-box'>
        <h2>Feedback</h2>
        <p>Hey, I hope you like the web app.</p>
        <p>
          You can send me feedback directly by <a href='https://www.reddit.com/message/compose/?to=Zequez'>
            PM on Reddit to /u/Zequez
          </a>
        </p>
      </div>
    )
  }
}
