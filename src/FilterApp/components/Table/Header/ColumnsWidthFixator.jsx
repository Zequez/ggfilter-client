// Warning, this class is hacky:
// - reads parentNode.parentNode.parentNode.clientWidth
// - modifies parentNode.parentNode.style.width
// Use with caution

import th from '../theme'
import React, { PropTypes as t, Component } from 'react'
import debounce from 'lodash/debounce'
import { u } from 'shared/lib/utils'
import TableWidthCalculator from '../../../lib/TableWidthCalculator'
import ResizeHandle from './ResizeHandle'

export default class ColumnsWidthFixator extends Component {
  static propTypes = {
    visibleFiltersDefinitions: t.arrayOf(t.object)
  }

  state = {
    deltaWidth: {},
    containerWidth: 1280
  }

  // Don't look at this, this part is very hacky
  // But it's the most efficient...
  componentDidMount () {
    this.setContainerWidth()

    this.debouncedResize = debounce(this.setContainerWidth, 100)
    window.addEventListener('resize', this.debouncedResize)
  }

  componentDidUpdate () {
    let table = this.getHackyTable()
    table.style.width = this.calc.tableWidth + 'px'
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.debouncedResize)
  }

  setContainerWidth = () => {
    this.setState({containerWidth: this.getHackyContainer().clientWidth})
  }

  getHackyContainer () { return this.refs.tr.parentNode.parentNode.parentNode }
  getHackyTable () { return this.refs.tr.parentNode.parentNode }

  // End of hacky stuff

  onResize = (filter, deltaAdded) => {
    let minDelta = -filter.width + 8
    let delta = (this.state.deltaWidth[filter.name] || 0) + deltaAdded

    this.setDelta(filter, Math.max(minDelta, delta))
  }

  onResetResize = (filter) => {
    this.setDelta(filter, 0)
  }

  setDelta (filter, amount) {
    this.setState({deltaWidth: u(this.state.deltaWidth, {[filter.name]: {$set: amount}})})
  }

  render () {
    this.calc = new TableWidthCalculator(
      this.props.visibleFiltersDefinitions, this.state.deltaWidth, this.state.containerWidth
    )

    return (
      <tr className={th.columnsWidthFixator} ref='tr'>
        {this.calc.map((filter, width) => (
          <td key={filter.name} style={{width: `${width}px`}}>
            <ResizeHandle
              onStop={this.onResize.bind(this, filter)}
              onDoubleClick={this.onResetResize.bind(this, filter)}/>
          </td>
        ))}
      </tr>
    )
  }
}
