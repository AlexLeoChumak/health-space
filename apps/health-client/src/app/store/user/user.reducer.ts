import { createReducer, on } from '@ngrx/store';

import {
  clearUser,
  loadUser,
  setIdUserSection,
  setUrlUserPhotoSuccess,
  setUserSectionData,
} from 'src/app/store/user/user.actions';
import { initialUserState } from 'src/app/store/user/user.state';
import { getUserRole } from 'src/app/shared/utilities/get-user-role.utility';

export const userReducer = createReducer(
  initialUserState,
  on(loadUser, (state, { user }) => ({
    ...state,
    user,
    role: getUserRole(user),
  })),
  on(setUrlUserPhotoSuccess, (state, { urlUserPhoto }) => ({
    ...state,
    urlUserPhoto,
  })),
  on(setIdUserSection, (state, { idUserSection }) => ({
    ...state,
    idUserSection,
  })),
  on(setUserSectionData, (state, { userSectionData }) => ({
    ...state,
    userSectionData,
  })),
  on(clearUser, () => initialUserState)
);
