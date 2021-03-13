import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ws } from '../../websocket';
import { useDispatch, useSelector } from 'react-redux';
import { pushAnsweredAC, toogleDialogAC } from '../../redux/actions';

export const QuestionDialog = (props) => {
  const open = useSelector((state) => state.dialogOpen);
  const [isAnswering, setAnswering] = useState(false);
  const [answer, setAnswer] = useState('');
  const login = useSelector((state) => state.login);
  const { title, question, theme, value } = useSelector((state) => state.question);
  const dispatch = useDispatch();

  const resetAnswer = () => {
    setAnswering(false);
    setAnswer('');
  };

  const handleClose = () => {
    ws.send(JSON.stringify({ type: 'markAnswered', theme, value }));
    ws.onmessage = (wsMessage) => {
      const data = JSON.parse(wsMessage.data);
      if (data.type === 'markedAnswered') {
        dispatch(pushAnsweredAC(data.answeredQuestions));
        handleCloseDialog();
      }
    };
    dispatch(toogleDialogAC(false));
  }

  const handleCloseDialog = () => {
    resetAnswer();
    handleClose();
  };

  const handleAnswer = () => {
    ws.send(JSON.stringify({ type: 'userAnswer', login, answer, theme, value }));
    ws.onmessage = (wsMessage) => {
      const data = JSON.parse(wsMessage.data);
      if (data.type === 'gameStatus') {
        console.log(data);
        if (data.isRight) {
          dispatch(pushAnsweredAC(data.answeredQuestions));
          handleCloseDialog();
        } else resetAnswer();
      }
    };
  };

  return (
    <Dialog open={open} onClose={handleClose} disableBackdropClick>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {question}
        </DialogContentText>
        {isAnswering
        && <TextField
          autoFocus
          label="Введите ответ"
          fullWidth
          value={answer}
          onChange={(event) => setAnswer(event.target.value)}
        />}
      </DialogContent>
      <DialogActions>
        {isAnswering
          ? <Button onClick={handleAnswer} color="primary">
            Подтвердить
          </Button>
          : <>
            <Button onClick={() => setAnswering(true)} color="primary">
              Ответить
            </Button>
            <Button onClick={handleCloseDialog} color="secondary">
              Пропустить
            </Button>
          </>}
      </DialogActions>
    </Dialog>
  );
};
