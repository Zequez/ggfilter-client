import React, { Component, PropTypes as t } from 'react'
import { connect } from 'react-redux'
import router from 'src/app/routes'
import config from 'src/app/config'
import { createFilter, updateFilter, destroyFilter, changeAttr } from '../reducer'
import { setOption } from 'shared/reducers/optionsReducer'
import generateAutoTitle from '../../lib/generateAutoTitle'
import SFilterForm from './SFilterForm'
import SFilterFormSimple from './SFilterFormSimple'
import { appropiateFilterPath } from 'shared/lib/appropiateFilterPath'

const urls = require('../lib/urls')

const { filterSelector, encodedFilterSelector } = require('../../filter').selectors
const { isDirty, sfilterSelectorStage } = require('../selectors')

@connect((s) => ({
  filter: filterSelector(s),
  encodedFilter: encodedFilterSelector(s),
  tags: s.tags,
  dirty: isDirty(s),
  sfilter: sfilterSelectorStage(s),
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
    encodedFilter: t.string,
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

  b64Path () {
    console.log(this.props.encodedFilter)
    return router.url('filterB64', this.props.encodedFilter)
  }

  appropiateFilterUrl () {
    return config.origin + (appropiateFilterPath(this.props.sfilter) || this.b64Path())
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
    let { dirty, sfilter, currentUser, advancedMode, encodedFilter } = this.props
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
            dynamicUrl={urls.b64(encodedFilter)}
            fixedUrl={urls.sid(sfilter)}
            officialUrl={urls.official(sfilter)}
            saveToAccount={saveToAccount}
            onChange={this.props.changeAttr}
            onSubmit={this.onSubmit}
            onDestroy={this.props.destroyFilter}
            onToggleAccountSave={this.onToggleAccountSave}/>
        ) : (
          <SFilterFormSimple
            dirty={dirty}
            url={urls.appropiate(sfilter, encodedFilter)}
            onSubmit={this.onSubmit}/>
        )}

      </div>
    )
  }
}
