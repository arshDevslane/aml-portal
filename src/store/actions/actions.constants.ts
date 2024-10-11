// Auth
export enum AuthActionType {
  LOGIN = 'auth/login',
  LOGIN_COMPLETED = 'auth/login/completed',
  LOGIN_ERROR = 'auth/login/error',

  FETCH_ME = 'auth/fetch/me',
  FETCH_ME_COMPLETED = 'auth/fetch/me/completed',
  FETCH_ME_ERROR = 'auth/fetch/me/error',

  RESET = 'store/reset',
}

export enum QuestionSetActionType {
  FETCH_QUESTION_SET = 'question/set/fetch',
  SYNC_QUESTION_RESPONSE = 'question/sync/response',
  FETCH_QUESTION_SET_COMPLETED = 'question/set/fetch/completed',
  FETCH_QUESTION_SET_ERROR = 'question/set/fetch/error',
}

export enum QuestionActionType {
  FETCH_QUESTION = 'question/fetch',
  FETCH_QUESTION_COMPLETED = 'question/fetch/completed',
  FETCH_QUESTION_ERROR = 'question/fetch/error',
}
