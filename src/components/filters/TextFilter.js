import React, { Component, PropTypes as t } from 'react'
var debounceCountdown = require('lib/utils').debounceCountdown

export default class TextFilter extends Component {
  static propTypes = {
    query: t.shape({
      value: t.string
    }).isRequired,
    onChange: t.func.isRequired
  }

  static defaultProps = { query: { value: '' } }

  constructor(props) {
    super(props)
    this.debouncedSubmit = debounceCountdown(500, 20, this.handleCountdown, this.submit)
  }

  state = {
    value: '',
    changeTimeoutProgress: 0
  }

  componentWillMount (np) { this.componentWillReceiveProps(this.props) }
  componentWillReceiveProps (np) {
    this.setState({value: np.query.value})
  }

  onKeyUp = (ev)=> {
    if (ev.key === 'Enter') {
      this.submit()
    }
  }

  onChange = (ev)=> {
    this.setState({value: ev.target.value})
    if (this.changed(ev.target.value)) {
      this.debouncedSubmitStop = this.debouncedSubmit()
    }
  }

  submit = ()=> {
    this.handleCountdown(0)
    if (this.changed()) {
      let val = this.state.value
      this.debouncedSubmitStop && this.debouncedSubmitStop()
      this.props.onChange(val ? {value: val} : null)
    }
  }

  changed(val = this.state.value) {
    return (val || '') != (this.props.query.value || '')
  }

  handleCountdown = (progress)=> {
    if (this.state.changeTimeoutProgress !== progress) {
      this.setState({changeTimeoutProgress: progress})
    }
  }

  render(extraProps) {
    let transform = {
      transform: `scaleY(${this.state.changeTimeoutProgress})`
    }

    return (
      <div>
        <input
          type='text'
          value={this.state.value}
          onKeyUp={this.onKeyUp}
          onBlur={this.submit}
          onChange={this.onChange}
          {...extraProps} />
        <div className='timerbar' style={transform}></div>
      </div>
    )
  }
}
