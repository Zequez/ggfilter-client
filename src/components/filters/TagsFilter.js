var SelectedTags = require('./TagsFilter/SelectedTags')
var TagsSelector = require('./TagsFilter/TagsSelector')
var t = React.PropTypes

export default class TagsFilter extends React.Component {
  static propTypes = {
    query: t.shape({
      tags: t.arrayOf(t.number)
    }),
    options: t.shape({
      tags: t.arrayOf(t.string)
    }).isRequired,
    onChange: t.func.isRequired
  }

  static defaultProps = {
    query: { tags: [] }
  }

  state = {
    text: '',
    selectedWidth: 50
  }

  selectTag = (tagId)=>{
    this.setState({text: ''})
    this.props.onChange({tags: this.props.query.tags.concat([tagId])})
  }

  onRemoveTag = (tagId)=>{
    let i = this.props.query.tags.indexOf(tagId)
    let newTags = this.props.query.tags.concat([])
    newTags.splice(i, 1)
    if (newTags.length) {
      this.props.onChange({tags: newTags})
    }
    else {
      this.props.onChange(null)
    }

  }

  onTextChange = (ev)=>{
    this.setState({text: ev.target.value})
  }

  onSelectedWidthChange = (width)=>{
    this.setState({selectedWidth: width})
  }

  onKeyDown = (ev)=>{
    if (ev.keyCode === 8) { // Backspace
      let tags = this.props.query.tags
      if (!this.state.text && tags.length) {
        this.onRemoveTag(tags[tags.length-1])
      }
    }
  }

  render() {
    let inputStyle = {
      paddingLeft: this.state.selectedWidth
    }

    return (
      <div className='tags-filter'>
        <SelectedTags
          tags={this.props.options.tags}
          selectedTags={this.props.query.tags}
          onWidthChange={this.onSelectedWidthChange}
          onRemove={this.onRemoveTag}/>

        <TagsSelector
          tags={this.props.options.tags}
          selectedTags={this.props.query.tags}
          value={this.state.text}
          onSelect={this.selectTag}>
          <input
            type='text'
            value={this.state.text}
            style={inputStyle}
            onKeyDown={this.onKeyDown}
            onChange={this.onTextChange}/>
        </TagsSelector>
      </div>
    )
  }
}
