import { showLightbox } from 'stores/actions'
var connect = require('react-redux').connect
var t = React.PropTypes

class ImagesColumn extends React.Component {
  static noOverflowContainer = true

  static propTypes = {
    thumbnail: t.string,
    images: t.arrayOf(t.string)
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

export default connect()(ImagesColumn)
