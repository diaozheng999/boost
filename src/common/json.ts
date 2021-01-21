export type json =
  | string
  | number
  | null
  | boolean
  | { [keys: string]: json }
  | json[];

export type t = json;
