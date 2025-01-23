![Toreda](https://content.toreda.com/logo/toreda-logo.png)

[![CI](https://img.shields.io/github/actions/workflow/status/toreda/verify/main.yml?branch=master&style=for-the-badge)](https://github.com/toreda/verify/actions) [![Coverage](https://img.shields.io/sonar/coverage/toreda_cache?server=https%3A%2F%2Fsonarcloud.io&style=for-the-badge)](https://sonarcloud.io/dashboard?id=toreda_cache) ![Sonar Quality Gate](https://img.shields.io/sonar/quality_gate/toreda_cache?server=https%3A%2F%2Fsonarcloud.io&style=for-the-badge) [![GitHub issues](https://img.shields.io/github/issues/toreda/verify?style=for-the-badge)](https://github.com/toreda/verify/issues)


[![GitHub package.json version (branch)](https://img.shields.io/github/package-json/v/toreda/verify/master?style=for-the-badge)](https://github.com/toreda/verify/releases/latest)
[![GitHub Release Date](https://img.shields.io/github/release-date/toreda/verify?style=for-the-badge)](https://github.com/toreda/verify/releases/latest)

[![license](https://img.shields.io/github/license/toreda/verify?style=for-the-badge)](https://github.com/toreda/verify/blob/master/LICENSE)

# `verify`
Automated verification for forms, fields, and objects. Eliminate common edge cases. Automate common type checks and validation checks.

&nbsp;

# Sections
1. [Rulesets](#Ruchhlesets)
   1. [lessThan](#lessThan)
   2. [greaterThan](#greaterThan)
   3. [between](#between)
   4. [equalTo](#equalTo)

&nbsp;

# Rulesets
```typescript
// Create a ruleset using the expected type to be verified
const ruleset = new Ruleset<number>();
// Get a 'value' object from ruleset used to create rules.
const value = ruleset.value();
```

## lessThan

```typescript
// Validate whether number input less than 0.
const ruleset = new Ruleset<number>();
const value = ruleset.value();
ruleset.add(value.must.be.between(0, 5));

// Tests input against all rules in ruleset.
const result = await ruleset.verify(-99);
```

```typescript
// Validate whether number input is not less than 0.
const ruleset = new Ruleset<number>();
const value = ruleset.value();
ruleset.add(value.must.not.be.lessThan(0));

// Tests input against all rules in ruleset.
const result = await ruleset.verify(1);
```

## between
```typescript
// Validate whether number input is greater than 100.
const ruleset = new Ruleset<number>();
const value = ruleset.value();
ruleset.add(value.must.be.greaterThan(100));

// Tests input against all rules in ruleset.
const result = await ruleset.verify(20000);
```

## greaterThan
```typescript
// Validate whether number input is greater than 100.
const ruleset = new Ruleset<number>();
const value = ruleset.value();
ruleset.add(value.must.be.greaterThan(100));

// Tests input against all rules in ruleset.
const result = await ruleset.verify(20000);
```

## equalTo
```typescript
// Value must be equal to this
const ruleset = new Ruleset<number>();
const value = ruleset.value();
ruleset.add(value.must.be.equalTo(100));

// Tests input against all rules in ruleset.
const result = await ruleset.verify(100);
```

### `number` values
```typescript
// Validate whether number input is exactly 10.
const ruleset = new Ruleset<number>();
const value = ruleset.value();
ruleset.add(value.must.be.equalTo(10));

// Tests input against all rules in ruleset.
const result = await ruleset.verify(0);
```

### `string` values
```typescript
// Validate whether string input matches 'one'.
const ruleset = new Ruleset<string>();
const value = ruleset.value();
ruleset.add(value.must.be.equalTo('one'));

// Tests input against all rules in ruleset.
const result = await ruleset.verify('valuehere');
```

# Checks
## `verifyArray`
Check that `value` is a valid array.
## `verifyArrayEmpty`
Check that `value` is a valid array and empty.
## `verifyBigInt`
Check that `value` is a `BigInt` type, is an integer, and is finite.
## `verifyBoolean`
Check that `value` has a boolean value `true` or `false`. Does not use type coercion.
## `verifyStringId`
Configurable validator for string-based ID values. Accepts a number of boundary condition parameters including min/max length, allow empty, allow nulls, auto-trim, etc.
## `verifyUrl`
Configurable validator for URL values.

&nbsp;

# Rule Validators
Rule validators check for a single condition using one or more function arguments and return a strict `boolean` value `true` or `false`.


## Maths
### `powOf`
Determine if `value` is a power of `exponent`.

&nbsp;

**Use cases**
  * User uploaded image dimensions.
  * Texture sizes with size requirements, e.g. the power of 2 rule.
  * Cases where inputs may have non-number or non-finite values.
* Performs type and bound checks on values before attempting to use math functions and returns `false` if the call would otherwise fail.

&nbsp;
```typescript
// Determine if 0 is a power of 1.
const result = powOf(0, 1);
```
```typescript
// Determine if 100 is a power of 10.
const result = powOf(100, 10);
```

&nbsp;

---

&nbsp;
## Collections
### `isArrayEmpty`
Determine if `value` is an array and if so, whether it's empty. Does not throw. Returns `false` in all cases where `value` is not an array.

&nbsp;

```typescript
const value: string[] = ['one'];

// Result is FALSE.
const result = isArrayEmpty(value);
```



```typescript
// Result is FALSE.
const result = isArrayEmpty(null);
```

```typescript
// Result is FALSE.
const result = isArrayEmpty({});
```

### TypeScript Equivalent
```typescript
const value: unknown = '081408';
const result = Array.isArray(value) && value.length === 0;
```

&nbsp;

# Package
`@toreda/verify` on [NPM](https://www.npmjs.com/package/@toreda/verify).

&nbsp;

# Source Code
`@toreda/verify` source on [Github](https://github.com/toreda/verify).


&nbsp;
# Contributions
Bug reports, comments, and pull requests are welcome.

&nbsp;
# Legal

## License
[MIT](LICENSE) &copy; Toreda, Inc.

## Copyright
Copyright &copy; 2019 - 2025 Toreda, Inc. All Rights Reserved.

&nbsp;

# Github
https://github.com/toreda

# Website
https://www.toreda.com

