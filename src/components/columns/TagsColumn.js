import {addQueryTag} from 'stores/actions'
import {partial} from 'lib/utils'
var t = React.PropTypes

export default class TagsColumn extends React.Component {
  static propTypes = {
    value: t.arrayOf(t.number).isRequired,
    options: t.shape({
      tags: t.arrayOf(t.string)
    }).isRequired,
    queryFilter: t.object,
    dispatch: t.func.isRequired
  }

  selectTag = (tagId)=>{
    this.props.dispatch(addQueryTag(tagId))
  }

  render() {
    let tags = this.props.options.tags
    let queryTags = (this.props.queryFilter && this.props.queryFilter.tags) || []

    let tagsElements = this.props.value.map((tagId)=>{
      let liClass = queryTags.indexOf(tagId) === -1 ? '' : 'selected'
      return (
        <li key={tagId} onClick={partial(this.selectTag, tagId)} className={liClass}>
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
