import * as React from 'react';
import * as th from './TagsControl.sass';
import { Tags } from '../../../../../Api';

import SelectedTags from './SelectedTags';
import TagsSelector from './TagsSelector';
import Input from 'shared/components/Input';

type TagsControlProps = {
  onChange: (Tags) => void;
} & TagsControlDefaultProps;

type TagsControlDefaultProps = {
  query: Tags;
};

type TagsControlState = {
  text: string;
  selectedWidth: number;
};

export class TagsControl extends React.Component<TagsControlProps, TagsControlState> {
  static tags: string[] = []; // Hacky, but the FilterApp fills it up

  static defaultProps: TagsControlDefaultProps = {
    query: {
      tags: [],
      reject: [],
      mode: 'and'
    }
  };

  state = {
    text: '',
    selectedWidth: 50
  };

  // componentWillMount () { this.componentWillReceiveProps(this.props); }

  // componentWillReceiveProps (np: TagsControlProps) {
  //   this.setState({tags: np.query.tags});
  // }

  // shouldComponentUpdate (np, ns) {
  //   let s = this.state;
  //   return (
  //     np.query.tags !== s.tags ||
  //     np.query.reject !== s.reject ||
  //     np.query.mode !== this.props.query.mode ||
  //     ns.tags !== s.tags ||
  //     ns.text !== s.text ||
  //     ns.selectedWidth !== s.selectedWidth
  //   );
  // }

  onChange (query: Partial<Tags>) {
    this.props.onChange(query ? {...this.props.query, ...query} : null);
  }

  selectTag = (tag: string) => {
    this.setState({text: ''});
    this.onChange({tags: this.props.query.tags.concat([tag])});
  }

  rejectTag = (tag: string) => {
    this.setState({text: ''});
    this.onChange({reject: this.props.query.reject.concat([tag])});
  }

  onRemoveTag = (tag) => {
    let tags = this.props.query.tags.concat([]);
    tags.splice(tags.indexOf(tag), 1);
    if (tags.length) {
      this.onChange({tags});
    } else {
      this.onChange(null);
    }
  }

  onTextChange = (value) => {
    this.setState({text: value});
  }

  onSelectedWidthChange = (width) => {
    this.setState({selectedWidth: width});
  }

  onKeyDown = (ev) => {
    if (ev.keyCode === 8) { // Backspace
      let tags = this.props.query.tags;
      if (!this.state.text && tags.length) {
        this.onRemoveTag(tags[tags.length - 1]);
      }
    }
  }

  focus () {
    this.refs.input['focus']();
  }

  render () {
    // console.logRender('TagsControl');
    let inputStyle = {
      paddingLeft: this.state.selectedWidth
    };

    const tags = TagsControl.tags || []; // FIIIIIXX!

    return (
      <div className={th.TagsControl}>
        <SelectedTags
          tags={this.props.query.tags}
          onWidthChange={this.onSelectedWidthChange}
          onRemove={this.onRemoveTag}/>

        <TagsSelector
          tags={tags}
          selectedTags={this.props.query.tags}
          search={this.state.text}
          onSelect={this.selectTag}
          onReject={this.rejectTag}>
          <Input
            value={this.state.text}
            style={inputStyle}
            hint={this.props.query.tags.length ? null : 'Filter games by tag'}
            onKeyDown={this.onKeyDown}
            onChange={this.onTextChange}
            ref='input'/>
        </TagsSelector>
      </div>
    );
  }
}

// export const ConnectedTagsControl = connect((s) => ({
//   tagsList: s.tags
// }), null)(TagsControl)
