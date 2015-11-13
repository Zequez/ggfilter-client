export default class ImagesColumn extends React.Component {
  static noOverflowContainer = true

  render() {
    // {this.props.value.map((src, i)=>{
    //   return <img key={i} src={src} />
    // })}
    let src = this.props.value
    if (src && src.forEach) {
      src = src[0].replace(/\.jpg/, '.116x65.jpg')
    }

    return (
      <div>
        <img src={src}/>
      </div>
    )
  }
}
