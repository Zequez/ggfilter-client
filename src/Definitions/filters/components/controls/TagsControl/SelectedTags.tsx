import * as React from 'react';
import * as th from './TagsControl.sass';
import MicroTag from 'shared/components/MicroTag';

type SelectedTagsProps = {
  tags: string[];
  reject: string[];
  onRemove: (tag: string) => void;
  onRemoveReject: (tag: string) => void;
  onWidthChange?: (width: number) => void;
};


export default class SelectedTags extends React.Component<SelectedTagsProps> {
  componentDidMount () {
    this.componentDidUpdate();
  }

  componentDidUpdate () {
    if (this.props.onWidthChange) {
      this.refs.ul['scrollLeft'] = 9999;
    setTimeout(() => {
      this.props.onWidthChange(this.refs.ul['clientWidth']);
    }, 0);
    }
  }

  shouldComponentUpdate (np) {
    let tp = this.props;
    return (tp.tags !== np.tags || tp.reject !== np.reject);
  }

  render () {
    const { tags, reject } = this.props;

    return (
      <div className={th.TagsControl__SelectedTags} ref='ul'>
        {reject.map(tag =>
          <MicroTag
            alt={true}
            key={tag}
            tag={tag}
            onDelete={this.props.onRemoveReject}/>
        )}
        {tags.map(tag =>
          <MicroTag
            key={tag}
            tag={tag}
            onDelete={this.props.onRemove}/>
        )}
      </div>
    );
  }
}
