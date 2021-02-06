import { Branded } from "../traits";

const UOM = Symbol("uom");
const Measured = Symbol("measured");

export type uom = Branded<{ u: number; l: string }, typeof UOM>;

export type measured = Branded<
  { n: number; uom: number; u: string },
  typeof Measured
>;

const SI_PREFIX = "YZEPTGMKmμnpfazy";

function makeSIPrefix(measure: string): uom[] {
  seq;
}
