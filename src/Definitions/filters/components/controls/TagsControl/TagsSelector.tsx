import * as React from 'react';
import * as th from './TagsControl.sass';

import { loopNumber } from 'shared/lib/utils';
import TagsFinder from 'shared/lib/TagsFinder';
import FloatingMenu from 'shared/components/FloatingMenu';

type TagsSelectorProps = {
  tags: string[];
  selectedTags: string[];
  search: string;
  onSelect: (tag: string) => void;
  onReject: (tag: string) => void;
  children: any;
};

type TagsSelectorState = {
  focusedTag: string;
  visible: boolean;
};

export default class TagsSelector extends React.Component<TagsSelectorProps, TagsSelectorState> {
  state = { focusedTag: null, visible: false };
  found: string[] = [];

  onKeyPress = (ev: React.KeyboardEvent<HTMLElement>) => {
    let tag = this.state.focusedTag;
    let key = ev.keyCode;
    switch (key) {
      // case 40: // Down
      //   i += 2
      // case 38: // Up
      //   i = loopNumber(i, -1, this.found)
      //   ev.preventDefault()
      //   this.setState({focusedTag: i})
      //   break
      case 13: // Enter
        this.select(tag, ev);
        break;
    }
  }

  onFocus = () => {
    this.setState({visible: true})
  }

  onBlur = () => {
    this.setState({visible: false})
  }

  onMouseOver = (tag) => {
    this.setState({focusedTag: tag})
  }

  select = (tag: string, ev?: React.KeyboardEvent<HTMLElement>) => {
    if (ev) ev.preventDefault();
    this.setState({focusedTag: null});
    this.props.onSelect(tag);
  }

  render () {
    let { tags, selectedTags, search, children } = this.props;
    let tagsFinder = new TagsFinder(tags, selectedTags);
    this.found = tagsFinder.match(search);
    let options = this.found.map((t) => [t, t] as [string, string]);

    return (
      <div
        className={th.TagsControl__TagsSelector}
        onBlur={this.onBlur}
        onFocus={this.onFocus}
        onKeyDown={this.onKeyPress}
      >
        {children}
        {this.found.length
          ? (
            <FloatingMenu
              className={th.TagsControl__FloatingMenu}
              options={options}
              selected={this.state.focusedTag}
              onSelect={this.select}
            />
          )
          : null }
      </div>
    )
  }
}
