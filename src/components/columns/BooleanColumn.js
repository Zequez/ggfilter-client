var enumColumns = require('sources/enumColumns')
var classNames = require('classnames')
var t = React.PropTypes

export default class BooleanColumn extends React.Component {
  static propTypes = {
    value: t.number.isRequired,
    options: t.shape({
      enumType: t.string.isRequired
    }).isRequired
  }

  static noOverflowContainer = true

  constructor(props) {
    super(props)
    this.values = enumColumns.values[props.options.enumType]
    this.names = enumColumns.names[props.options.enumType]
    this.keys = Object.keys(this.values)
  }

  checked(val) {
    return (this.props.value & val) > 0
  }

  render() {
    let icons = this.keys.map((k)=>{
      let className = this.checked(this.values[k]) ? ('icon-' + k) : ''
      return (
        <i key={k} className={'fa ' + className}></i>
      )
    })

    return (
      <div className='icons-list'>
        {icons}
      </div>
    )
  }
}
