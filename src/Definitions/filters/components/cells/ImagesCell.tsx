import * as React from 'react';
import * as th from './columns.sass';

interface ImagesCellProps {
  thumbnail: string;
  images: string[];
  setLightbox: (images: string[], thumbnails: string[]) => void;
}

export class ImagesCell extends React.Component<ImagesCellProps> {
  static noOverflowContainer = true;
  static lightbox = true;


  static defaultProps = { images: [] };

  lightbox = () => {
    this.props.setLightbox(this.props.images, this.imagesThumbnails());
  }

  imagesThumbnails () {
    return this.props.images.map((src) => {
      return src.replace(/\.jpg/, '.116x65.jpg');
    });
  }

  thumbnail () {
    return this.props.thumbnail ? this.props.thumbnail : this.imagesThumbnails()[0];
  }

  render () {
    return (
      <div className={th.ImagesCell}>
        <div className={th.ImagesCell__cropper}>
          <img src={this.thumbnail()} onClick={this.lightbox}/>
        </div>
      </div>
    );
  }
}
