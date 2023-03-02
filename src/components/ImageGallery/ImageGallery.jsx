import { ImageList } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ photos }) => {
  return (
    <ImageList>
      {photos.map(({ id, ...other }) => (
        <ImageGalleryItem key={id} photo={other} />
      ))}
    </ImageList>
  );
};
