export interface UpdateInfoConstantInterface {
  PASSWORDS_NO_MATCH: string;
  EDIT_INFO_ERROR: string;
}

export const UPDATE_INFO_CONSTANT: UpdateInfoConstantInterface = {
  PASSWORDS_NO_MATCH:
    'Новый пароль и его подтверждение не совпадают. Проверьте их и попробуйте еще раз',
  EDIT_INFO_ERROR: 'Ошибка редактирования информации. Попробуйте еще раз',
};
