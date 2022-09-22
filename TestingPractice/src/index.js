import capitalize from "./src/modules/capitalize";
import reverseString from "./src/modules/reverseString";
import calculator from "./src/modules/calculator";
import analyzeArray from "./src/modules/analyzeArray";

const cap = capitalize("hello");
console.log(cap);

const rev = reverseString("hello");
console.log(rev);

const calc = calculator.add(3, 4);
console.log(calc);

const analyze = analyzeArray([1, 5, 6, 3, 8]);
console.log(analyze);
