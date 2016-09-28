import React, { PropTypes as t, Component } from 'react'
import { connect } from 'react-redux'
import generateAutoTitle from 'lib/AutoTitle'

@connect((s) => ({
  filter: s.filter,
  tags: s.tags
}))
export default class FilterTitle extends Component {
  static propTypes = {

  }

  generateAutoTitle () {
    return generateAutoTitle(
      this.props.filter.params,
      undefined,
      {tags: this.props.tags}
    )
  }

  generateAutoTitleMarkup () {
    return {__html: `“${this.generateAutoTitle()}”`}
  }

  render () {
    let keys = Object.keys(this.props.filter.params)

    let title
    if (keys.length) {
      title = (
        <span dangerouslySetInnerHTML={this.generateAutoTitleMarkup()}></span>
      )
    } else {
      title = (
        <h1 title="We have no proof whatsoever of this claim, but we really aspire to!">
          {"The Internet's Nº1 source to find good games, *allegedly*"}
        </h1>
      )
    }

    return (
      <div className='filter-title'>
        {title}
      </div>
    )
  }
}
