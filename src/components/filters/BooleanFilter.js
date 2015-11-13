var enumColumns = require('sources/enumColumns')
var classNames = require('classnames')

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
      or: props.query.or,
      value: props.query.value,
      enumValues: enumColumns.values[props.options.enumType],
      enumNames: enumColumns.names[props.options.enumType]
    }

    this.state.keys = Object.keys(this.state.enumValues)
  }

  checked(val) {
    return (this.state.value & val) > 0
  }

  onValueChange = (ev)=>{
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
    if (newVal) {
      this.props.onChange({value: newVal, or: this.state.or})
    }
    else {
      this.props.onChange(null)
    }
  }

  onOperatorChange = (ev)=>{
    let or = ev.target.checked
    let val = this.state.value
    this.setState({or: or})
    if (val) this.props.onChange({value: val, or: or})
  }

  render() {
    let enumType = this.props.options.enumType
    let inputs = []
    this.state.keys.forEach((key)=>{
      let val = this.state.enumValues[key]
      let name = this.state.enumNames[key]
      let checked = this.checked(val)
      let labelClass = classNames(`boolean-${enumType}-${key}`, {
        'boolean-checked': checked
      })
      let iconClass = 'fa icon-' + key
      let id = `boolean-${enumType}-${key}`

      inputs.push(
        <input
          id={id}
          className='boolean-input'
          type='checkbox'
          value={val}
          checked={checked}
          onChange={this.onValueChange}/>
      )

      inputs.push(
        <label className={labelClass} title={name} htmlFor={id}>
          <i className={iconClass}></i>
          <span>{name}</span>
        </label>
      )
    })

    let opId = `boolean-${enumType}-operator`
    var opInput =
      <input
        type='checkbox'
        className='boolean-operator-input'
        checked={this.state.or}
        id={opId}
        onChange={this.onOperatorChange}/>
    var opLabel =
      <label className='boolean-operator' htmlFor={opId} title='AND/OR'>
        <span>AND/OR</span>
      </label>

    return React.createElement('div', null, ...inputs, opInput, opLabel)
  }
}
