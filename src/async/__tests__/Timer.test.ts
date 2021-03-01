import { Timer } from "../Timer";

jest.useFakeTimers("modern");

test("basis", async () => {
  const timer = Timer(1000);
  jest.runAllTimers();
  await expect(timer).resolves.toBeUndefined();
});
