import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setAuthAC, setUsersAC } from './redux/actions';
import { ws } from './websocket';
import { Main } from './components/layout/Main';
import { Auth } from './components/auth/Auth';

import './App.css';

const App = () => {
  const isAuth = useSelector((state) => state.isAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('/auth/check')
      .then((res) => res.json())
      .then((data) => dispatch(setAuthAC({
        isAuth: data.session,
        login: data.login,
      })))
      .catch(({ message }) => {
        // eslint-disable-next-line no-console
        console.log('Err: ', message);
        dispatch(setAuthAC({
          isAuth: false,
          login: '',
        }));
      });
  }, []);

  useEffect(() => {
    ws.onopen = () => {
      console.log('WebSocket Client Connected');
    };
    ws.onmessage = (wsMessage) => {
      const data = JSON.parse(wsMessage.data);
      if (data.type === 'users list') dispatch(setUsersAC(data.users));
    };
  }, []);

  return (
    <div>
      {isAuth
        ? <Main />
        : <Auth />
      }
    </div>
  );
};

export default App;
