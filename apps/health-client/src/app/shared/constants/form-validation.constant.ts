export interface FormValidationConstantInterface {
  REQUIRED: string;
  MIN_LENGTH_PASSWORD: string;
  MIN_LENGTH_NUMBER_PHONE: string;
  EMAIL: string;
  IMAGE: string;
  MIN: string;
  MAX: string;
  PATTERN: string;
  NUMBER_CHARACTERS_IDENTIFICATION_NUMBER: string;
}

export const FORM_VALIDATION_CONSTANT: FormValidationConstantInterface = {
  REQUIRED: 'Поле обязательно к заполнению',
  MIN_LENGTH_PASSWORD: 'Необходимо ввести не менее 8-ми символов',
  MIN_LENGTH_NUMBER_PHONE:
    'Введите код оператора (2 символа), и номер телефона (7 символов)',
  EMAIL: 'Введите корректный email',
  IMAGE: 'Выберите изображение, другие типы файлов не будут загружены',
  MIN: 'Введите валидное значение, номер не может быть отрицательным или равным 0',
  MAX: 'Введите валидное значение, номер не может превышать пятизначное число',
  PATTERN: 'Не соответствует разрешённому формату ввода',
  NUMBER_CHARACTERS_IDENTIFICATION_NUMBER:
    'Длина идентификационного номера должна составлять 14 символов',
};
