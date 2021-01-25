import * as compare from "./compare";
import * as eq from "./eq";
import * as List from "./list";
import * as Nullable from "./nullable";
import * as Option from "./option";
import * as rand from "./rand";

export * from "./clamp";
export * from "./f";
export * from "./hash";
export * from "./int";
export { cons, l, nil } from "./list";
export type { list } from "./list";
export { isNull, notNull, ofOption, toOption } from "./nullable";
export type { nullable } from "./nullable";
export { callIf, callIf_, isNone, isSome, none, some, truthy } from "./option";
export type { option } from "./option";
export * from "./prim";
export * from "./unsafe";
export { eq };
export { compare };
export { rand };
export { Option };
export { List };
export { Nullable };

export const $ = Symbol("boost/placeholder");
