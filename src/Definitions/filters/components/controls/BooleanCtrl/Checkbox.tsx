import * as React from 'react';
import * as th from './BooleanCtrl.sass';
import * as cx from 'classnames';

import enumColumns from '../../../../enumColumns';
import TooltipLabel from './TooltipLabel';
import Icon from 'shared/components/Icon';

type CheckboxProps = {
  value: boolean;
  onChange: (value: boolean) => void;
  enumType: string;
  name: string;
};

export default class Checkbox extends React.Component<CheckboxProps> {
  onChange = (ev) => {
    this.props.onChange(ev.target.checked);
  }

  render () {
    let { value, enumType, name } = this.props;

    let title = enumColumns[enumType][name];
    let icon = `boolean-${enumType}-${name}`;
    let className = cx(th.BooleanCtrl__Checkbox, {
      [th.BooleanCtrl__Checkbox_checked]: value
    });

    return (
      <TooltipLabel
        className={className}
        tooltip={title}
        rippleDisabled={value}>
        <input
          className={th.BooleanCtrl__Input}
          type='checkbox'
          checked={value}
          onChange={this.onChange}/>
        <Icon icon={icon} className={th.BooleanCtrl__Icon}/>
        <span className={th.BooleanCtrl__Title}>{title}</span>
      </TooltipLabel>
    );
  }
}
