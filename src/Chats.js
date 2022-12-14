import { Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Search from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import Chat from './Chat';
import { auth, db } from './firebase';
import './Chats.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from './features/appSlice';
import { RadioButtonChecked } from '@mui/icons-material';
import { resetCameraImage } from './features/cameraSlice';

function Chats() {
  const [posts, setPosts] = useState([]);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigation = useNavigate();
  useEffect(() => {
    db.collection('posts')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              data: doc.data(),
            };
          })
        )
      );
  }, []);

  const takeSnap = () => {
    dispatch(resetCameraImage());
    navigation('/');
  };
  return (
    <div className='chats'>
      <div className='chats__header'>
        <Avatar
          src={user.profilePic}
          onClick={() => auth.signOut()}
          className='chats__avatar'
        />
        <div className='chats__search'>
          <Search className='chats__searchIcon' />
          <input placeholder='Friends' type='text' />
        </div>
        <ChatBubbleIcon className='chats__chatIcon' />
      </div>
      <div className='chat__posts'>
        {posts.map(
          ({
            id,
            data: { profilePic, username, timestamp, imageUrl, read },
          }) => (
            <Chat
              key={id}
              id={id}
              username={username}
              timestamp={timestamp}
              imageUrl={imageUrl}
              read={read}
              profilePic={profilePic}
            />
          )
        )}
        <RadioButtonChecked
          className='chats__takePicIcon'
          onClick={takeSnap}
          fontSize='large'
        />
      </div>
    </div>
  );
}

export default Chats;
