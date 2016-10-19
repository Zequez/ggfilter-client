import React, { PropTypes as t, Component } from 'react'
import { connect } from 'react-redux'
import generateAutoTitle from '../lib/generateAutoTitle'
import { filterSelector } from '../filter/newSelectors'

@connect((s) => ({
  filter: filterSelector(s),
  filterName: s.sfilter.data.name,
  tags: s.tags
}))
export default class FilterTitle extends Component {
  static propTypes = {
    filter: t.object,
    filterName: t.string,
    tags: t.array
  }

  generateAutoTitle () {
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
    let autotitle = this.props.filterName || this.generateAutoTitle()

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
