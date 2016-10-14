import React, { Component, PropTypes as t } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { loopNumber } from 'shared/lib/utils'

import { getMedia, getThumbs } from '../selectors'
import { showLightbox } from '../reducer'

export class Lightbox extends Component {
  static propTypes = {
    media: t.arrayOf(t.string).isRequired,
    thumbnails: t.arrayOf(t.string).isRequired,
    onClose: t.func
  }

  static defaultProps = {
    onClose: () => {}
  }

  state = { selected: 0 }

  componentDidMount () {
    window.addEventListener('keydown', this.onKeyDown)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps !== this.props) {
      this.setState({selected: 0})
    }
  }

  onClickThumbnail (i, ev) {
    this.setState({selected: i})
    ev.stopPropagation()
  }

  preventClick = (ev) => {
    ev.stopPropagation()
  }

  onKeyDown = (ev) => {
    let i = this.state.selected
    let key = ev.charCode || ev.keyCode
    switch (key) {
      case 97: // a
      case 37: // ArrowLeft
        i -= 2
      case 100: // d
      case 39:  // ArrowRight
        i = loopNumber(i, +1, this.props.media)
        this.setState({selected: i})
        break

      case 27: // Escape
        this.close()
        break
    }
  }

  close = () => {
    this.props.onClose()
  }

  render () {
    if (!this.props.media.length) return (<div></div>)

    var thumbnails = this.props.thumbnails.map((t, i) => {
      return (
        <li key={i} className={this.state.selected === i ? 'selected' : ''}>
          <img src={t} onClick={this.onClickThumbnail.bind(this, i)}/>
        </li>
      )
    })

    return (
      <div className='lightbox' onClick={this.close}>
        <div className='lightbox-media'>
          <img src={this.props.media[this.state.selected]} onClick={this.preventClick}/>
        </div>
        <ul className='lightbox-thumbnails'>
          {thumbnails}
        </ul>
      </div>
    )
  }
}

export default connect((s) => createStructuredSelector({
  media: getMedia,
  thumbnails: getThumbs
}), { onClose: showLightbox })(Lightbox)
