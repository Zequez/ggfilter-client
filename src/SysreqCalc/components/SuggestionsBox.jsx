import th from '../theme'

import React, { Component, PropTypes as t } from 'react'
import Input from 'shared/components/Input'

import SuggestionsDropdown from './SuggestionsDropdown'

export default class SuggestionsBox extends Component {
  static propTypes = {
    filter: t.func.isRequired,
    onSelect: t.func.isRequired
  }

  state = {
    value: '',
    results: []
  }

  clean () {
    this.setState({value: '', results: []})
  }

  onChange = (value) => {
    this.triggerFilter(value)
  }

  triggerFilter = (query) => {
    this.setState({value: query})
    var results = this.props.filter(query)
    if (results.length != null) {
      this.setState({results: results})
    } else {
      results.then((r) => this.setState({results: r}))
    }
  }

  render () {
    let list = []
    let listValues = []
    let results = this.state.results
    for (let i = 0; i < results.length; ++i) {
      list.push(results[i][0])
      listValues.push(results[i][1])
    }

    return (
      <div className={th.suggestionsBox}>
        <SuggestionsDropdown
          list={list}
          listValues={listValues}
          onSelect={this.props.onSelect}>
          <div className={th.SysreqCalc__InputContainer}>
            <Input
              className={th.SysreqCalc__Input}
              value={this.state.value}
              onChange={this.onChange}
              hint={this.props.placeholder}/>
          </div>
        </SuggestionsDropdown>
      </div>
    )
  }
}
