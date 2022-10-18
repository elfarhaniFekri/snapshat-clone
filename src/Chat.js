import { Avatar } from '@mui/material';
import React from 'react';
import './Chat.css';
import StopIcon from '@mui/icons-material/Stop';
import ReactTimeago from 'react-timeago';
import { selectImage } from './features/appSlice';
import { useDispatch } from 'react-redux';
import { db } from './firebase';
import { useNavigate } from 'react-router-dom';

function Chat({ id, username, timestamp, read, imageUrl, profilePic }) {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const open = () => {
    if (!read) {
      dispatch(selectImage(imageUrl));
      db.collection('posts').doc(id).set(
        {
          read: true,
        },
        {
          merge: true,
        }
      );
      navigation('/chats/view');
    }
  };
  return (
    <div className='chat' onClick={open}>
      <Avatar src={profilePic} />
      <div className='chat__info'>
        <h4>{username}</h4>
        <p>
          {!read && ' Tap To View -'} {''}
          <ReactTimeago
            date={new Date(timestamp?.toDate()).toUTCString()}
          />{' '}
        </p>
      </div>
      {!read && <StopIcon className='chat__readIcon' />}
    </div>
  );
}

export default Chat;
