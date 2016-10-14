import React, { PropTypes as t, Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { partial } from 'shared/lib/utils'

import { getAll } from '../selectors'
import { fetch, destroy } from '../reducer'
import FilterRow from './FilterRow'

export class SavedFiltersManager extends Component {
  static propTypes = {
    currentUser: t.shape({
      id: t.number.isRequired
    }).isRequired,
    currentFilter: t.shape({
      sid: t.string
    }),
    loadFilter: t.func.isRequired,
    onLoad: t.func.isRequired,
    onEdit: t.func.isRequired,
    onGo: t.func.isRequired,

    sfilters: t.arrayOf(t.object).isRequired,
    fetch: t.func.isRequired,
    destroy: t.func.isRequired
  }

  componentWillMount () {
    this.fetch()
  }

  fetch () {
    this.props.fetch(this.props.currentUser.id)
  }

  onDelete = (f) => {
    this.props.destroy(f)
  }

  render () {
    let { sfilters, onLoad, onGo, onEdit, currentFilter } = this.props

    return (
      <div className='saved-filters-manager content-box'>
        <table>
          <thead>
            <tr>
              <td>URL</td>
              <td>Name</td>
              <td>Created</td>
              <td>Updated</td>
              <td>Visits</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {sfilters.map((f) => (
              <FilterRow
                key={f.sid}
                sfilter={f}
                currentlyLoaded={f.sid === currentFilter.sid}
                onLoad={partial(onLoad, f)}
                onGo={partial(onGo, f)}
                onEdit={partial(onEdit, f)}
                onDelete={partial(this.onDelete, f)}/>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default connect((s) => createStructuredSelector({
  sfilters: getAll
}), { fetch, destroy })(SavedFiltersManager)
