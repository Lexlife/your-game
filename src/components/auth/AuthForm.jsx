import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { ws } from '../../websocket';
import { setAuthAC, setUsersAC } from '../../redux/actions';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  btns: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  submit: {
    width: '48%',
    margin: theme.spacing(3, 0, 2),
  },
}));

export const AuthForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    login: '',
    password: '',
  });
  const [error, setError] = useState({
    login: '',
    password: '',
  });
  const [clicked, setClicked] = useState(false);

  const handleChange = (event) => {
    setError({ ...error, [event.target.name]: '' });
    setClicked(false);
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const auth = async (event, type) => {
    event.preventDefault();
    setError({
      login: '',
      password: '',
    });
    setClicked(true);

    if (user.login === '') return setError({ ...error, email: 'Необходимо заполнить поле' });
    if (user.password === '') return setError({ ...error, password: 'Необходимо заполнить поле' });

    try {
      const response = await fetch(`/auth/${type}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      const result = await response.json();
      if (response.ok) {
        dispatch(setAuthAC({ isAuth: result.session, login: result.login }));
        ws.send(JSON.stringify({ type: 'signin', login: user.login }));
        ws.onmessage = (wsMessage) => {
          const data = JSON.parse(wsMessage.data);
          if (data.type === 'users list') dispatch(setUsersAC(data.users));
        };
      } else {
        setError({ login: '', password: '', ...result.message });
      }
    } catch ({ message }) {
      // eslint-disable-next-line no-console
      console.log('Err: ', message);
      dispatch(setAuthAC({ isAuth: false, login: '' }));
    }
    return 'ok';
  };

  return (
    <form className={classes.form} noValidate>
      <TextField
        error={clicked && error.login !== ''}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="login"
        label="Login"
        name="login"
        autoFocus
        onChange={handleChange}
        helperText={error.login}
      />
      <TextField
        error={clicked && error.password !== ''}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        onChange={handleChange}
        helperText={error.password}
      />
      <div className={classes.btns}>
        <Button
          type="submit"
          variant="contained"
          className={classes.submit}
          size="large"
          onClick={(event) => auth(event, 'signup')}
        >
          Зарегистрироваться
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
          size="large"
          onClick={(event) => auth(event, 'signin')}
        >
          Войти
        </Button>
      </div>
    </form>
  );
};
