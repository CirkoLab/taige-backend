import { join } from 'path';

export const APP_ENV = process.env.APP_ENV;
export const IS_DEV = APP_ENV === 'development';
export const IS_PROD = APP_ENV === 'production';

export const ROOT_PATH = join(__dirname, '../../');
export const APP_PATH = join(ROOT_PATH, 'app');
export const CONFIG_PATH = join(APP_PATH, 'config');
export const STATIC_PATH = join(ROOT_PATH, 'static');
export const VIEWS_PATH = join(APP_PATH, 'views');

export function isObject(item: any) {
  return item && typeof item === 'object' && !Array.isArray(item);
}

export function deepMerge(origin: any, custom: any) {
  const merged: any = {};

  if (origin === undefined) {
    return custom;
  }

  if (custom === undefined) {
    return origin;
  }

  if (!isObject(origin) || !isObject(custom)) {
    return custom;
  }

  Object.keys(custom).forEach((each) => {
    if (isObject(origin[each]) && isObject(custom[each])) {
      merged[each] = deepMerge(origin[each], custom[each]);
    } else {
      merged[each] = custom[each];
    }
  });

  Object.keys(origin).forEach((each) => {
    if (!(each in custom)) {
      merged[each] = origin[each];
    }
  });

  return merged;
}
