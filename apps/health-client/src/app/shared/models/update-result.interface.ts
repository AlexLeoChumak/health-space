export interface UpdateResultInterface {
  generatedMaps: any[]; // Массив сгенерированных значений
  raw: any[]; // Необработанные данные из базы
  affected?: number; // Количество затронутых строк, может быть необязательным
}
