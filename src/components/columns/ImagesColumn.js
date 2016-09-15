import React, { Component, PropTypes as t } from 'react'
import { showLightbox } from 'stores/reducers/lightboxReducer'

class ImagesColumn extends Component {
  static noOverflowContainer = true

  static propTypes = {
    thumbnail: t.string,
    images: t.arrayOf(t.string),
    dispatch: t.func.isRequired,
  }

  static defaultProps = { images: [] }

  showLightbox = ()=>{
    this.props.dispatch(showLightbox(this.props.images, this.imagesThumbnails()))
  }

  imagesThumbnails() {
    return this.props.images.map((src)=>{
      return src.replace(/\.jpg/, '.116x65.jpg')
    })
  }

  thumbnail() {
    return this.props.thumbnail ? this.props.thumbnail : this.imagesThumbnails()[0]
  }

  render() {
    return (
      <div>
        <img src={this.thumbnail()} onClick={this.showLightbox}/>
      </div>
    )
  }
}

export default ImagesColumn
