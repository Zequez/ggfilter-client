import th from './input.sass'
import React, { PropTypes as t, Component } from 'react'
import cx from 'classnames'

export default class Input extends Component {
  static propTypes = {
    onChange: t.func,
    className: t.string,
    hint: t.string,
    prefix: t.string,
    suffix: t.string
  }

  onChange = (ev) => {
    if (this.props.onChange) this.props.onChange(ev.target.value)
  }

  focus () { this.refs.input.focus() }
  select () { this.refs.input.select() }

  render () {
    let { className, value, hint, prefix, suffix, label, ...other } = this.props
    let classes = cx(th.Input, {
      [className]: !!className,
      [th.Input_withText]: !!value
    })

    return (
      <div className={classes}>
        <div className={th.Input__alignContainer}>

          <input
            type='text'
            className={th.Input__input}
            ref='input'
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
