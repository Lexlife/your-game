import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { useSelector } from 'react-redux';

import { QuestionsRow } from './QuestionsRow';

const useStyles = makeStyles(() => ({
  tablecontainer: {
    maxWidth: '80%',
    margin: '0 auto',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    background: 'none',
    boxShadow: 'none',
  },
  table: {
    minWidth: 650,
    width: '100%',
    padding: 30,
    background: 'none',
  },
}));
const values = [200, 400, 600, 800, 1000];

export const QuestionsGrid = (props) => {
  const classes = useStyles();
  const themes = useSelector((state) => state.themes);

  return (
    <Paper className={classes.tablecontainer}>
      <Paper className={classes.table} size="small" aria-label="a dense table">
        <Paper>
          {themes.map((theme) =>
            <QuestionsRow
              key={theme}
              theme={theme}
              values={values}
            />)}
        </Paper>
      </Paper>
    </Paper>
  );
};
