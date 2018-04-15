const infinistack = require(".");
const assert = require("assert");

///////////////////////////////////////////////////////////////////////
console.log("🏁   Begin tests");
///////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////
// Fibonacci
function fibDumb(N) {
  if (N < 2) {
    return 1;
  } else {
    return (fibDumb(N - 2) + fibDumb(N - 1)) % 1000000007;
  }
}
// Don't do this, it will crash !
// console.log(fibDumb(100000));
///////////////////////////////////////////////////////////////////////
// Infinite fibonaci
let fibStack;
function fibSmart(N) {
  if (N < 2) {
    return 1;
  } else {
    return (fibStack(N - 2) + fibStack(N - 1)) % 1000000007;
  }
}
fibStack = infinistack(fibSmart);
// This works !
// console.log(fibStack(100000));
assert(fibStack(100000) === 967618232);
console.log("✅   Fibonacci");
///////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////
// Ackermann
function ackermannDumb(M, N) {
  if (M == 0) {
    return N + 1;
  }
  if (N == 0) {
    return ackermannDumb(M - 1, 1);
  }
  return ackermannDumb(M - 1, ackermannDumb(M, N - 1));
}
// Don't do this, it will crash !
// console.log(ackermannDumb(3, 11));
///////////////////////////////////////////////////////////////////////
// Infinite ackermann
let ackermannStack;
function ackermannSmart(M, N) {
  if (M == 0) {
    return N + 1;
  }
  if (N == 0) {
    return ackermannStack(M - 1, 1);
  }
  return ackermannStack(M - 1, ackermannStack(M, N - 1));
}
ackermannStack = infinistack(ackermannSmart);
// This works !
// console.log(ackermannStack(3, 11));
assert(ackermannStack(3, 11) === 16381);
console.log("✅   Ackermann");
///////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////
// Factorial
function factorialDumb(N) {
  if (N == 0) {
    return 1;
  }
  return N * factorialDumb(N - 1);
}
// Don't do this, it will crash !
// console.log(factorialDumb(180000));
///////////////////////////////////////////////////////////////////////
// Infinite factorial
let factorialStack;
function factorialSmart(N) {
  if (N == 0) {
    return 1;
  }
  return N * factorialStack(N - 1);
}
factorialStack = infinistack(factorialSmart);
// This works !
// console.log(factorialStack(180000));
assert(factorialStack(180000) === Infinity);
console.log("✅   Factorial");
///////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////
console.log("🎉   All tests successful !");
///////////////////////////////////////////////////////////////////////
