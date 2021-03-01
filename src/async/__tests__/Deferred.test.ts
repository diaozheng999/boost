import { Deferred } from "../Deferred";

test("deferred resolve", async () => {
  const d = Deferred<number>();
  d.resolve(5);
  const p = await d;
  expect(p).toBe(5);
  d.resolve(6);
  const q = await d;
  expect(q).toBe(5);
});

test("deferred reject", async () => {
  const d = Deferred<number>();
  d.reject(5);
  await expect(d).rejects.toBe(5);
});
