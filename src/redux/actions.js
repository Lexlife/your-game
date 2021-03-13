import { SET_AUTH, GET_USERS, SET_USERS, UPDATE_GAME, SET_QUESTION, TOOGLE_DIALOG, PUSH_ANSWERED } from './actionTypes';

export const setAuthAC = (user) => ({
  type: SET_AUTH,
  payload: user,
});

export const getUsersAC = (users) => ({
  type: GET_USERS,
  payload: users,
});

export const setUsersAC = (users) => ({
  type: SET_USERS,
  payload: users,
});

export const updateGameAC = (game) => ({
  type: UPDATE_GAME,
  payload: game,
});

export const setQuestionAC = (question) => ({
  type: SET_QUESTION,
  payload: question,
});

export const toogleDialogAC = (dialogOpen) => ({
  type: TOOGLE_DIALOG,
  payload: dialogOpen,
});

export const pushAnsweredAC = (answeredQuestions) => ({
  type: PUSH_ANSWERED,
  payload: answeredQuestions,
})
