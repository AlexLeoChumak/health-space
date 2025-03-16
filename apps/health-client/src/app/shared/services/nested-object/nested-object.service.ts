/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { UserInfoGroupInterface } from 'src/app/shared/models';

@Injectable({
  providedIn: 'root',
})
export class NestedObjectService {
  public static findParentAndKeyByIdRecursive(
    obj: Record<string, unknown>,
    targetId: string | null,
    parent: Record<string, unknown> | null = null,
    parentKey: string | null = null
  ): UserInfoGroupInterface | null {
    if (!targetId || typeof obj !== 'object' || obj === null) return null;

    for (const key of Object.keys(obj)) {
      const child = obj[key];

      // Если нашли объект с нужным id, возвращаем родителя и ключ
      if (
        child &&
        typeof child === 'object' &&
        'id' in child &&
        child.id === targetId
      ) {
        return {
          userInfoGroup: child as Record<string, unknown>,
          userInfoGroupName: key,
        };
      }

      // Рекурсивно ищем в дочерних объектах
      const result = this.findParentAndKeyByIdRecursive(
        child as Record<string, unknown>,
        targetId,
        obj,
        key
      );
      if (result) return result;
    }

    return null;
  }
}
