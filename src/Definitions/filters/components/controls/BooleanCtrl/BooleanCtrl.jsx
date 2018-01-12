import th from './BooleanCtrl.sass'
import React, { Component, PropTypes as t } from 'react'

import Operators from './Operators'
import Flags from './Flags'

export class BooleanCtrl extends Component {
  static propTypes = {
    query: t.shape({
      value: t.number,
      mode: t.oneOf(['and', 'or', 'xor'])
    }),
    name: t.string.isRequired,
    onChange: t.func.isRequired,
    options: t.shape({
      modes: t.arrayOf(t.oneOf(['and', 'or', 'xor']))
    })
  }

  static defaultProps = {
    options: {}
  }

  state = { query: null }
  componentWillMount () {
    this.options = {
      modes: ['and', 'or', 'xor'],
      ...this.props.options
    }
    this.componentWillUpdate(this.props)
  }

  componentWillUpdate (np) {
    if (!this.state.query || np.query !== this.props.query) {
      let query = np.query || {
        value: 0,
        mode: this.options.modes[0]
      }
      this.setState({query})
    }
  }

  onOperatorChange = (mode) => this.setQuery({...this.state.query, mode})
  onFlagsChange = (value) => this.setQuery({...this.state.query, value})

  setQuery (query) {
    this.setState({query})
    if (query.value) {
      this.props.onChange(query)
    }
  }

  render () {
    let { name } = this.props
    let { query } = this.state

    return (
      <div className={th.BooleanCtrl}>
        <Flags
          enumType={name}
          value={query.value}
          onChange={this.onFlagsChange}/>
        <Operators
          modes={this.options.modes}
          value={query.mode}
          onChange={this.onOperatorChange}/>
      </div>
    )
  }
}
