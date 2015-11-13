var connect = require('react-redux').connect
var t = React.PropTypes

var filtersDefinitions = require('sources/filtersDefinitions')
var filtersSections = require('sources/filtersSectionsDefinitionsExtra')

import { toggleFilter } from 'stores/actions'

class FiltersToggles extends React.Component {
  static propTypes = {
    filters: t.arrayOf(t.object).isRequired,
  }

  handleChange = ()=> {

  }

  toggleEl(filter) {
    let active = this.props.filters.indexOf(filter) != -1
    return <filter.toggle key={filter.name} active={active} filter={filter}/>
  }

  render() {
    let sectionsElements = []
    for (let sectionName in filtersSections) {
      sectionsElements.push(
        <li key={sectionName} className='filters-toggles-section'>
          <h3>{sectionName}</h3>
          <ul>
            {filtersSections[sectionName].map((filter)=> this.toggleEl(filter))}
          </ul>
        </li>
      )
    }

    return (
      <ul className='filters-toggles'>
        {sectionsElements}
      </ul>
    )
  }
}

export default connect()(FiltersToggles)
