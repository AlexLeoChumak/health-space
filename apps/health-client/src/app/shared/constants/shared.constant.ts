export interface SharedConstantInterface {
  USER_NOT_FOUND_ERROR: string;
  UPDATE_INFO_SUCCESSFULLY: string;
  UPDATE_USER_PROFILE_IMAGE_ERROR: string;
  ENTER_PASSWORD: string;
  INCORRECT_PASSWORD: string;
  PASSWORD_VERIFICATION_ERROR: string;
}

export const SHARED_CONSTANT: SharedConstantInterface = {
  USER_NOT_FOUND_ERROR: 'Пользователь не найден',
  UPDATE_INFO_SUCCESSFULLY: 'Информация успешно обновлёна',
  UPDATE_USER_PROFILE_IMAGE_ERROR: 'Ошибка обновления изображения',
  ENTER_PASSWORD: 'Введите пароль',
  INCORRECT_PASSWORD: 'Неверный пароль',
  PASSWORD_VERIFICATION_ERROR: 'Ошибка проверки пароля',
};
