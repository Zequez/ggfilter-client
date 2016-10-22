import React, { PropTypes as t, Component } from 'react'
import { connect } from 'react-redux'
import generateAutoTitle from '../lib/generateAutoTitle'
import { finalFilterSelector, isDirtySelector, staticSlugSelector } from '../filter/selectors'
import staticFilters from '../config/staticFilters'

@connect((s) => ({
  isDirty: isDirtySelector(s),
  filter: finalFilterSelector(s),
  staticSlug: staticSlugSelector(s),
  // filterName: s.sfilter.data.name,
  tags: s.tags
}))
export default class FilterTitle extends Component {
  static propTypes = {
    isDirty: t.bool,
    filter: t.object,
    // filterName: t.string,
    staticSlug: t.string,
    tags: t.array
  }

  generateAutoTitle () {
    if (!this.props.isDirty) return null
    return generateAutoTitle(
      this.props.filter,
      undefined,
      {tags: this.props.tags}
    )
  }

  dangerousMarkup (autotitle) {
    return {__html: `“${autotitle}”`}
  }

  render () {
    let { staticSlug } = this.props
    let autotitle = staticSlug ? staticFilters[staticSlug].title : this.generateAutoTitle()

    return (
      <div className='filter-title'>
        {autotitle ? (
          <span dangerouslySetInnerHTML={this.dangerousMarkup(autotitle)}></span>
        ) : (
          <h1 title="We have no proof whatsoever of this claim, but we really aspire to!">
            {"The Internet's Nº1 source to find good games, *allegedly*"}
          </h1>
        )}
      </div>
    )
  }
}
