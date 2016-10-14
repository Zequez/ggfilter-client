import React, { PropTypes as t, Component } from 'react'
import { connect } from 'react-redux'
import { appropiateFilterPath } from 'shared/lib/appropiateFilterPath'
import history from 'shared/lib/StateRouter/history'
import { partial } from 'shared/lib/utils'
import { loadFilter } from 'src/FilterApp'
import { lockFilterIntoView } from 'shared/reducers/uiReducer'

@connect(null, {
  loadFilter,
  lockFilterIntoView
})
export default class OfficialFiltersLink extends Component {
  static propTypes = {
    sfilter: t.object.isRequired,
    loadFilter: t.func.isRequired,
    lockFilterIntoView: t.func.isRequired
  }

  goTo = (path, ev) => {
    ev.preventDefault()
    history.push(path)
  }

  load = () => {
    this.props.loadFilter(this.props.sfilter)
    this.props.lockFilterIntoView()
  }

  aWrap (path, text) {
    return (
      <a onClick={partial(this.goTo, path)} href={path}>
        {text}
      </a>
    )
  }

  render () {
    let { sfilter } = this.props
    let path = appropiateFilterPath(sfilter)

    return (
      <tr className='official-filter'>
        <td>{this.aWrap(path, path)}</td>
        <td>{this.aWrap(path, sfilter.name)}</td>
        <td><button onClick={this.load}>Load</button></td>
      </tr>
    )
  }
}
