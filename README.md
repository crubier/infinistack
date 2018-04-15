# Infinistack 🎩✨🐇

Infinite recursion in JS without stack overflow errors! Based on magic (and abuse of exceptions).

By [@crubier](https://github.com/crubier)

## Install

```bash
npm install infinistack
```

## Usage

Here is a classical, "dumb" factorial implementation:

```javascript
function factorialDumb(N) {
  if (N == 0) {
    return 1;
  }
  return N * factorialDumb(N - 1);
}

// Don't do this, it will crash:

console.log(factorialDumb(180000));
```

This can be transformed with infinistack in order to emancipate from stack overflow errors:

```javascript
const infinistack = require("infinistack");

let factorialStack; // The actual function that we will be able to call
function factorialSmart(N) {
  // Another function which acts as a prototype
  if (N == 0) {
    return 1;
  }
  return N * factorialStack(N - 1); // Recursion but not on itself
}
factorialStack = infinistack(factorialSmart); // Make the magic happen

// This works:

console.log(factorialStack(180000));
```

Amazing. Thanks to [@razimantv](https://github.com/razimantv) for [the original idea in python](https://gist.github.com/razimantv/1b33d4a090a5bc9ed94928012b37c3f0)

## Caveats

Probably does not work for async functions or some non trivial recursion configurations (not sure though, it might work)
