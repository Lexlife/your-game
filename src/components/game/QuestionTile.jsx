import React from 'react';
import { BottomNavigationAction } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { ws } from '../../websocket';
import { setQuestionAC, toogleDialogAC } from '../../redux/actions';

const useStyles = makeStyles((theme) => ({
  button: {
    color: theme.palette.primary.main,
    paddingTop: 0,
    background: theme.palette.primary.contrastText,
    opacity: '1',
    borderLeft: '1px solid'.concat(theme.palette.primary.main),
    borderBottom: '1px solid'.concat(theme.palette.primary.main),
    border: 0,
    fontSize: '18px',
    maxWidth: '100%',
    textAlign: 'center',
    height: '80px',
    cursor: 'pointer',
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#0062cc',
      borderColor: '#005cbf',
    },
  },
  answered: {
    background: theme.palette.primary.main,
  },
}));

export const QuestionTile = (props) => {
  const answeredQuestions = useSelector((state) => state.answeredQuestions);
  const dispatch = useDispatch();
  const { theme, value } = props;
  const classes = useStyles();

  const isAnswered = answeredQuestions.includes(`${theme + value}`);

  const openDialog = () => {
    ws.send(JSON.stringify({ type: 'getQuestion', theme, value }));
    ws.onmessage = (wsMessage) => {
      const data = JSON.parse(wsMessage.data);
      console.log(data.question)
      if (data.type === 'newQuestion') {
        dispatch(setQuestionAC(data.question));
        dispatch(toogleDialogAC(true));
      }
    };
  };

  return (
    <>
      {isAnswered
        ? <BottomNavigationAction
          label={props.value}
          className={classes.answered}
        />
        : <BottomNavigationAction
          label={props.value}
          className={classes.button}
          onClick={openDialog}
        />}
    </>
  );
};
