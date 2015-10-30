var { Component, PropTypes } = React
var filtersDefinitions = require('sources/filtersDefinitions')

class DataTableFilters extends Component {
  render() {
    var titles = []
    var controls = []
    console.log(this.props.filters)
    this.props.filters.forEach((filterName)=>{
      var filter = filtersDefinitions[filterName]

      titles.push(
        <th key={filter.name}>{filter.title}</th>
      )

      controls.push(
        <th key={filter.name}><filter.filter/></th>
      )
    })

    return (
      <thead>
        <tr>
          {titles}
        </tr>
        <tr>
          {controls}
        </tr>
      </thead>
    )
  }
}

DataTableFilters.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default DataTableFilters
