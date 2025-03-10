import { UserRoleType } from 'src/app/features/user-profile';

export interface UpdatePasswordInterface {
  newPassword: string;
  newPasswordConfirmation: string;
  oldPassword: string;
}

export interface UpdatePasswordFormInterface extends UpdatePasswordInterface {
  userId: string;
  userRole: UserRoleType;
}
