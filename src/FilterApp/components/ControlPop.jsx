import th from './ControlPop.sass'
import React, { Component, PropTypes as t } from 'react'
import Button from 'shared/components/Button'
import PopCard from 'shared/components/PopCard'
import ToggleIcon from 'shared/components/ToggleIcon'
import { isQueryEmpty } from '../lib/utils'

import Control from './Control'
import QueryChip from './QueryChip'

export default class ControlPop extends Component {
  static propTypes = {
    filter: t.object.isRequired,
    query: t.oneOfType([t.object, t.bool]).isRequired,
    onChange: t.func,
    onClose: t.func.isRequired,
    target: t.object.isRequired // Dom node
  }

  state = {
    hl: false
  }

  componentWillReceiveProps (props) {
    if (!isQueryEmpty(props.query) && this.state.hl !== !!props.query.hl) {
      this.setState({hl: !!props.query.hl})
    }
  }

  componentWillMount () {
    this.setState({
      hl: !isQueryEmpty(this.props.query) && !!this.props.query.hl
    })
  }

  portalDidMount = () => {
    this.refs.control && this.refs.control.focus()
  }

  close = () => {
    this.refs.popCard.close()
  }

  onChipClear = () => {
    this.props.onChange(true)
  }

  onClear = () => {
    this.props.onChange(true)
    this.close()
  }

  onClickHighlight = () => {
    let { query } = this.props
    let newHl = !this.state.hl
    this.setState({hl: newHl})
    if (!isQueryEmpty(query)) {
      this.props.onChange({...query, hl: newHl})
    }
  }

  onClickShortcut = (query) => {
    this.close()
    setTimeout(() => {
      this.onControlChange(query)
    }, 250)
  }

  onControlChange = (val) => {
    this.props.onChange(isQueryEmpty(val) ? val : {...val, hl: this.state.hl})
  }

  render () {
    const { target, filter, query, onClose, ...other } = this.props //eslint-disable-line no-unused-vars
    const { hl } = this.state

    const shortcuts = filter.shortcuts.map((shortcutQuery, i) => (
      <QueryChip
        key={i}
        tooltipPre={false}
        icon={false}
        filter={filter}
        query={shortcutQuery}
        className={th.ControlPop__Shortcut}
        onClick={this.onClickShortcut.bind(this, shortcutQuery)}/>
    ))

    const hlButtonTooltip = hl
      ? 'Switch from highlighting to filtering'
      : 'Switch from filtering to highlighting'

    return (
      <PopCard originTarget={target} ref='popCard' onClose={onClose} portalDidMount={this.portalDidMount}>
        <div className={th.ControlPop}>
          <div className={th.ControlPop__header}>
            <span className={th.ControlPop__title}>{filter.title}</span>
            <ToggleIcon
              tooltip={hlButtonTooltip}
              className={th.ControlPop__ToggleIcon}
              icon={'highlight'}
              checked={hl}
              onClick={this.onClickHighlight}/>
          </div>
          {filter.control !== false ? (
            <div className={th.ControlPop__body}>
              <Control {...other} filter={filter} query={query} onChange={this.onControlChange} ref='control'/>
            </div>
          ) : null }
          { shortcuts.length ? (
            <div className={th.ControlPop__shortcuts}>
              {shortcuts}
            </div>
          ) : null}
          <div className={th.ControlPop__actions}>
            <Button flat disabled={query === true} label='Clear' onClick={this.onClear}/>
            <Button
              flat
              label='Done'
              onClick={this.close}
              className={th.ControlList__ControlPop__closeButton}/>
          </div>
        </div>
      </PopCard>
    )
  }
}
