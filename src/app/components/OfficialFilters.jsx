import React, { Component } from 'react'

const api = require('shared/lib/api')
import { camelizeKeys } from 'shared/lib/utils'

import OfficialFiltersLink from './OfficialFiltersLink'

export default class OfficialFilters extends Component {
  state = {
    sfilters: []
  }

  componentWillMount () {
    this.fetch()
  }

  fetch () {
    api.officialFilters().then((sfilters) => {
      sfilters = camelizeKeys(sfilters)
        .sort((a, b) => a.officialSlug.localeCompare(b.officialSlug))
      this.setState({sfilters})
    })
  }

  render () {
    let { sfilters } = this.state

    return (
      <div className='official-filters content-box'>
        <table>
          <tbody>
            {sfilters.map((f) => (
              <OfficialFiltersLink key={f.id} sfilter={f}/>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}
