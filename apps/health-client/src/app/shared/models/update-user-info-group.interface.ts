import { UpdateUserInfoGroupType, UserRoleType } from 'src/app/shared/models';

export interface UpdateUserInfoGroupInterface {
  updateInfoGroup: UpdateUserInfoGroupType;
  userId: string;
  userRole: UserRoleType;
}
