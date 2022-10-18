import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selecSelectedImage } from './features/appSlice';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

function ChatView() {
  const selectedImage = useSelector(selecSelectedImage);
  const navigate = useNavigate();
  const myRef = useRef(false);

  useEffect(() => {
    if (myRef.current == false) {
      if (!selectedImage) {
        exit();
      }
    }

    return () => (myRef.current = true);
  }, [selectedImage]);

  const exit = () => {
    navigate('/chats');
  };

  return (
    <div className='chatView'>
      <img src={selectedImage} onClick={exit} alt='' />
      <div className='chatView_timer'>
        <CountdownCircleTimer
          isPlaying
          duration={10}
          strokeWidth={6}
          size={50}
          colors={[
            ['#004777', 0.33],
            ['#F7B801', 0.33],
            ['#A30000', 0.33],
          ]}>
          {({ remainingTime }) => {
            if (remainingTime === 0) {
              exit();
            }

            return remainingTime;
          }}
        </CountdownCircleTimer>
      </div>
    </div>
  );
}

export default ChatView;
