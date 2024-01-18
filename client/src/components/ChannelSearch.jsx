import React, { useState, useEffect } from 'react';
import { useChatContext } from 'stream-chat-react';
import { SearchIcon } from '../assets';

const ChannelSearch = () => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getChannels = async (text) => {
    try {
      // TODO: fetch channels
    } catch (error) {
      setQuery('');
    }
  };

  const onSearch = (event) => {
    event.preventDefault();
    const value = event.target.value;
    console.log(value);
    setIsLoading(true);
    setQuery(value);
    getChannels(value);
  };

  return (
    <div className='channel-search__container'>
      <div className='channel-search__input__wrapper'>
        <div className='channel-search__input__icon'>
          <SearchIcon />
        </div>
        <input
          type='text'
          placeholder='search'
          className='channel-search__input__text'
          value={query}
          onChange={onSearch}
        />
      </div>
    </div>
  );
};

export default ChannelSearch;
