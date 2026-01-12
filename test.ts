export type RouteObject = { [key: string]: string | RouteObject };

/**
 * Extracts dynamic parameters from a given path.
 */
type ExtractParams<T extends string> =
  T extends `${string}:${infer Param}`
  ? Param
  : never;

/**
 * Checks if a string contains ":" (indicating dynamic parameters).
 */
type HasParams<T extends string> = ExtractParams<T> extends never ? false : true;

/**
 * Flattens a nested route object into a structure where:
 * - Static paths remain as strings
 * - Dynamic paths become functions that accept parameter objects
 * - "Base" keys are ignored when forming paths
 */
export type FlattenRoutes<T, P extends string = ''> = {
  [K in keyof T]: T[K] extends string
  ? HasParams<T[K]> extends true
  ? (params: Record<ExtractParams<T[K]>, string>) => `${P}/${T[K]}`
  : K
  : T[K] extends RouteObject
  ? FlattenRoutes<T[K], `${P}${P extends '' ? '' : '/'}${T extends { Base: infer B extends string } ? B : K & string}`>
  : never;
};



const RelativeRoutes = {
  Root: '/',
  CandidateFile: 'candidateFile/:id',
  About: 'about',
  NotFound: '*',
} as const;

type aa = (typeof RelativeRoutes)[keyof typeof RelativeRoutes];
type FullRoutes = FlattenRoutes<typeof RelativeRoutes>;
