import React, { useState, useEffect } from 'react';
import { getPhoto } from '../services/api';
import { LoadMore } from './Button/Button';
import { Gallery } from './ImageGallery/ImageGallery';
import { GalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Loader } from './Loader/Loader';
import { ModalWindow } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';
import toast, { Toaster } from 'react-hot-toast';
export function App() {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('car');
  const [page, setPage] = useState(1);
  const [showLoadMoreButton, setShowLoadMoreButton] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [modalURL, setModalURL] = useState('');
  const [modalALT, setModalALT] = useState('');
  useEffect(() => {
   
      setIsLoading({ isLoading: true });
      getPhoto(searchQuery, page).then(response => {
        if (response.totalHits === 0) {
          console.log('oops');
          toast.error('Nothing found.');
        }
        setImages(prev => [...prev, ...response.hits]);

        if (response.hits.length < 12) {
          setShowLoadMoreButton(false);
        } else {
          setShowLoadMoreButton(true);
        }
      }).catch(error => {
       console.log(error);
      setError('oops🤷‍♀️ try reloading the page🤞');
    }).finally(()=>{
      setTimeout(() => {
        setIsLoading(false);
      }, '200');
    }  
    )
  }, [page, searchQuery]);

  const handleSubmit = e => {
    e.preventDefault();
    setSearchQuery(e.target.elements.query.value);
    setPage(1);
    setImages([]);
    e.target.elements.query.value = '';
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const toggleModal = (tag, img) => {
    setShowModal(prev => !prev.showModal);
    setModalURL(img ?? '');
    setModalALT(tag ?? '');
  };

  return (
    <div>
      <Searchbar handleSubmit={handleSubmit} />
      {error && <div>{error}</div>}
      {isLoading && <Loader />}
      <Toaster position="top-right" reverseOrder={false} />
      <Gallery>
        <GalleryItem items={images} toggleModal={toggleModal} />
      </Gallery>
      {showLoadMoreButton && <LoadMore handleLoadMore={handleLoadMore} />}
      {showModal && (
        <ModalWindow onClose={toggleModal}>
          <img src={modalURL} alt={modalALT} />
        </ModalWindow>
      )}
    </div>
  );
}
