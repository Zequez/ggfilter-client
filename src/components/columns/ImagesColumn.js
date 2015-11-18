import { showLightbox } from 'stores/actions'
var connect = require('react-redux').connect
var t = React.PropTypes

class ImagesColumn extends React.Component {
  static noOverflowContainer = true

  static propTypes = {
    value: t.arrayOf(t.string)
  }

  static defaultProps = { value: [] }

  showLightbox = ()=>{
    this.props.dispatch(showLightbox(this.props.value, this.thumbnails()))
  }

  thumbnails() {
    return this.props.value.map((src)=>{
      return src.replace(/\.jpg/, '.116x65.jpg')
    })
  }

  render() {
    let thumbnails = this.thumbnails()
    // {this.props.value.map((src, i)=>{
    //   return <img key={i} src={src} />
    // })}
    // let src = this.props.value
    // if (src && src.forEach) {
    //   src = src[0].replace(/\.jpg/, '.116x65.jpg')
    // }

    return (
      <div>
        <img src={thumbnails[0]} onClick={this.showLightbox}/>
      </div>
    )
  }
}

export default connect()(ImagesColumn)
