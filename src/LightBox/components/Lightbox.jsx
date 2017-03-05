import th from './Lightbox.sass'
import React, { Component, PropTypes as t } from 'react'
import { connect } from 'react-redux'
import { loopNumber } from 'shared/lib/utils'
import cx from 'classnames'

import { getMedia, getThumbs } from '../selectors'
import { showLightbox } from '../reducer'

@connect((s) => ({
  media: getMedia(s),
  thumbnails: getThumbs(s)
}), { onClose: showLightbox })
export default class Lightbox extends Component {
  static propTypes = {
    media: t.arrayOf(t.string).isRequired,
    thumbnails: t.arrayOf(t.string).isRequired,
    onClose: t.func
  }

  static defaultProps = {
    onClose: () => {}
  }

  state = {
    selected: 0,
    loading: true,
    alreadyLoaded: []
  }

  componentDidMount () {
    window.addEventListener('keydown', this.onKeyDown)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps !== this.props) {
      this.changeMedia(0, true)
    }
  }

  onClickThumbnail (i, ev) {
    this.changeMedia(i)
    ev.stopPropagation()
  }

  preventClick = (ev) => {
    ev.stopPropagation()
  }

  onKeyDown = (ev) => {
    if (!this.isVisible()) return

    let i = this.state.selected
    let key = ev.charCode || ev.keyCode
    switch (key) {
      case 97: // a
      case 37: // ArrowLeft
        i -= 2
      case 100: // d
      case 39:  // ArrowRight
        i = loopNumber(i, +1, this.props.media)
        this.changeMedia(i)
        break

      case 27: // Escape
        this.close()
        break
    }
  }

  changeMedia = (selected, reset = false) => {
    this.setState({
      selected: selected,
      loading: this.state.alreadyLoaded.indexOf(selected) === -1,
      alreadyLoaded: reset ? [] : this.state.alreadyLoaded
    })
  }

  close = () => {
    this.props.onClose()
  }

  finishedLoading = (index) => {
    if (this.state.loading) {
      let alreadyLoaded = this.state.alreadyLoaded.concat(index)
      this.setState({loading: false, alreadyLoaded})
    }
  }

  isVisible () {
    return this.props.media.length > 0
  }

  render () {
    const { media, thumbnails } = this.props
    const { selected, loading } = this.state

    if (!this.isVisible()) return (<div></div>)

    const thumbnailsElements = thumbnails.map((t, i) => (
      <li key={i} className={cx(
        th.Lightbox__thumbnail,
        {[th.Lightbox__thumbnail_selected]: selected === i})
      }>
        <img src={t} onClick={this.onClickThumbnail.bind(this, i)}/>
      </li>
    ))

    return (
      <div className={cx(th.Lightbox, {
        [th.Lightbox_loading]: loading
      })} onClick={this.close}>
        <div className={th.Lightbox__media}>
          <img
            src={media[selected]}
            onLoad={this.finishedLoading.bind(this, selected)}
            onClick={this.preventClick}/>
        </div>
        <ul className={th.Lightbox__thumbnails}>
          {thumbnailsElements}
        </ul>
      </div>
    )
  }
}
