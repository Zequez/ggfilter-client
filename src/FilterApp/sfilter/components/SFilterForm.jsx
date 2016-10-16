import React, { PropTypes as t, Component } from 'react'
import cn from 'classnames'
import ConfirmDeleteButton from './ConfirmDeleteButton'

export default class SFilterForm extends Component {
  static propTypes = {
    autotitle: t.string,
    dirty: t.bool.isRequired,
    sfilter: t.shape({
      sid: t.string,
      name: t.string,
      userSlug: t.string,
      officialSlug: t.string
    }).isRequired,
    currentUser: t.shape({
      isAdmin: t.bool
    }),
    dynamicUrl: t.string.isRequired,
    fixedUrl: t.string.isRequired,
    officialUrl: t.string.isRequired,
    saveToAccount: t.bool.isRequired,
    onChange: t.func.isRequired,
    onSubmit: t.func.isRequired,
    onDestroy: t.func.isRequired,
    onToggleAccountSave: t.func.isRequired
  }

  setAttr = (attr, ev) => {
    this.props.onChange(attr, ev.target.value)
  }

  selectAll (ev) {
    ev.target.select()
  }

  copyToClipboard (ev) {
    ev.target.previousSibling.select()
    document.execCommand('copy')
  }

  update = () => {
    this.props.onSubmit(false)
  }

  create = () => {
    this.props.onSubmit(true)
  }

  destroy = () => {
    this.props.onDestroy()
  }

  onToggleAccountSave = (ev) => {
    this.props.onToggleAccountSave(!ev.target.checked)
  }

  render () {
    let { dirty, sfilter: sf, currentUser, autotitle, dynamicUrl, fixedUrl, saveToAccount } = this.props
    let existingRecord = !!sf.sid

    return (
      <div className={cn('sfilter-form', {'sfilter-form-update': dirty})}>
        {existingRecord && dirty ? (
          <p className='form-text sfilter-form-text-dirty'>
            <i className='fa icon-warning'></i> The current filter was modified and is unsaved
          </p>
        ) : null}
        <div className='form-input form-input-with-button'>
          <label>Dynamic URL:</label>
          <input
            type='text'
            value={dynamicUrl}
            onClick={this.selectAll}
            readOnly={true}/>
          <button className='btn' onClick={this.copyToClipboard}>Copy</button>
          <p className='form-input-hint'>This URL reflects the current filter, even when unsaved</p>
        </div>
        <div className='form-input form-input-with-button'>
          <label>Fixed URL:</label>
          <input
            type='text'
            value={fixedUrl}
            onClick={this.selectAll}
            readOnly={true}/>
          <button className='btn' disabled={!fixedUrl} onClick={this.copyToClipboard}>Copy</button>
          <p className='form-input-hint'>You need to save the filter for this URL to reflect the changes</p>
        </div>
        <div className='form-input'>
          <label>Name:</label>
          <input
            type='text'
            placeholder={autotitle}
            value={sf.name || ''}
            onChange={this.setAttr.bind(this, 'name')}/>
        </div>
        {currentUser && currentUser.isAdmin ? (
          <div className='form-input'>
            <label>Official Slug:</label>
            <input
              type='text'
              value={sf.officialSlug || ''}
              onChange={this.setAttr.bind(this, 'officialSlug')}/>
          </div>
        ) : null}
        {/*<div className='form-input form-input-checkbox'>
          <label>
            {currentUser ? 'Save to your account' : 'Log-in or sign-up to save to your account'}
            <input type='checkbox' checked={saveToAccount} onChange={this.onToggleAccountSave}/>
          </label>
        </div>*/}
        <div className='form-actions'>
          {existingRecord && currentUser ? <ConfirmDeleteButton onConfirm={this.destroy}/> : null}
          {existingRecord
            ? <button className='btn' onClick={this.update} disabled={!dirty}>Save</button>
            : null}
          <button className='btn' onClick={this.create} disabled={!dirty}>
            {existingRecord ? 'Save as new' : 'Save'}
          </button>
        </div>
      </div>
    )
  }
}
