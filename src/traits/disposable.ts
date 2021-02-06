export const disposed = Symbol.for("disposed");
export const dispose = Symbol.for("dispose");

export interface Disposable {
  [disposed]: boolean;
  [dispose](): void;
}
