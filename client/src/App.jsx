import React from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import { ChannelContainer, ChannelListContainer } from './components';

// styles
import './App.css';

const apiKey = '1280048';

const client = StreamChat.getInstance(apiKey);

const App = () => {
  return (
    <div className='app__wrapper'>
      <Chat client={client} theme='team light'>
        <ChannelListContainer />
        <ChannelContainer />
      </Chat>
    </div>
  );
};
export default App;
