var React = require('react')
var connect = require('react-redux').connect

import { connectActions, toggleFilter } from 'stores/actions'

class FilterToggle extends React.Component {
  onChange(ev) {
    this.toggleFilter(!this.props.active)
  }

  toggleFilter(status) {
    this.props.dispatch(toggleFilter(this.props.filter.name, status))
  }

  render() {
    console.log(`Render <BaseToggle/> ${this.props.filter.name}`)
    return (
      <li className='filter-toggle'>
        <label>
          <input
            type='checkbox'
            checked={this.props.active}
            onChange={this.onChange.bind(this)}/>
          {this.props.filter.title}
        </label>
      </li>
    )
  }
}

FilterToggle.propTypes = {
  filter: React.PropTypes.object.isRequired,
  active: React.PropTypes.bool.isRequired
}

export default connect()(FilterToggle)
