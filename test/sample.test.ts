import { Sample } from "../src/Sample";

describe("Sample test suite", () => {
  test("hello world output", () => {
    const s = new Sample();
    expect(s.hello("Ivan")).toEqual("Hello Ivan");
  });
});
