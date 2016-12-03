import th from './input.sass'
import React, { PropTypes as t, Component } from 'react'
import cx from 'classnames'

export default class Input extends Component {
  static propTypes = {
    onChange: t.func,
    className: t.string,
    hint: t.string
  }

  onChange = (ev) => {
    if (this.props.onChange) this.props.onChange(ev.target.value)
  }

  render () {
    let { className, value, hint, ...other } = this.props
    let classes = cx(th.Input, {
      [className]: !!className,
      [th.Input_withText]: !!value
    })

    return (
      <div className={classes}>
        <input
          type='text'
          className={th.Input__input}
          {...other}
          value={value}
          onChange={this.onChange}/>
        <div className={th.Input__focusLine}></div>
        { hint
          ? <div className={th.Input__hint}>{hint}</div>
          : null }
      </div>
    )
  }
}
