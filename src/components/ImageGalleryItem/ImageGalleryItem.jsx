import { useState } from 'react';
import PropTypes from 'prop-types';
import { ImageItem, Image, ImageLarge } from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';

export function ImageGalleryItem({
  photo: { webformatURL, largeImageURL, tags },
}) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  return (
    <ImageItem>
      <Image src={webformatURL} alt={tags} onClick={toggleModal} />

      {showModal && (
        <Modal onClose={toggleModal}>
          <ImageLarge src={largeImageURL} alt={tags} />
        </Modal>
      )}
    </ImageItem>
  );
}

ImageGalleryItem.propTypes = {
  photo: PropTypes.object.isRequired,
};
