import th from './QueryChipsList.sass'
import React, { PropTypes as t, Component } from 'react'
import definitions from '../../lib/definitions'
import ControlOpeningChip from './ControlOpeningChip'

export default class QueryChipsList extends Component {
  static propTypes = {
    controlsParams: t.object,
    onRemove: t.func.isRequired
  }

  onRemove = (filterName) => {
    this.props.onRemove(filterName)
  }

  render () {
    let { controlsParams } = this.props

    let chips = []
    for (let name in controlsParams) {
      let query = controlsParams[name]
      chips.push(
        <div key={name} className={th.QueryChipsList__chipContainer}>
          <ControlOpeningChip
            query={query}
            control={definitions.filters[name]}
            onRemove={this.onRemove.bind(this, name)}/>
        </div>
      )
    }

    return chips.length ? (
      <div className={th.QueryChipsList}>
        <div className={th.QueryChipsList__titleLabel}>
          Filters
        </div>
        {chips}
      </div>
    ) : null
  }
}
