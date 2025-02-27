import { createReducer, on } from '@ngrx/store';

import { getUserRole } from 'src/app/shared/utilities/get-user-role.utility';
import {
  clearUser,
  getIdUserSection,
  getUrlUserPhotoSuccess,
  loadUser,
  setUserSectionData,
} from 'src/app/store/user/user.actions';
import { initialUserState } from 'src/app/store/user/user.state';

export const userReducer = createReducer(
  initialUserState,
  on(loadUser, (state, { user }) => ({
    ...state,
    user,
    role: getUserRole(user),
  })),
  on(getUrlUserPhotoSuccess, (state, { urlUserPhoto }) => ({
    ...state,
    urlUserPhoto,
  })),
  on(getIdUserSection, (state, { idUserSection }) => ({
    ...state,
    idUserSection,
  })),
  on(setUserSectionData, (state, { userSectionData }) => ({
    ...state,
    userSectionData,
  })),
  on(clearUser, () => initialUserState)
);
