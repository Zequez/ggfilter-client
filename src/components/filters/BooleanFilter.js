var enumColumns = require('sources/enumColumns')

var t = React.PropTypes
export default class BooleanFilter extends React.Component {
  static propTypes = {
    query: t.shape({
      value: t.number,
      or: t.bool
    }).isRequired,
    options: t.shape({
      enumType: t.string.isRequired
    }).isRequired,
    onChange: t.func.isRequired
  }

  static defaultProps = {
    query: {
      value: 0,
      or: false
    }
  }

  constructor(props) {
    super(props)

    this.state = {
      value: props.query.value,
      enumValues: enumColumns.values[props.options.enumType],
      enumNames: enumColumns.names[props.options.enumType]
    }
  }

  checked(val) {
    return (this.state.value & val) > 0
  }

  onChange = (ev)=>{
    let checked = ev.target.checked
    let val = ev.target.value
    let currentVal = this.props.query.value
    let newVal

    if (checked) {
      newVal = currentVal | val
    }
    else {
      newVal = currentVal - (currentVal & val)
    }

    this.setState({value: newVal})
    if (newVal === 0) {
      this.props.onChange(null)
    }
    else {
      this.props.onChange({value: newVal, or: this.props.query.or})
    }

  }

  input(key) {
    let val = this.state.enumValues[key]
    return (
      <input
        key={key}
        type='checkbox'
        className={'boolean-' + key}
        value={val}
        checked={this.checked(val)}
        onChange={this.onChange}
        title={this.state.enumNames[key]}/>
    )
  }

  render() {
    let vals = this.state.enumValues
    let names = this.state.enumNames
    let keys = Object.keys(vals)

    return (
      <div>
        {keys.map((key)=> this.input(key))}
      </div>
    )
  }
}
