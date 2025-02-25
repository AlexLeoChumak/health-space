import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StringConverterService {
  // Преобразование из camelCase в kebab-case
  static camelToKebab(str: string): string {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  }

  // Преобразование из kebab-case в camelCase
  static kebabToCamel(str: string): string {
    return str.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
  }
}
