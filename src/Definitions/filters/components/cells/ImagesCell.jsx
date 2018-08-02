import th from './columns.sass'
import React, { Component, PropTypes as t } from 'react'
import { connect } from 'react-redux'

@connect()
export class ImagesCell extends Component {
  static noOverflowContainer = true
  static lightbox = true

  static propTypes = {
    thumbnail: t.string,
    images: t.arrayOf(t.string),
    lightbox: t.func.isRequired
  }

  static defaultProps = { images: [] }

  lightbox = () => {
    this.props.lightbox(this.props.images, this.imagesThumbnails())
  }

  imagesThumbnails () {
    return this.props.images.map((src) => {
      return src.replace(/\.jpg/, '.116x65.jpg')
    })
  }

  thumbnail () {
    return this.props.thumbnail ? this.props.thumbnail : this.imagesThumbnails()[0]
  }

  render () {
    return (
      <div className={th.ImagesCell}>
        <div className={th.ImagesCell__cropper}>
          <img src={this.thumbnail()} onClick={this.lightbox}/>
        </div>
      </div>
    )
  }
}
