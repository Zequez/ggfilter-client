import * as theme from './Input.sass';
import * as React from 'react';
import { themeExtender } from 'shared/lib/utils/misc';
import * as cx from 'classnames';

type InputPropTypes = {
  onChange: (value: string) => void;
  className?: string;
  hint?: string;
  prefix?: string;
  suffix?: string;
  label?: string;
  disabled?: boolean;
  value?: string;
  style?: any;
  onKeyDown?: any
  onBlur?: any;
};

export const inputWithTheme = (th: {[K in keyof typeof theme]: string}) => {
  th = themeExtender(theme, th);

  return class Input extends React.Component<InputPropTypes, null> {
    private input: HTMLInputElement;

    onChange = (ev: React.SyntheticEvent<HTMLInputElement>) => {
      if (this.props.onChange) this.props.onChange(ev.currentTarget.value);
    }

    focus () {
      // We should not need this, it's called after being mounted :S
      setTimeout(() => { this.input.focus(); }, 10);
    }
    select () { this.input.select(); }

    render () {
      let { className, value, hint, prefix, suffix, label, disabled, ...other } = this.props;
      let classes = cx(th.Input, {
        [className]: !!className,
        [th._withText]: !!value,
        [th._disabled]: !!disabled
      });

      return (
        <div className={classes}>
          <div className={th.__alignContainer}>
            <input
              type='text'
              className={th.__input}
              ref={(input) => { this.input = input; }}
              disabled={disabled}
              {...other}
              value={value || ''}
              onChange={this.onChange}/>
            <div className={th.__prefixContainer}>
              { prefix
                ? <span className={th.__prefix}>{prefix}</span>
                : null }
              { hint
                ? <div className={th.__hint}>{hint}</div>
                : null }
              { label
                ? <div className={th.__label}>{label}</div>
                : null }
            </div>
            { suffix
              ? <div className={th.__suffix}>{suffix}</div>
              : null }
            <div className={th.__focusLine}></div>
          </div>
        </div>
      );
    }
  };
};

export default inputWithTheme(theme);
