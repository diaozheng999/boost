export const disposed = Symbol.for("disposed");

export interface Disposable {
  [disposed]: boolean;
  dispose(): void;
}
