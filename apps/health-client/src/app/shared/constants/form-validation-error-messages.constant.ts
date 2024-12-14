export interface FormValidationErrorMessagesInterface {
  required: string;
  minLengthPassword: string;
  minLengthNumberPhone: string;
  email: string;
  image: string;
  min: string;
  max: string;
  pattern: string;
  numberCharactersIdentificationNumber: string;
}

export const FORM_VALIDATION_ERROR_MESSAGES: FormValidationErrorMessagesInterface =
  {
    required: 'Поле обязательно к заполнению',
    minLengthPassword: 'Необходимо ввести не менее 8-ми символов',
    minLengthNumberPhone:
      'Введите код оператора (2 символа), и номер телефона (7 символов)',
    email: 'Введите корректный email',
    image: 'Выберите изображение, другие типы файлов не будут загружены',
    min: 'Введите валидное значение, номер не может быть отрицательным или равным 0',
    max: 'Введите валидное значение, номер не может превышать пятизначное число',
    pattern: 'Не соответствует разрешённому формату ввода',
    numberCharactersIdentificationNumber:
      'Длина идентификационого номера должна составлять 14 символов',
  };
