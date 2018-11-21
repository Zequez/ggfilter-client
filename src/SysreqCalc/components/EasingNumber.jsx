import React, { PropTypes as t, Component } from 'react'

let TIME = 500 // ms
let INTERVAL = 33 // ms
function f (x, D) { return -D * x * x + 2 * D * x }
function travelToNumber (start, end, cb, time = 0) {
  time += INTERVAL
  let t = time / TIME

  if (t <= 1) {
    let D = Math.abs(start - end)
    let d = f(t, D)
    if (d > D) d = D
    if (start > end) d = -d
    cb(Math.round(start + d))
    setTimeout(() => {
      travelToNumber(start, end, cb, time)
    }, INTERVAL)
  }
}

export default class EasingNumber extends Component {
  // static propTypes = {
  //   number: t.number.isRequired
  // }

  state = {
    number: 0
  }

  componentWillMount () {
    this.travel(this.props.number)
  }

  componentWillReceiveProps (np) {
    this.travel(np.number)
  }

  travel (target) {
    travelToNumber(this.state.number, target, (process) => {
      this.setState({number: process})
    })
  }

  render () {
    return <span className={this.props.className}>{this.state.number}</span>
  }
}
