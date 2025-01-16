/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  HttpErrorResponse,
  HttpRequest,
  HttpHandlerFn,
  HttpInterceptorFn,
} from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const message = getErrorMessage(error);
      console.log('error', error);
      console.log('message', message);

      return throwError(() => error);
    })
  );
};

function getErrorMessage(error: HttpErrorResponse): string {
  if (error.error?.message) {
    return error.error.message;
  }

  // Локальный маппинг для стандартных ошибок
  const errorMessages: Record<number, string> = {
    400: 'Некорректный запрос. Проверьте данные и повторите попытку.',
    401: 'Неавторизован. Проверьте логин и пароль.',
    403: 'Доступ запрещён. У вас нет прав для выполнения этой операции.',
    404: 'Ресурс не найден. Проверьте URL и попробуйте снова.',
    408: 'Время ожидания запроса истекло. Попробуйте позже.',
    429: 'Слишком много запросов. Попробуйте повторить позже.',
    500: 'Ошибка сервера. Попробуйте позже.',
    502: 'Ошибка шлюза. Сервер временно недоступен.',
    503: 'Сервис недоступен. Попробуйте позже.',
    504: 'Истекло время ожидания шлюза. Попробуйте позже.',
  };

  return (
    errorMessages[error.status] || 'Неизвестная ошибка. Свяжитесь с поддержкой.'
  );
}
