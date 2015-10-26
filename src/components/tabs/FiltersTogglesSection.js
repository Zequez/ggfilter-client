var React = require('react')
var _ = require('lodash')

class FiltersTogglesSection extends React.Component {
  filterChanged(ev) {
    console.log(ev)
  }

  render() {
    var toggles = this.props.filters.map((filter)=>{
      return (
        <filter.toggle
          key={filter.title}
          title={filter.title}
          onChange={this.filterChanged}/>
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
