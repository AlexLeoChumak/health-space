import { UserRoleType } from 'src/app/shared/models';

export interface UpdatePasswordInterface {
  newPassword: string;
  newPasswordConfirmation: string;
  oldPassword: string;
}

export interface UpdatePasswordFormInterface extends UpdatePasswordInterface {
  userId: string;
  userRole: UserRoleType;
}
