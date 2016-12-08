import th from './QueryChipsList.sass'
import React, { PropTypes as t, Component } from 'react'
import definitions from '../../lib/definitions'
import ControlOpeningChip from './ControlOpeningChip'

export default class FilterChips extends Component {
  static propTypes = {
    filter: t.shape({
      params: t.object.isRequired,
      sort: t.shape({
        filter: t.string.isRequired,
        asc: t.bool.isRequired
      }).isRequired
    }).isRequired,
    onRemove: t.func.isRequired
  }

  onRemove = (filterName) => {
    this.props.onRemove(filterName)
  }

  render () {
    let { params } = this.props.filter
    let chips = []
    for (let name in params) {
      let query = params[name]
      if (query !== false && query !== true) {
        chips.push(
          <div key={name} className={th.QueryChipsList__chipContainer}>
            <ControlOpeningChip
              query={query}
              filter={definitions.filters[name]}
              onRemove={this.onRemove.bind(this, name)}/>
          </div>
        )
      }
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
