export interface AppState {
  isLoading: boolean; // Глобальный флаг загрузки
  isAuthenticated: boolean | null; // Флаг авторизации пользователя
  accessToken: string | null; // Токен доступа пользователя
  error: string | null; // Ошибка (например, при логине)
}

export const initialAppState: AppState = {
  isLoading: false,
  isAuthenticated: null,
  accessToken: null,
  error: null,
};
