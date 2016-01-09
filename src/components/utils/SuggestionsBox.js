var SuggestionsDropdown = require('./SuggestionsDropdown')
var t = React.PropTypes

export default class SuggestionsBox extends React.Component {
  static propTypes = {
    filter: t.func.isRequired,
    onSelect: t.func.isRequired,
  }

  state = {
    value: '',
    results: [],
  }

  clean () {
    this.setState({value: '', results: []})
  }

  onChange = (ev)=>{
    this.triggerFilter(ev.target.value)
  }

  triggerFilter = (query)=>{
    this.setState({value: query})
    var results = this.props.filter(query)
    if (results.length != null) {
      this.setState({results: results})
    } else {
      results.then((r)=> this.setState({results: r}))
    }
  }

  render () {
    let list = []
    let listValues = []
    let results = this.state.results
    for (let i = 0; i < results.length; ++i) {
      list.push(results[i][0])
      listValues.push(results[i][1])
    }

    return (
      <div className='suggestions-box'>
        <SuggestionsDropdown
          list={list}
          listValues={listValues}
          onSelect={this.props.onSelect}>
          <input
            type='text'
            value={this.state.value}
            onChange={this.onChange}
            placeholder={this.props.placeholder}/>
        </SuggestionsDropdown>
      </div>
    )
  }
}
