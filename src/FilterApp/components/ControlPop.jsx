import th from './ControlPop.sass'
import React, { Component, PropTypes as t } from 'react'
import Button from 'shared/components/Button'
import PopCard from 'shared/components/PopCard'
import ToggleIcon from 'shared/components/ToggleIcon'
import { bindGlobalKeyOnce } from 'shared/lib/utils'

import Control from './Control'
import QueryChip from './QueryChip'

export default class ControlPop extends Component {
  static propTypes = {
    control: t.object.isRequired,
    query: t.object,
    onChange: t.func,
    onHlChange: t.func,
    onClose: t.func.isRequired,
    isHighlighted: t.bool.isRequired,
    target: t.object.isRequired // Dom node
  }

  state = {
    hl: null,
    query: null
  }

  globalKeyUnbind = null
  componentWillMount () {
    this.setState({
      hl: this.props.isHighlighted,
      query: this.props.query
    })
    this.globalKeyUnbind = bindGlobalKeyOnce(13, () => this.onClickApply())
  }

  componentWillUnmount () {
    this.globalKeyUnbind()
  }

  portalDidMount = () => {
    this.refs.control && this.refs.control.focus()
  }

  close = () => {
    this.refs.popCard.close()
  }

  onClickHighlight = () => {
    this.setState({hl: !this.state.hl})
  }

  onClickClear = () => {
    this.props.onHlChange(false)
    this.props.onChange(null)
    this.close()
  }

  onClickShortcut = (query) => {
    this.props.onHlChange(this.state.hl)
    this.props.onChange(query)
    this.close()
  }

  onControlChange = (query) => {
    this.setState({query})
  }

  onClickApply = () => {
    this.props.onHlChange(this.state.hl)
    this.props.onChange(this.state.query)
    this.close()
  }

  render () {
    const { target, control, onClose, ...other } = this.props
    const { hl, query } = this.state

    const shortcuts = control.shortcuts.map((shortcutQuery, i) => (
      <QueryChip
        key={i}
        tooltipPre={false}
        icon={false}
        hl={hl}
        control={control}
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
            <span className={th.ControlPop__title}>{control.title}</span>
            <ToggleIcon
              tooltip={hlButtonTooltip}
              className={th.ControlPop__ToggleIcon}
              icon={'highlight'}
              checked={hl}
              onClick={this.onClickHighlight}/>
          </div>
          {control.control !== false ? (
            <div className={th.ControlPop__body}>
              <Control {...other} filter={control} query={query} onChange={this.onControlChange} ref='control'/>
            </div>
          ) : null }
          { shortcuts.length ? (
            <div className={th.ControlPop__shortcuts}>
              {shortcuts}
            </div>
          ) : null}
          <div className={th.ControlPop__actions}>
            <Button flat disabled={query === true} label='Clear' onClick={this.onClickClear}/>
            <Button
              flat
              label='Done'
              onClick={this.onClickApply}
              className={th.ControlList__ControlPop__closeButton}/>
          </div>
        </div>
      </PopCard>
    )
  }
}
