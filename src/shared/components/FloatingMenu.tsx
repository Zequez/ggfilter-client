import * as React from 'react';
import * as th from './FloatingMenu.sass';
import * as cx from 'classnames';
import Button from './Button';
import { onClickOutsideOnce } from 'shared/lib/utils';

type OptionVal = string | number;
type FloatingMenuProps = {
  options: [OptionVal, OptionVal][];
  selected: OptionVal;
  onSelect: (OptionVal) => void;
  onAltAction?: (OptionVal) => void;
  onClose?: () => void;
  style?: {};
  className?: string;
};

export default class FloatingMenu extends React.Component<FloatingMenuProps> {
  onClickOutsideOnce (cb) {
    onClickOutsideOnce(this.refs.ul, cb);
  }

  onClick (value: OptionVal, ev: React.MouseEvent<HTMLElement>) {
    this.props.onSelect(value);
    ev.stopPropagation();
  }

  onAltAction (value: OptionVal, ev: React.MouseEvent<HTMLElement>) {
    this.props.onAltAction(value);
    ev.stopPropagation();
  }

  render () {
    let klass = cx(th.FloatingMenu, this.props.className);

    return (
      <ul className={klass} style={this.props.style} ref='ul'>
        {this.props.options.map(([label, value]) => (
          <li
            key={value}
            onClick={(ev) => this.onClick(value, ev)}
            className={cx(th.FloatingMenu__Item, {
              [th.FloatingMenu__Item_selected]: value === this.props.selected
            })}
          >
            <span>{label}</span>
            {this.props.onAltAction ?
              <Button primary={false} mini={true} onClick={(ev) => this.onAltAction(value, ev)}>Exclude</Button>
            : null}
          </li>
        ))}
      </ul>
    )
  }
}
