import React, { useEffect } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import ListItemText from '@material-ui/core/ListItemText';
import StopIcon from '@material-ui/icons/Stop';
import { useSelector, useDispatch } from 'react-redux';
import { updateGameAC } from '../../redux/actions';
import { ws } from '../../websocket';

export const StartEndGame = () => {
  const isFinished = useSelector((state) => state.isFinished);
  const dispatch = useDispatch();

  const updateGame = (wsMessage) => {
    const data = JSON.parse(wsMessage.data);
    if (data.type === 'updateGame') {
      console.log(data.game);
      dispatch(updateGameAC(data.game));
    }
  };

  useEffect(() => {
    ws.onmessage = (wsMessage) => updateGame(wsMessage);
  }, []);

  const startGame = () => {
    ws.send(JSON.stringify({ type: 'startGame' }));
    ws.onmessage = (wsMessage) => updateGame(wsMessage);
  };

  const finishGame = () => {
    ws.send(JSON.stringify({ type: 'finishGame' }));
    ws.onmessage = (wsMessage) => updateGame(wsMessage);
  };

  return (
    <>
      {isFinished
        ? <ListItem button>
          <ListItemIcon>
            <PlayArrowIcon />
          </ListItemIcon>
          <ListItemText primary='Начать игру' onClick={startGame} />
        </ListItem>

        : <ListItem button>
          <ListItemIcon>
            <StopIcon />
          </ListItemIcon>
          <ListItemText primary='Закончить игру' onClick={finishGame} />
        </ListItem>}
    </>
  );
};
