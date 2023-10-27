import React, { useEffect, useState } from "react";
import { getImage } from './api';
import { SearchBar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Loader } from "./Loader/Loader";
import { LoadMoreBtn } from "./Button/Button";
import { Layout } from "./layout";
import toast, { Toaster } from "react-hot-toast";



export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  // const [currentPage, setCurrentPage] = useState (0);
  const [totalPage, setTotalPage] = useState (0);
  const [isLoading, setIsLoading] = useState (false);
  const [error, setError] = useState (false);

  const onSubmitForm = value => {
    setQuery(value);
    if (query === value) {
      return;
    } else {
      setImages([]);
      setPage(1)
    }
  };

  const toLoadMore = () => {
    setPage(prevState => prevState.page + 1);
  };

useEffect(() => {
  if (query === '') {
    return;
  }
 const fetchImages = async() => {
   try {
    setError(false);
    setIsLoading(true);
    const data = await getImage(query, page);
    toast.success('Great!');
    setImages(prevState => [...prevState, ...data.hits]);
    setTotalPage(Math.ceil(data.totalHits / 12));
  } catch (error) {
    toast.error('Ooops! Error!');
  } finally {
    setIsLoading(false);
  }
} 
 fetchImages()
}, [page, query])

  return (
    <Layout>
    <SearchBar onSubmitForm={onSubmitForm} ></SearchBar>
    {isLoading && <Loader/>}
    {error && <p>"Whooops! Please reload this page!"</p>}
    {images.length > 0 && (
      <ImageGallery images={images}/>
    )}
    {images.length > 0 && page !== totalPage && 
      (<LoadMoreBtn onClick={toLoadMore}/>)}
    <Toaster position="top-right"/>
    </Layout>
    )

}


