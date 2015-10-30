var React = require('react')
var _ = require('lodash')

import { toggleFilter } from 'stores/actions'

class FiltersTogglesSection extends React.Component {
  render() {
    var toggles = this.props.filters.map((filter)=>{
      return (
        <filter.toggle key={filter.name} active={true} filter={filter}/>
      )
    })

    return (
      <li className='filters-toggles-section'>
        <h3>{this.props.title}</h3>
        <ul>{toggles}</ul>
      </li>
    )
  }
}

FiltersTogglesSection.propTypes = {
  title: React.PropTypes.string.isRequired,
  filters: React.PropTypes.array
}

export default FiltersTogglesSection
