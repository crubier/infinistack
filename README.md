# Infinistack 🎩✨🐇

Infinite recursion in JS without stack overflow errors!

Based on magic, abuse of exceptions and the work of [@razimantv](https://gist.github.com/razimantv/1b33d4a090a5bc9ed94928012b37c3f0).

If you need this package to make your code work, then my advice would be to rethink your code structure. This library works, but is not efficient or safe. Instead of using this, unroll you recursion into iterative algorithms, you will thank me later.

By [@crubier](https://github.com/crubier)

## Install

```bash
npm install infinistack
```

## Usage

Here is a classical, "dumb" factorial implementation:

```javascript
const factorial = N => {
  if (N == 0) {
    return 1;
  }
  return N * factorial(N - 1);
};

// Don't do this, it will crash:
console.log(factorial(180000));
```

This can be transformed with infinistack in order to emancipate from stack overflow errors:

```javascript
import infinistack from "infinistack";

const factorial = infinistack(N => {
  if (N == 0) {
    return 1;
  }
  return N * factorial(N - 1);
});

// This works now!
console.log(factorial(180000));
```

Amazing. Thanks to [@razimantv](https://github.com/razimantv) for [the original idea in python](https://gist.github.com/razimantv/1b33d4a090a5bc9ed94928012b37c3f0)

## Caveats

Not yet tested on:

* Async functions
* Non trivial recursion schemes
* Function calls with non-stringifiable arguments (higher order functions for example)
