import { createReducer, on } from '@ngrx/store';

import { getUserRole } from 'src/app/shared/utils/get-user-role.utility';
import { clearUser, loadUser } from 'src/app/store/user/user.actions';
import { initialUserState } from 'src/app/store/user/user.state';

export const userReducer = createReducer(
  initialUserState,
  on(loadUser, (state, { user }) => ({
    ...state,
    user,
    role: getUserRole(user),
  })),
  on(clearUser, () => initialUserState)
);
