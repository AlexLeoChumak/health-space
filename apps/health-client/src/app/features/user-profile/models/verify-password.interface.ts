import { UserRoleType } from 'src/app/shared/models';

export interface VerifyPasswordInterface {
  password: string;
  userId: string;
  userType: UserRoleType;
}
