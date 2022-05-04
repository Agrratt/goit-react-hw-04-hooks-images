import { useEffect, useState } from "react";
import { ToastContainer } from 'react-toastify';
import { animateScroll as scroll } from 'react-scroll';
import {fetchApi} from 'services/api';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import { Container } from 'components/App.styled';

export function App() {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [openModalImg, setOpenModalImg] = useState(null);
  const [error, setError] = useState(null)

  useEffect(() => {
    if (searchQuery === '') {
      return
    };

    setStatus('pending');
   
    fetchApi(page, searchQuery)
      .then(
        responseImages => {
          setImages(prevImages => [...prevImages, ...responseImages]);
          setStatus('resolved');
        })
      .catch(error => {
        setError(error);
        setStatus('rejected'); 
      });
    // return fetchApi(page, searchQuery);
  }, [page, searchQuery]);

  
  const handleSerchSubmit = (newQuery) => {
    if (searchQuery !== newQuery) {
      setSearchQuery(newQuery);
      setPage(1);
      setImages([]);
    }  
  };

  const loadMore = () => {
    setPage((prevPage) =>  prevPage + 1);
    
    scrollWindow();
};

  const scrollWindow = () => {
    scroll.scrollToBottom({
      offset: 100,
      smooth: true,
    });
  };
    
const toggleModal = () => {
    setShowModal(showModal => !showModal)
  };

  return (
      <Container>
        <Searchbar onSubmit={handleSerchSubmit} />
        {images.length > 0 && <ImageGallery images={images} onClickImage={toggleModal} openModalImg={setOpenModalImg} />}
        {status === 'rejected' && <h1>{searchQuery} - {error.message }</h1>}
        {status === 'pending' && <Loader />}
        {images.length > 0 && <Button loadMore={loadMore}/>}
        {showModal && <Modal
          largeImage={openModalImg}
          onClose={toggleModal} />}
          
        <ToastContainer autoClose={3000} />
      </Container>
    );
}

// export class OldApp extends Component {
  // state = {
    // images: [],
    // searchQuery: '',
    // status: 'idle',
    // page: '',  
    // showModal: false,
  //   openModalImg: null
  // };

  // componentDidUpdate(prevProps, { page, searchQuery }) {
  //   if (searchQuery !== this.state.searchQuery || page !== this.state.page) {
      
  //     return this.getFetchImages(page, searchQuery);
  //   }
  // };

  // getFetchImages = () => {
  //   const { page, searchQuery } = this.state;

  //   this.setState({ status: 'pending' });
    
  //   fetchApi(page, searchQuery)
  //     .then(res => {
  //       this.setState(prevState => ({
  //         images: [...prevState.images, ...res],
  //         status: 'resolved'
  //       }));
  //     })
  //     .catch(error =>
  //       this.setState({ error, status: 'rejected' }));
  // };

  // handleSerchSubmit = (newQuery) => {
  //   if (this.state.searchQuery !== newQuery) {
  //     this.setState({
  //     searchQuery: newQuery,
  //       page: 1,
  //     images: []
  //   });
  //   }  
  // };

  // loadMore = () => {
  //   this.setState(prevState => {
  //     return {
  //       ...prevState,
  //       page: prevState.page + 1,
  //     };
  //   });
  //   this.scrollWindow();
  // };

  // scrollWindow = () => {
  //   scroll.scrollToBottom({
  //     offset: 100,
  //     smooth: true,
  //   });
  // };

  // toggleModal = () => {
  //   this.setState(({showModal}) => ({
  //     showModal: !showModal
  //   }))
  // };

  // openModalImg = image => {
  //   this.setState({ openModalImg: image });
  // };
  

  // render() {
    // const { images, searchQuery, status, showModal, openModalImg } = this.state;
    
    // return (
    //   <Container>
    //     <Searchbar onSubmit={this.handleSerchSubmit} />
    //     {images.length > 0 && <ImageGallery images={images} onClickImage={this.toggleModal} openModalImg={this.openModalImg} />}
    //     {status === 'rejected' && <h1>{searchQuery}{this.state.error.message }</h1>}
    //     {status === 'pending' && <Loader />}
    //     {images.length > 0 && <Button loadMore={ this.loadMore}/>}
    //     {showModal && <Modal
    //       largeImage={openModalImg}
    //       onClose={ this.toggleModal} />}
          
    //     <ToastContainer autoClose={3000} />
    //   </Container>
    // );
    
  // }
  
// };
