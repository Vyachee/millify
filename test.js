const { millify } = require("./dist/millify");
const test = require("ava");

test("returns a string", (t) => {
  t.is(typeof millify(100), "string");
});

test("uses correct suffixes with default options", (t) => {
  t.is(millify(100), "100");
  t.is(millify(1000), "1K");
  t.is(millify(1000000), "1M");
  t.is(millify(1000000000), "1B");
  t.is(millify(1000000000000), "1T");
});

test("handles negative numbers like positive ones", (t) => {
  t.is(millify(-100), "-100");
  t.is(millify(-1000), "-1K");
  t.is(millify(-1000000), "-1M");
  t.is(millify(-1000000000), "-1B");
  t.is(millify(-1000000000000), "-1T");
});

test("uses lowercase suffixes", (t) => {
  const options = { lowercase: true };
  t.is(millify(1000, options), "1k");
  t.is(millify(1000000, options), "1m");
  t.is(millify(1000000000, options), "1b");
  t.is(millify(1000000000000, options), "1t");
});

test("accepts lowercase and lowerCase options", (t) => {
  const value = "1234567890";
  const expected = "1.23b";
  t.is(millify(value, { lowercase: true }), expected);
  t.is(millify(value, { lowerCase: true }), expected);
  t.is(millify(value, { lowercase: true, lowerCase: true }), expected);
  t.is(millify(value, { lowercase: false, lowerCase: true }), expected);
  t.is(millify(value, { lowercase: true, lowerCase: false }), "1.23B");
});

test("precision adjusts according to options", (t) => {
  const value = 12345.6789;
  const expected = [
    "12K",
    "12.3K",
    "12.35K",
    "12.346K",
    "12.3457K",
    "12.34568K",
    "12.345679K",
    "12.3456789K",
  ];

  expected.forEach((exp, precision) =>
    t.is(exp, millify(value, { precision })),
  );
});

test("allows a custom decimal separator", (t) => {
  const result = millify(55500, { decimalSeparator: "_" });
  const expected = "55_5K";
  t.is(expected, result);
});

test("allows a space between decimal and unit", (t) => {
  const result = millify(55500, { space: true });
  const expected = "55.5 K";
  t.is(expected, result);
});

test("allows custom units", (t) => {
  const options = { units: ["mg", "g", "kg", "tonne"], space: true };

  t.is(millify(Math.pow(10, 0), options), "1 mg");
  t.is(millify(Math.pow(10, 3), options), "1 g");
  t.is(millify(Math.pow(10, 6), options), "1 kg");
  t.is(millify(Math.pow(10, 9), options), "1 tonne");
  // Test empty unit if unit array is of insufficient length
  t.is(millify(Math.pow(10, 12), options), "1");
});

test("throws error if value is invalid", (t) => {
  t.throws(() => millify(Number.MAX_SAFE_INTEGER + 1));
  t.throws(() => millify(Number.MIN_SAFE_INTEGER - 1));
  t.throws(() => millify());
  t.throws(() => millify(null));
});

test("throws error if precision is invalid", (t) => {
  t.throws(() => millify(10000, { precision: Infinity }));
  t.throws(() => millify(10000, { precision: Math.PI }));
});

test("throws error if units is invalid", (t) => {
  t.throws(() => millify(1000, { units: [] }));
  t.throws(() => millify(1000, { units: {} }));
});
