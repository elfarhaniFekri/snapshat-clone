import React, { useEffect } from 'react';
import WebcamCapture from './WebcamCapture';
import Preview from './Preview';
import Chats from './Chats';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatView from './ChatView';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/appSlice';
import Login from './Login';
import { auth } from './firebase';
import NotFound from './NotFound';
function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            username: authUser?.displayName,
            profilePic: authUser?.photoURL,
            id: authUser?.uid,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);
  return (
    <div className='app'>
      <Router>
        {!user ? (
          <Login />
        ) : (
          <div className='app__body'>
            <div className='app__bodyBackground'>
              <Routes>
                <Route exact path='/chats' element={<Chats />} />
                <Route path='/chats/view' element={<ChatView />} />
                <Route path='/preview' element={<Preview />} />
                <Route exact path='/' element={<WebcamCapture />} />
                <Route path='*' element={<NotFound />} />
              </Routes>
            </div>
          </div>
        )}
      </Router>
    </div>
  );
}

export default App;
