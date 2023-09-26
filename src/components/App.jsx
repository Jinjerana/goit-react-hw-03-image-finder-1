import React, { Component } from 'react';

export class App extends Component {
  // Объявляем стейт
  state = {
    // Массив изображений
    images: [],
    // Поисковой запрос
    query: '',
    // Пагинация
    page: 1,
  };

  render() {
    const { images } = this.state;
    return (
      <>
        {/* Searchbar */}
        <form>
          <label>
            <input type="text" name="query" />
          </label>
          <button type="submit">Search</button>
        </form>
        {/* Gallery */}
        <ul>
          {images.map(item => (
            <li key={item.id}>{item.largeImage}</li>
          ))}
        </ul>
      </>
    );
  }
}
