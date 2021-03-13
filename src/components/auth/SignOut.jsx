import { Button } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthAC, setUsersAC } from '../../redux/actions';
import { ws } from '../../websocket';

export const SignOut = () => {
  const login = useSelector((state) => state.login);
  const dispatch = useDispatch();

  const handleClick = async () => {
    try {
      const isAuth = await (await fetch('/auth/signout')).json();
      dispatch(setAuthAC(isAuth.session));
      ws.send(JSON.stringify({ type: 'signout', login }));
      ws.onmessage = (wsMessage) => {
        const data = JSON.parse(wsMessage.data);
        if (data.type === 'users list') dispatch(setUsersAC(data.users));
      };
    } catch ({ message }) {
      console.log('Err: ', message);
      dispatch(setAuthAC(false));
    }
  };

  return (
    <Button onClick={handleClick}>Выйти</Button>
  );
};
