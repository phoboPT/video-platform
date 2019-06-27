import formatMoney from "../lib/formatMoney";

describe("formatMoney function", () => {
  it("works with fractional dollars", () => {
    expect(formatMoney(1)).toEqual("€ 1.00");
    expect(formatMoney(9)).toEqual("9,00 €");
    expect(formatMoney(10)).toEqual("10,00 €");
    expect(formatMoney(40)).toEqual("40,00 €");
  });

  it("leaves cents off for whole dollars", () => {
    expect(formatMoney(5000)).toEqual("€ 5 000");
    expect(formatMoney(100)).toEqual("100 €");
    expect(formatMoney(100)).toEqual("100 €");
  });
});
