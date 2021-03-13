import React from 'react';
import Paper from '@material-ui/core/Paper';
import { QuestionTile } from './QuestionTile';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  row: {
    display: 'grid',
    width: '100%',
    gridTemplateColumns: '3fr 1fr 1fr 1fr 1fr 1fr',
  },
  theme: {
    background: theme.palette.primary.main,
    border: 0,
    fontSize: '18px',
    fontWeight: '500',
    borderBottom: '1px solid #ffffff',
    textTransform: 'uppercase',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export const QuestionsRow = (props) => {
  const { theme, values } = props;
  const classes = useStyles();

  return (
    <Paper className={classes.row} key={theme}>
      <Paper className={classes.theme} align="right">{theme}</Paper>
      {values.map((value) =>
        <QuestionTile
          key={theme + value}
          value={value}
          theme={theme}
        />)}
    </Paper>
  );
};
