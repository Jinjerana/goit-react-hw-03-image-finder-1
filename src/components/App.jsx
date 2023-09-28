import React, { Component } from 'react';
import getImages from 'Services/API';
import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery.js';
import { Button } from './Button/Button.js';
import { Loader } from './Loader/Loader.js';
import { ModalWindow } from './Modal/Modal.js';

export class App extends Component {
  // Объявляем стейт
  state = {
    // Массив изображений
    images: [],
    // Поисковой запрос
    query: '',
    // Пагинация
    page: 1,
    totalHits: 0,
    largeImageURL: '',
    tag: '',
    value: '',
    isModalOpen: false,
  };

  async componentDidUpdate(_, prevState) {
    // по стандарту делаем проверку
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      // если изменился запрос, тут выполняется вся логика
      console.log(
        `fetch images by name ${this.state.query} and with page ${this.state.page}`
      );
      try {
        this.setState({ loading: true, error: false });
        const { hits, totalHits } = await getImages(
          this.state.query.slice(12),
          this.state.page
        );
        if (hits.length === 0) {
          return console.log('Try again');
        } else {
          if (this.state.page === 1) {
            console.log(`"${totalHits}" pictures are found`);
          }
        }
        this.setState(prev => {
          return {
            images: [...prev.images, ...hits],
            loadMore: this.state.page < Math.ceil(totalHits / 12),
          };
        });
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  // изменяем состояние query, на что реагирует ComponenDidUpdate
  onSubmit = e => {
    e.preventDefault();

    const searchQuery = e.target.query.value.toLowerCase().trim('');
    if (!searchQuery) return;
    // скидываем при новом поиске страницу и галерею
    this.setState({
      query: `${Date.now()}/${searchQuery}`,
      page: 1,
      images: [],
    });
  };

  // загрузка следующих фото
  onLoadMore = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  openModal = (largeImageURL, tag) => {
    this.setState({
      isModalOpen: true,
      largeImageURL,
      tag,
    });
  };

  closeModal = () => {
    this.setState({
      isModalOpen: false,
      largeImageURL: '',
      tag: '',
    });
  };

  render() {
    const { images, isModalOpen, largeImageURL, tag } = this.state;
    return (
      <>
        {/* Searchbar */}
        <SearchBar onSubmit={this.onSubmit} />
        <button onClick={this.onSubmit}>Load more</button>
        <Loader />
        {/* Gallery */}
        <ImageGallery gallery={images} onImageClick={this.openModal}>
          {/* {images.map(item => (
            <li key={item.id}>{item.largeImage}</li>
          ))} */}
        </ImageGallery>
        <Button onClick={this.onLoadMore}>Load more</Button>
        <ModalWindow
          isOpen={this.isModalOpen}
          onRequestClose={this.closeModal}
          largeImageURL={largeImageURL}
          tag={tag}
        />
      </>
    );
  }
}
