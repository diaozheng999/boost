import { $, _ } from "../common";

export type sexp = string | number | sexp[];

export type SexpPattern = string | number | typeof _ | typeof $ | SexpPattern[];
