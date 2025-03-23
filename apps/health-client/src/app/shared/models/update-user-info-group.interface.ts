import { UpdateUserInfoGroupType, UserRoleType } from 'src/app/shared/models';
import { CurrentUserPhotoDataInterface } from 'src/app/shared/models/current-user-photo-data.interface';

export interface UpdateUserInfoGroupInterface {
  updateInfoGroup: UpdateUserInfoGroupType;
  userId: string;
  userRole: UserRoleType;
  currentUserPhotoData: CurrentUserPhotoDataInterface;
}
