import { UserRoleType } from 'src/app/features/user-profile';
import { UpdateUserInfoGroupType } from 'src/app/features/user-profile/models/update-user-info-group.type';

export interface UpdateUserInfoGroupInterface {
  updateInfoGroup: UpdateUserInfoGroupType;
  userId: string;
  userRole: UserRoleType;
}
