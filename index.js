// @crubier 2018
// See the amazing job fom razimantv
// https://gist.github.com/razimantv/1b33d4a090a5bc9ed94928012b37c3f0

module.exports = function infinistack(f, log = false, sort = false) {
  let fStackified;

  const self = {
    f: f,
    cache: {},
    primary: true,
    topoSort: [],
    log: log,
    sort: sort,
    nextArg: null,
    stack: null
  };

  const handler = {
    apply: function(target, thisArg, args) {
      // Before calling the function, check if the argument is present in cache
      const key = args.toString();
      if (self.cache.hasOwnProperty(key)) {
        return self.cache[key];
      }
      if (self.log) {
        // console.log(`Call on ${args.toString()}`);
        // console.log("cache", JSON.stringify(self.cache, null, 2));
        // console.log("stack", JSON.stringify(self.stack, null, 2));
      }
      if (self.primary) {
        let value;
        // We are in a direct call. Initialise the stack
        if (self.log) {
          console.log(`Primary call on ${args.toString()}`);
        }
        self.primary = false;
        self.stack = [args];
        if (self.log) {
          console.log(`Push ${args.toString()} to stack`);
        }
        while (self.stack.length > 0) {
          // Pop an element from the stack and attempt to call the function
          const arg = self.stack.pop();
          if (self.log) {
            console.log(`Pop ${arg.toString()} from stack`);
          }
          try {
            if (self.log) {
              console.log(`Attempt to call ${arg.toString()}`);
              // console.log("cache", JSON.stringify(self.cache, null, 2));
              // console.log("stack", JSON.stringify(self.stack, null, 2));
            }
            value = f(...arg);
            // value = fStackified(...arg);
            // If an exception has not been raised, we have successful evaluation
            // We are guaranteed that any state the f(arg) needs is already
            // present in toposort[], so add arg to the toposort
            if (self.sort) {
              self.topoSort.push(arg);
            }
            if (self.log) {
              console.log(`Attempt to call ${arg.toString()} successful`);
            }
            self.cache[arg.toString()] = value;
          } catch (e) {
            if (e.type === "infinistack") {
              // Tried to recurse to non-cached value
              // Push it to stack after previous argument
              if (self.log) {
                console.log(`Attempt to call ${arg.toString()} failed`);
              }
              if (arg !== undefined && arg !== null) {
                if (self.log) {
                  console.log(`Push ${arg.toString()} to stack`);
                }
                self.stack.push(arg);
              }
              // if (self.nextArg !== undefined && self.nextArg !== null) {
              //   if (self.log) {
              //     console.log(`Push ${self.nextArg.toString()} to stack`);
              //   }
              //   self.stack.push(self.nextArg);
              // }
              if (e.nextArg !== undefined && e.nextArg !== null) {
                if (self.log) {
                  console.log(`Push ${e.nextArg.toString()} to stack`);
                }
                self.stack.push(e.nextArg);
              }
            } else {
              throw e;
            }
          }
        }
        self.primary = true;
        // We are guaranteed that the original argument was evaluated last
        // So we can just return the value
        return value;
      } else {
        // Tried to recurse to non-cached value
        // Save the argument and crash
        if (self.log) {
          console.log(`Attempted secondary call on  ${args.toString()}`);
        }
        // self.nextArg = args;
        throw { type: "infinistack", nextArg: args };
      }
    }
  };

  fStackified = new Proxy(f, handler);
  fStackified.self = self;
  return fStackified;
};
