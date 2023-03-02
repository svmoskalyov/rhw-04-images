import { Component } from 'react';
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

export class App extends Component {
  state = {
    request: '',
    images: [],
    error: null,
    status: Status.IDLE,
    page: 1,
    totalPages: 1,
  };

  componentDidUpdate(_, prevState) {
    const { request, page } = this.state;
    const prevRequest = prevState.request;
    const prevPage = prevState.page;
    const nextRequest = request;
    const nextPage = page;

    if (prevRequest !== nextRequest) {
      this.setState({ images: [], page: 1, totalPages: 1 });
    }

    if (prevRequest !== nextRequest || prevPage !== nextPage) {
      this.getSearchImage();
    }
  }

  handleFormSubmit = request => {
    this.setState({ request });
  };

  getSearchImage = async () => {
    const { request, page } = this.state;

    try {
      this.setState({ status: Status.PENDING });
      const images = await fetchImage(request, page);

      if (images.total === 0) {
        toast.info('No images found. Please submit another query!');
        this.setState({ status: Status.REJECTED });
        return;
      }

      if (images.total <= 12) {
        this.setState({
          images: images.hits,
          status: Status.RESOLVED,
        });
      } else {
        this.setState(prevState => ({
          images: [...prevState.images, ...images.hits],
          totalPages: Math.ceil(images.total / 12),
          status: Status.RESOLVED,
        }));

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
      this.setState({ error, status: Status.REJECTED });
      toast.error(error.message);
    }
  };

  onClickLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, status, page, totalPages } = this.state;

    return (
      <Box display="grid" gridTemplateColumns="1fr" gridGap={4} pb={5}>
        <Searchbar onSubmit={this.handleFormSubmit} />

        {images.length > 0 && <ImageGallery photos={images} />}

        {status === Status.PENDING && <Loader />}

        {page < totalPages && (
          <Button
            icon={AiOutlineDownload}
            onClick={this.onClickLoadMore}
            aria-label="button load more"
          >
            Load more
          </Button>
        )}

        <ToastContainer
          autoClose={3000}
          theme="colored"
          position="top-center"
        />
      </Box>
    );
  }
}
