import React, { useEffect, useState } from 'react';
import { QuestionDialog } from './QuestionDialog';
import { QuestionsGrid } from './QuestionsGrid';
import { useDispatch, useSelector } from 'react-redux';

export const GameBoard = () => {
  const [dialogOpen, setOpen] = useState(false);
  const question = useSelector((state) => state.question);
  const dispatch = useDispatch();

  return (
    <>
      <QuestionsGrid
      />
      <QuestionDialog
        open={dialogOpen}
        question={question}
      />
    </>
  );
};
