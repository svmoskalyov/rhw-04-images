import { useState, useEffect, useCallback } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { AiOutlineDownload } from 'react-icons/ai';
import { Box } from './Box';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { fetchImage } from 'services/api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  REJECTED: 'rejected',
  RESOLVED: 'resolved',
};

export function App() {
  const [request, setRequest] = useState('');
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState(Status.IDLE);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleFormSubmit = request => {
    setImages([]);
    setPage(1);
    setTotalPages(1);
    setRequest(request);
  };

  // Variant-1
  const getSearchImage = useCallback(async () => {
    try {
      setStatus(Status.PENDING);
      const imgs = await fetchImage(request, page);

      if (imgs.total === 0) {
        toast.info('No images found. Please submit another query!');
        setStatus(Status.REJECTED);
        return;
      }

      if (imgs.total <= 12) {
        setImages(imgs.hits);
        setStatus(Status.RESOLVED);
      } else {
        setImages(prevImage => [...prevImage, ...imgs.hits]);
        setTotalPages(Math.ceil(imgs.total / 12));
        setStatus(Status.RESOLVED);

        if (page > 1) {
          setTimeout(() => {
            window.scrollBy({
              top: 500,
              behavior: 'smooth',
            });
          }, 500);
        }
      }
    } catch (error) {
      setStatus(Status.REJECTED);
      toast.error(error.message);
    }
  }, [page, request]);

  useEffect(() => {
    if (!request) {
      return;
    }

    getSearchImage();
  }, [getSearchImage, request]);

  // Variant-2
  // useEffect(() => {
  //   if (!request) {
  //     return;
  //   }
  //   const getSearchImage = async () => {
  //     try {
  //       setStatus(Status.PENDING);
  //       const imgs = await fetchImage(request, page);
  //       if (imgs.total === 0) {
  //         toast.info('No images found. Please submit another query!');
  //         setStatus(Status.REJECTED);
  //         return;
  //       }
  //       if (imgs.total <= 12) {
  //         setImages(imgs.hits);
  //         setStatus(Status.RESOLVED);
  //       } else {
  //         setImages(prevImage => [...prevImage, ...imgs.hits]);
  //         setTotalPages(Math.ceil(imgs.total / 12));
  //         setStatus(Status.RESOLVED);
  //         if (page > 1) {
  //           setTimeout(() => {
  //             window.scrollBy({
  //               top: 500,
  //               behavior: 'smooth',
  //             });
  //           }, 500);
  //         }
  //       }
  //     } catch (error) {
  //       setStatus(Status.REJECTED);
  //       toast.error(error.message);
  //     }
  //   };

  //   getSearchImage();
  // }, [page, request]);

  const onClickLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <Box display="grid" gridTemplateColumns="1fr" gridGap={4} pb={5}>
      <Searchbar onSubmit={handleFormSubmit} />
      {images.length > 0 && <ImageGallery photos={images} />}
      {status === Status.PENDING && <Loader />}
      {page < totalPages && (
        <Button
          icon={AiOutlineDownload}
          onClick={onClickLoadMore}
          aria-label="button load more"
        >
          Load more
        </Button>
      )}
      <ToastContainer autoClose={3000} theme="colored" position="top-center" />
    </Box>
  );
}
