import capitalize from "./src/modules/capitalize";
import reverseString from "./src/modules/reverseString";
import calculator from "./src/modules/calculator";
import analyzeArray from "./src/modules/analyzeArray";
import caesarCipher from "./src/modules/caesarCipher";

// Test for capitalize
test("Capitalize", () => {
  expect(capitalize("hello")).toBe("Hello");
});

test("Already capitalized", () => {
  expect(capitalize("Hello")).toBe("Hello");
});

// Test for reversing string
test("Reverse String", () => {
  expect(reverseString("hello")).toBe("olleh");
});

// Test for calculator
test("Adding", () => {
  expect(calculator.add(2, 3)).toBe(5);
});

test("Subtracting", () => {
  expect(calculator.subtract(5, 2)).toBe(3);
});

test("Dividing", () => {
  expect(calculator.divide(10, 2)).toBe(5);
});

test("Multiply", () => {
  expect(calculator.multiply(3, 5)).toBe(15);
});

// Test for caesarCipher
test("CaesarCipher", () => {
  expect(caesarCipher("hello")).toBe("khoor");
});

// Test wrapping from z to a
test("Wrapping from z to a", () => {
  expect(caesarCipher("zebra")).toBe("cheud");
});

// Test for keeping case and punctuation
test("Case and punctuation", () => {
  expect(caesarCipher("Hello. How are you?")).toBe("Khoor. Krz duh brx?");
});

test("analyzeArray", () => {
  expect(analyzeArray([1, 8, 3, 4, 2, 6])).toStrictEqual({
    average: 4,
    min: 1,
    max: 8,
    length: 6,
  });
});
