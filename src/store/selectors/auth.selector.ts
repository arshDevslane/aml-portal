import { createSelector } from 'reselect';
import { AppState } from '../reducers';
import { AuthState } from '../reducers/auth.reducer';

const authState = (state: AppState) => state.auth;

export const isAuthenticatedSelector = createSelector(
  [authState],
  (state: AuthState) => Boolean(state.userID)
);

export const isAuthLoadingSelector = createSelector(
  [authState],
  (state: AuthState) => Boolean(state.loading)
);

export const loggedInUserSelector = createSelector(
  [authState],
  (state: AuthState) => state.user
);