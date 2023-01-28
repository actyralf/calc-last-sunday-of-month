const { getRentDay, splitDate, getDaysSince2k } = require("./index.js");
it("should split dates correctly", () => {
  expect(splitDate("01012000")).toStrictEqual({ d: 1, m: 1, y: 2000 });
  expect(splitDate("31122022")).toStrictEqual({ d: 31, m: 12, y: 2022 });
});

it("should return the correct datediff", () => {
  expect(getDaysSince2k({ d: 3, m: 4, y: 2014 })).toBe(5206);
});

it("should calculate last Sunday in given month", () => {
  expect(getRentDay("14022023")).toStrictEqual({ d: 26, m: 2, y: 2023 });
  expect(getRentDay("14022024")).toStrictEqual({ d: 25, m: 2, y: 2024 });
  expect(getRentDay("01022000")).toStrictEqual({ d: 27, m: 2, y: 2000 });
});
