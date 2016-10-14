import React, { Component, PropTypes as t } from 'react'
import { connect } from 'react-redux'
import { encode } from 'shared/lib/b64FilterGenerator'
import router from 'src/app/routes'
import config from 'src/app/config'
import { createFilter, updateFilter, destroyFilter, changeAttr } from '../reducer'
import { setOption } from 'shared/reducers/optionsReducer'
import generateAutoTitle from '../../lib/generateAutoTitle'
import SFilterForm from './SFilterForm'
import SFilterFormSimple from './SFilterFormSimple'

@connect((s) => ({
  filter: s.filter,
  tags: s.tags,
  dirty: s.sfilter.dirty,
  sfilter: s.sfilter.stageData,
  currentUser: s.auth.currentUser,
  advancedMode: s.options.sFilterAdvancedMode
}), {
  createFilter,
  updateFilter,
  destroyFilter,
  changeAttr,
  setOption
})
export default class SFilterEditor extends Component {
  static propTypes = {
    filter: t.object.isRequired,
    tags: t.array.isRequired,
    createFilter: t.func.isRequired,
    updateFilter: t.func.isRequired,
    destroyFilter: t.func.isRequired,
    changeAttr: t.func.isRequired,
    setOption: t.func.isRequired,
    advancedMode: t.bool,
    dirty: t.bool,
    sfilter: t.shape({
      sid: t.string,
      name: t.string,
      userSlug: t.string,
      officialSlug: t.string
    }),
    currentUser: t.shape({
      id: t.number.isRequired,
      isAdmin: t.bool.isRequired
    })
  }

  state = {
    saveToAccount: true
  }

  setAdvancedMode = (ev) => {
    this.props.setOption('sFilterAdvancedMode', ev.target.checked)
  }

  generateAutoTitle () {
    let autotitle = generateAutoTitle(
      this.props.filter,
      undefined,
      {tags: this.props.tags}
    )

    if (autotitle) autotitle = autotitle.replace(/<(?:.|\n)*?>/gm, '')
    return autotitle ? 'Default: ' + autotitle : null
  }

  officialUrl () {
    if (this.props.sfilter.officialSlug) {
      return config.origin + router.url('filterOfficial', this.props.sfilter.officialSlug)
    } else {
      return ''
    }
  }

  sidUrl () {
    if (this.props.sfilter.sid) {
      return config.origin + router.url('filterSid', this.props.sfilter.sid)
    } else {
      return ''
    }
  }

  b64Url () {
    return config.origin + router.url('filterB64', encode(this.props.filter))
  }

  appropiateFilterUrl () {
    return this.officialUrl() || this.sidUrl() || this.b64Url()
  }

  onSubmit = (createNew) => {
    if (createNew) {
      this.props.createFilter()
    } else {
      this.props.updateFilter()
    }
  }

  onToggleAccountSave = (val) => {
    this.setState({saveToAccount: val})
  }

  render () {
    let { dirty, sfilter, currentUser, advancedMode } = this.props
    let { saveToAccount } = this.state

    let autotitle = this.generateAutoTitle()

    return (
      <div className='sfilter-editor form'>
        <div className='form-input form-input-checkbox'>
          <label>
            Advanced mode
            <input type='checkbox' checked={advancedMode} onChange={this.setAdvancedMode}/>
          </label>
        </div>
        { advancedMode ? (
          <SFilterForm
            autotitle={autotitle}
            dirty={dirty}
            sfilter={sfilter}
            currentUser={currentUser}
            dynamicUrl={this.b64Url()}
            fixedUrl={this.sidUrl()}
            officialUrl={this.officialUrl()}
            saveToAccount={saveToAccount}
            onChange={this.props.changeAttr}
            onSubmit={this.onSubmit}
            onDestroy={this.props.destroyFilter}
            onToggleAccountSave={this.onToggleAccountSave}/>
        ) : (
          <SFilterFormSimple
            dirty={dirty}
            url={this.appropiateFilterUrl()}
            onSubmit={this.onSubmit.bind(this, true)}/>
        )}

      </div>
    )
  }
}
