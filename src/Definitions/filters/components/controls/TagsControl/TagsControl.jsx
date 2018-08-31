import th from './TagsControl.sass'
import React, { PropTypes as t } from 'react'
import { connect } from 'react-redux'

import SelectedTags from './SelectedTags'
import TagsSelector from './TagsSelector'
import Input from 'shared/components/Input'

export class TagsControl extends React.Component {
  static tags = [];

  static propTypes = {
    query: t.shape({
      tags: t.arrayOf(t.number),
      reject: t.arrayOf(t.number)
    }),
    onChange: t.func.isRequired
  }

  static defaultProps = {
    query: { tags: [] }
  }

  state = {
    text: '',
    selectedWidth: 50,
    tags: []
  }

  componentWillMount (np) { this.componentWillReceiveProps(this.props) }
  componentWillReceiveProps (np) {
    this.setState({tags: np.query.tags})
  }
  shouldComponentUpdate (np, ns) {
    let s = this.state
    return (
      np.query.tags !== s.tags ||
      ns.tags !== s.tags ||
      ns.text !== s.text ||
      ns.selectedWidth !== s.selectedWidth
    )
  }

  onChange (data) {
    this.setState(data || {tags: []})
    setTimeout(() => {
      this.props.onChange(data)
    }, 50)
  }

  selectTag = (tagId) => {
    this.setState({text: ''})
    this.onChange({tags: this.props.query.tags.concat([tagId])})
  }

  onRemoveTag = (tagId) => {
    let i = this.props.query.tags.indexOf(tagId)
    let newTags = this.props.query.tags.concat([])
    newTags.splice(i, 1)
    if (newTags.length) {
      this.onChange({tags: newTags})
    } else {
      this.onChange(null)
    }
  }

  onTextChange = (value) => {
    this.setState({text: value})
  }

  onSelectedWidthChange = (width) => {
    this.setState({selectedWidth: width})
  }

  onKeyDown = (ev) => {
    if (ev.keyCode === 8) { // Backspace
      let tags = this.state.tags
      if (!this.state.text && tags.length) {
        this.onRemoveTag(tags[tags.length - 1])
      }
    }
  }

  focus () {
    this.refs.input.focus()
  }

  render () {
    console.logRender('TagsControl')
    let inputStyle = {
      paddingLeft: this.state.selectedWidth
    }

    const tags = TagsControl.tags || [] // FIIIIIXX!

    return (
      <div className={th.TagsControl}>
        <SelectedTags
          tags={tags}
          selectedTags={this.state.tags}
          onWidthChange={this.onSelectedWidthChange}
          onRemove={this.onRemoveTag}/>

        <TagsSelector
          tags={tags}
          selectedTags={this.state.tags}
          value={this.state.text}
          onSelect={this.selectTag}>
          <Input
            value={this.state.text}
            style={inputStyle}
            hint={this.state.tags.length ? null : 'Filter games by tag'}
            onKeyDown={this.onKeyDown}
            onChange={this.onTextChange}
            ref='input'/>
        </TagsSelector>
      </div>
    )
  }
}

// export const ConnectedTagsControl = connect((s) => ({
//   tagsList: s.tags
// }), null)(TagsControl)