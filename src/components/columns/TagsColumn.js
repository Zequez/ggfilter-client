import {addQueryTag} from 'stores/actions'
import {partial} from 'lib/utils'
var t = React.PropTypes

export default class TagsColumn extends React.Component {
  static propTypes = {
    value: t.arrayOf(t.number).isRequired,
    options: t.shape({
      tags: t.arrayOf(t.string)
    }).isRequired,
    dispatch: t.func.isRequired
  }

  selectTag = (tagId)=>{
    this.props.dispatch(addQueryTag(tagId))
  }

  render() {
    let tags = this.props.options.tags

    let tagsElements = this.props.value.map((tagId)=>{
      return (
        <li key={tagId} onClick={partial(this.selectTag, tagId)}>
          {tags[tagId]}
        </li>
      )
    })

    return (
      <ul>
        {tagsElements}
      </ul>
    )
  }
}
