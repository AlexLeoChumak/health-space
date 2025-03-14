export interface SharedConstantInterface {
  USER_NOT_FOUND_ERROR: string;
  UPDATE_USER_PROFILE_IMAGE_ERROR: string;
}

export const SHARED_CONSTANT: SharedConstantInterface = {
  USER_NOT_FOUND_ERROR: 'Пользователь не найден',
  UPDATE_USER_PROFILE_IMAGE_ERROR: 'Ошибка обновления изображения',
};
