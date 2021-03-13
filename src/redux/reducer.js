import { SET_AUTH, GET_USERS, SET_USERS, UPDATE_GAME, SET_QUESTION, TOOGLE_DIALOG, PUSH_ANSWERED } from './actionTypes';

const initialState = {
  isAuth: false,
  login: '',
  users: [],
  isFinished: true,
  question: {},
  themes: [],
  answeredQuestions: [],
  dialogOpen: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...state,
        isAuth: action.payload.isAuth,
        login: action.payload.login,
      };

    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };

    case SET_USERS:
      return {
        ...state,
        users: action.payload,
      };

    case UPDATE_GAME:
      return {
        ...state,
        isFinished: action.payload.isFinished,
        users: action.payload.users,
        themes: action.payload.themes,
        answeredQuestions: action.payload.answeredQuestions,
      };

    case SET_QUESTION:
      return {
        ...state,
        question: action.payload,
      };

    case TOOGLE_DIALOG:
      return {
        ...state,
        dialogOpen: action.payload,
      };

    case PUSH_ANSWERED:
      return {
        ...state,
        answeredQuestions: action.payload,
      };

    default:
      return state;
  }
};
