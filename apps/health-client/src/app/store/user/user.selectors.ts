import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getUserRoleUtil } from 'src/app/shared/utils/get-user-role.util';
import { UserState } from 'src/app/store/user/user.state';

export const selectUserFeature = createFeatureSelector<UserState>('user');

export const selectUser = createSelector(
  selectUserFeature,
  (state) => state.user
);

export const selectUserRole = createSelector(selectUserFeature, (state) => {
  if (state.user) {
    return getUserRoleUtil(state.user);
  }
  return null;
});

export const selectUrlUserPhoto = createSelector(
  selectUserFeature,
  (state) => state.urlUserPhoto
);

export const selectIdUserInfoGroup = createSelector(
  selectUserFeature,
  (state) => state.idUserInfoGroup
);

export const selectUserInfoGroup = createSelector(
  selectUserFeature,
  (state) => state.userInfoGroup
);
