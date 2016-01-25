var connect = require('react-redux').connect
var t = React.PropTypes

var filtersDefinitions = require('sources/filtersDefinitions')
var filtersSections = require('sources/filtersSectionsDefinitions')

import { toggleFilter } from 'stores/actions'

@connect((state) => { return {toggledFilters: state.toggledFilters}})
export default class FiltersToggles extends React.Component {
  static propTypes = {
    toggledFilters: t.arrayOf(t.string).isRequired,
  }

  toggleEl(filterName) {
    let active = this.props.toggledFilters.indexOf(filterName) != -1
    let filter = filtersDefinitions[filterName]
    return <filter.toggle key={filter.name} active={active} filter={filter}/>
  }

  render() {
    console.info('Render <FiltersToggles/>')

    let sectionsElements = []
    for (let sectionName in filtersSections) {
      sectionsElements.push(
        <li key={sectionName} className='filters-toggles-section'>
          <h3>{sectionName}</h3>
          <ul>
            {filtersSections[sectionName].map((filterName)=> this.toggleEl(filterName))}
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
