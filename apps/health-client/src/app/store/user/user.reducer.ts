import { createReducer, on } from '@ngrx/store';

import {
  clearUser,
  loadUser,
  loadUserFailure,
  loadUserSuccess,
  setIdUserInfoGroup,
  setUrlUserPhoto,
  setUrlUserPhotoFailure,
  setUrlUserPhotoSuccess,
  setUserInfoGroup,
} from 'src/app/store/user/user.actions';
import { initialUserState } from 'src/app/store/user/user.state';
import { getUserRole } from 'src/app/shared/utilities/get-user-role.utility';

export const userReducer = createReducer(
  initialUserState,
  on(loadUser, (state) => ({
    ...state,
    userError: null,
  })),
  on(loadUserSuccess, (state, { user }) => ({
    ...state,
    user,
    role: getUserRole(user),
  })),
  on(loadUserFailure, (state, { message }) => ({
    ...state,
    userError: message,
  })),

  on(setUrlUserPhoto, (state) => ({
    ...state,
    photoError: null,
  })),
  on(setUrlUserPhotoSuccess, (state, { urlUserPhoto }) => ({
    ...state,
    urlUserPhoto,
  })),
  on(setUrlUserPhotoFailure, (state, { message }) => ({
    ...state,
    photoError: message,
  })),

  on(setIdUserInfoGroup, (state, { idUserInfoGroup }) => ({
    ...state,
    idUserInfoGroup,
  })),
  on(setUserInfoGroup, (state, { userInfoGroup }) => ({
    ...state,
    userInfoGroup,
  })),
  on(clearUser, () => initialUserState)
);
