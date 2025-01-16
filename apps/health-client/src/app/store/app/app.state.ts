export interface AppState {
  isAppInitialized: boolean; // Флаг, показывающий, инициализировано ли приложение
  isLoading: boolean; // Глобальный флаг загрузки
  isAuthenticated: boolean; // Флаг авторизации пользователя
  accessToken: string | null; // Токен доступа пользователя
  error: string | null; // Ошибка (например, при логине)
}

export const initialAppState: AppState = {
  isAppInitialized: false,
  isLoading: false,
  isAuthenticated: false,
  accessToken: null,
  error: null,
};
