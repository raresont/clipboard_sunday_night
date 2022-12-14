# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

### For refactoring:
- Made consts globally available
- Added default event case
- Extracted create hash function
- Considered the canditate check refactoring to create a single line with "not a string codition", but maybe the hash function returns a number or anything that is not a string, let's not trust it this time. I didn't looked over it's documentation so I want to be safe.

I believe that my solution is a bit cleaner since we can read it as a process of setting a canditate, then checking if it is not a string in order to set it as one, then checking it's length.

I exported a const and the hash function for testing, I know they can be taken by other ways, without exporting them, but not on Sunday night :) 
The const can be exported, so it is easier to get some context for this function.
