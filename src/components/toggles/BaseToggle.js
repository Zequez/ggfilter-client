var React = require('react')

class FilterToggle extends React.Component {
  render() {
    return (
      <li className='filter-toggle'>
        <label>
          <input type='checkbox' onChange={this.props.onChange}/> {this.props.title}
        </label>
      </li>
    )
  }
}

FilterToggle.propTypes = {
  title: React.PropTypes.string.isRequired
}

FilterToggle.defaultProps = {
  onChange: ()=>{}
}

export default FilterToggle
