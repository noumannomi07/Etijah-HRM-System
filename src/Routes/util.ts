import { CommonRouteKeys } from "./routes";
import { FlattenRoutes, RouteObject } from "./types";

export const generateFullRoutes = <T extends RouteObject>(
  routeObject: T,
  basePath: string = ''
): FlattenRoutes<T> => {
  return Object.keys(routeObject).reduce((acc, key) => {
    const value = routeObject[key];
    if (Object.keys(CommonRouteKeys).includes(key)) {
      (acc as any)[key] = basePath;
      return acc;
    }

    else if (typeof value === 'string') {
      const discardedPaths = /^(Website|Dashboard)|/;
      const formattedPath = basePath.replace(discardedPaths, '');
      const fullPath = `${formattedPath}${value.startsWith('/') ? '' : '/'}${value}`.replace('//', '/');

      if (value.includes(':')) {
        (acc as any)[key] = (params: Record<string, string>) =>
          fullPath.replace(/:(\w+)/g, (_, param) => params[param]);
      } else {

        (acc as any)[key] = fullPath;
      }
    } else if (typeof value === 'object' && value !== null) {
      const pathModifier = basePath === "/" ? "" : "/";
      const subPath = value[CommonRouteKeys.Base] ?? '';
      const finalBasePath = `${basePath}${pathModifier}${subPath}`;
      (acc as any)[key] = generateFullRoutes(value, finalBasePath);
    }

    return acc;
  }, {} as FlattenRoutes<T>);
};


