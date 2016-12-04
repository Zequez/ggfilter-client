import th from './TextControl.sass'
import React, { Component, PropTypes as t } from 'react'
import { debounceCountdown } from 'shared/lib/utils'
import Input from 'shared/components/Input'

export default class TextControl extends Component {
  static propTypes = {
    query: t.shape({
      value: t.string
    }).isRequired,
    onChange: t.func.isRequired
  }

  static defaultProps = { query: { value: '' } }

  constructor (props) {
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

  onKeyUp = (ev) => {
    if (ev.key === 'Enter') {
      this.submit()
    }
  }

  onChange = (value) => {
    this.setState({value: value})
    if (this.changed(value)) {
      this.debouncedSubmitStop = this.debouncedSubmit()
    }
  }

  submit = () => {
    this.handleCountdown(0)
    if (this.changed()) {
      let val = this.state.value
      this.debouncedSubmitStop && this.debouncedSubmitStop()
      this.props.onChange(val ? {value: val} : null)
    }
  }

  changed (val = this.state.value) {
    return (val || '') !== (this.props.query.value || '')
  }

  handleCountdown = (progress) => {
    if (this.state.changeTimeoutProgress !== progress) {
      this.setState({changeTimeoutProgress: progress})
    }
  }

  render () {
    let transform = {
      transform: `scaleY(${this.state.changeTimeoutProgress})`
    }

    return (
      <div className={th.TextControl}>
        <Input
          value={this.state.value}
          onKeyUp={this.onKeyUp}
          onBlur={this.submit}
          hint='Search games by name'
          onChange={this.onChange}/>
        <div className={th.TextControl__timebar} style={transform}></div>
      </div>
    )
  }
}
