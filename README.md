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

Probably does not work for async functions or some non trivial recursion configurations (not sure though, it might work)
