import theme from './Input.sass'
import React, { PropTypes as t, Component } from 'react'
import { themeExtender } from 'shared/lib/utils/misc'
import cx from 'classnames'

export const inputWithTheme = (th, extend) => {
  th = themeExtender(theme, th, extend)

  return class Input extends Component {
    static propTypes = {
      onChange: t.func,
      className: t.string,
      hint: t.string,
      prefix: t.string,
      suffix: t.string,
      label: t.string,
      disable: t.bool
    }

    onChange = (ev) => {
      if (this.props.onChange) this.props.onChange(ev.target.value)
    }

    focus () {
      // We should not need this, it's called after being mounted :S
      setTimeout(() => { this.refs.input.focus() }, 10)
    }
    select () { this.refs.input.select() }

    render () {
      let { className, value, hint, prefix, suffix, label, disabled, ...other } = this.props
      let classes = cx(th.Input, {
        [className]: !!className,
        [th.Input_withText]: !!value,
        [th.Input_disabled]: !!disabled
      })

      return (
        <div className={classes}>
          <div className={th.Input__alignContainer}>

            <input
              type='text'
              className={th.Input__input}
              ref='input'
              disabled={disabled}
              {...other}
              value={value || ''}
              onChange={this.onChange}/>
            <div className={th.Input__prefixContainer}>
              { prefix
                ? <span className={th.Input__prefix}>{prefix}</span>
                : null }
              { hint
                ? <div className={th.Input__hint}>{hint}</div>
                : null }
              { label
                ? <div className={th.Input__label}>{label}</div>
                : null }
            </div>
            { suffix
              ? <div className={th.Input__suffix}>{suffix}</div>
              : null }
            <div className={th.Input__focusLine}></div>
          </div>
        </div>
      )
    }
  }
}

export default inputWithTheme(theme)
