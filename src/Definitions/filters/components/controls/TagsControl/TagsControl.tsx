import * as React from 'react';
import * as th from './TagsControl.sass';
import { Tags } from '../../../../../Api';

import SelectedTags from './SelectedTags';
import TagsSelector from './TagsSelector';
import ModeSelector from './ModeSelector';
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
    if (query) {
      query = {...this.props.query, ...query};
      if (query.tags.length === 0 && query.reject.length === 0 && query.mode === TagsControl.defaultProps.query.mode) {
        query = null;
      }
    }
    this.props.onChange(query);
  }

  selectTag = (tag: string) => {
    this.setState({text: ''});
    this.onChange({tags: this.props.query.tags.concat([tag])});
  }

  rejectTag = (tag: string) => {
    this.setState({text: ''});
    this.onChange({reject: this.props.query.reject.concat([tag])});
  }

  onChangeMode = (mode: 'or' | 'and') => {
    this.onChange({mode});
  }

  onRemoveTag = (tag: string) => {
    let tags = this.props.query.tags.concat([]);
    tags.splice(tags.indexOf(tag), 1);
    this.onChange({tags});
  }

  onRemoveReject = (tag: string) => {
    console.log(tag);
    let reject = this.props.query.reject.concat([]);
    reject.splice(reject.indexOf(tag), 1);
    this.onChange({reject});
  }

  onTextChange = (value) => {
    this.setState({text: value});
  }

  onSelectedWidthChange = (width) => {
    this.setState({selectedWidth: width});
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
        <TagsSelector
          tags={tags}
          selectedTags={this.props.query.tags.concat(this.props.query.reject)}
          search={this.state.text}
          onSelect={this.selectTag}
          onReject={this.rejectTag}>
          <Input
            value={this.state.text}
            hint='Filter games by tag'
            onChange={this.onTextChange}
            ref='input'/>
        </TagsSelector>
        <ModeSelector
          modes={['and', 'or']}
          mode={this.props.query.mode}
          onChange={this.onChangeMode}/>
        <SelectedTags
          tags={this.props.query.tags}
          reject={this.props.query.reject}
          onRemoveReject={this.onRemoveReject}
          onRemove={this.onRemoveTag}/>
      </div>
    );
  }
}

// export const ConnectedTagsControl = connect((s) => ({
//   tagsList: s.tags
// }), null)(TagsControl)
