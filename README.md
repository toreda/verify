![Toreda](https://content.toreda.com/logo/toreda-logo.png)

[![CI](https://img.shields.io/github/actions/workflow/status/toreda/verify/main.yml?branch=master&style=for-the-badge)](https://github.com/toreda/verify/actions) [![GitHub issues](https://img.shields.io/github/issues/toreda/verify?style=for-the-badge)](https://github.com/toreda/verify/issues)


[![GitHub package.json version (branch)](https://img.shields.io/github/package-json/v/toreda/verify/master?style=for-the-badge)](https://github.com/toreda/verify/releases/latest)
[![GitHub Release Date](https://img.shields.io/github/release-date/toreda/verify?style=for-the-badge)](https://github.com/toreda/verify/releases/latest)

[![license](https://img.shields.io/github/license/toreda/verify?style=for-the-badge)](https://github.com/toreda/verify/blob/master/LICENSE)

# `verify`
Expressive, type-safe validation for TypeScript. Write rules that read like plain English — `value.is.greaterThan(0).and.is.lessThan(100)` — verify entire objects with schemas, and handle the edge cases you'd otherwise hand-roll: type checks, null handling, empty values, and more.

&nbsp;

# Sections
1. [Rulesets](#rulesets)
   1. [How to use `Ruleset`](#how-to-use-ruleset)
   2. [Reading results](#reading-results)
   3. [Built-in Rules](#built-in-rules)
   4. [lessThan](#lessthan)
   5. [greaterThan](#greaterthan)
   6. [between](#between)
   7. [equalTo](#equalto)
2. [Schemas](#schemas)
3. [Checks](#checks)
4. [Rule Validators](#rule-validators)

&nbsp;

# Rulesets
Rulesets allow inlining of complex & reusable validation.

`Ruleset<ValueT>` is a generic collection of rules that perform custom verification. `ValueT` is
the `TypeScript` type of the value to be verified.

```typescript
// Create a ruleset using the expected type to be verified
const ruleset = new Ruleset<number>();
// Get a 'value' object from ruleset used to create rules.
const value = ruleset.value();
```

## How to use `Ruleset`
1. Create a `const ruleset = new Ruleset<ValueT>` where `ValueT` is the `TypeScript` type of the object or value you wish to verify.
2. You now have an empty set of rules.
3. Add a rule to the empty ruleset using `ruleset.add(ruleset.value().must.be.equalTo('cheese'));`

## Reading results
`ruleset.verify(input)` is async and returns a `Fate<VerifierResult>` from [`@toreda/fate`](https://www.npmjs.com/package/@toreda/fate). Call `ok()` to determine the overall outcome, and inspect `data` for per-rule counts.

```typescript
const ruleset = new Ruleset<number>();
const value = ruleset.value();
ruleset.add(value.must.be.greaterThan(10));

const result = await ruleset.verify(50);

if (result.ok()) {
	// All rules passed.
} else {
	// One or more rules failed. Details in result.data:
	// result.data.summary.counts -> {pass, fail, error, skip, total, ...}
	// result.data.failedMatchers -> names of matchers that failed.
}
```

## Chaining rules
Combine multiple conditions in a single statement using `and` / `or` after any matcher.

```typescript
const ruleset = new Ruleset<number>();
const value = ruleset.value();
ruleset.add(value.is.greaterThan(0).and.is.lessThan(100));

const result = await ruleset.verify(55);
```

## Built-in Rules

### Type Checks
`type(typeName: string)` — matches when the value is of the named built-in type.
* `value.is.type('string')`
* `value.is.type('array')`

`match.type(typeName)` and `match.atLeastOneType(typeNames)` — match one type, or any type from a list.
* `value.must.match.type('number')`
* `value.must.match.atLeastOneType(['string', 'number'])`

### String Rules
* `value.is.type('type_name')`
* `value.is.not.type('type_name')`
* `value.is.an.html5Tag()`

Some rules can be called using different phrases due to variations in the English language. In these situations, all "paths" to reach the function call produce the same result.
The following produce the same result:
* `value.must.be.an.html5Tag()`
* `value.is.an.html5Tag()`

### Comparison Rules
Invert any rule by using `not` before the helper. If `is.greaterThan(110)` is the helper, then use `is.not.greaterThan(110)`.

* `value.is.equalTo(100)`
* `value.is.greaterThan(110)`
* `value.is.greaterThanOrEqualTo(110)`
* `value.is.lessThan(110)`
* `value.is.lessThanOrEqualTo(110)`
* `value.is.between(0, 100)`

### Number Rules
* `value.is.divisibleBy(2)` — value divides evenly by the argument.
* `value.is.even()` — value is an even number.
* `value.is.odd()` — value is an odd number.
* `value.is.integer()` — value is an integer.
* `value.is.positiveInteger()` — value is an integer > 0.
* `value.is.negativeInteger()` — value is an integer < 0.
* `value.is.an.int()` — value is an integer.
* `value.is.a.uint()` — value is an unsigned integer (0 or greater).

```typescript
// Validate that input is an even number divisible by 10.
const ruleset = new Ruleset<number>();
const value = ruleset.value();
ruleset.add(value.is.even().and.is.divisibleBy(10));

const result = await ruleset.verify(20);
```

### Collection Rules
* `value.is.an.array()` — value is an array.
* `value.is.empty()` — value is empty.
* `value.is.iterable()` — value supports iteration.
* `value.has.length.equalTo(1)` — value length matches exactly.
* `value.has.length.greaterThan(1)` — value length is above the argument.
* `value.has.length.lessThan(10)` — value length is below the argument.

```typescript
// Validate that string input is non-empty and at most 9 characters.
const ruleset = new Ruleset<string>();
const value = ruleset.value();
ruleset.add(value.is.not.empty().and.has.length.lessThan(10));

const result = await ruleset.verify('cheese');
```

### Contains Rules
Check array or collection contents. Available through `value.contains` or `value.must.contain`.

* `value.contains.oneOf(['a', 'b'])` — contains at least one listed element.
* `value.contains.allOf(['a', 'b'])` — contains every listed element.
* `value.contains.noneOf(['a', 'b'])` — contains none of the listed elements.
* `value.contains.atLeast(2)` — contains at least n elements.
* `value.contains.atMost(5)` — contains at most n elements.
* `value.contains.exactly(3)` — contains exactly n elements.

```typescript
// Validate that input array contains 'red' or 'blue', but never 'green'.
const ruleset = new Ruleset<string[]>();
const value = ruleset.value();
ruleset.add(value.contains.oneOf(['red', 'blue']).and.contains.noneOf(['green']));

const result = await ruleset.verify(['blue', 'yellow']);
```

### Object Rules
* `value.must.haveProperty('id')` — object has the named property.
* `value.must.havePropertyWithType('id', 'string')` — object has the named property with the given type.

```typescript
// Validate that input object has an 'id' property of type string.
const ruleset = new Ruleset<{id: string}>();
const value = ruleset.value();
ruleset.add(value.must.havePropertyWithType('id', 'string'));

const result = await ruleset.verify({id: 'user-a97'});
```

### Network Rules
* `value.is.an.ipv4addr()` — value is a valid IPv4 address.
* `value.is.an.ipv6addr()` — value is a valid IPv6 address.

```typescript
// Validate that string input is a valid IPv4 address.
const ruleset = new Ruleset<string>();
const value = ruleset.value();
ruleset.add(value.is.an.ipv4addr());

const result = await ruleset.verify('192.168.1.1');
```

### Misc Rules
* `value.is.truthy()` — value evaluates to a truthy value.

## lessThan

```typescript
// Validate whether number input is less than 0.
const ruleset = new Ruleset<number>();
const value = ruleset.value();
ruleset.add(value.must.be.lessThan(0));

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

## greaterThan
```typescript
// Validate whether number input is greater than 100.
const ruleset = new Ruleset<number>();
const value = ruleset.value();
ruleset.add(value.must.be.greaterThan(100));

// Tests input against all rules in ruleset.
const result = await ruleset.verify(20000);
```

## between
```typescript
// Validate whether number input is between 0 and 5.
const ruleset = new Ruleset<number>();
const value = ruleset.value();
ruleset.add(value.must.be.between(0, 5));

// Tests input against all rules in ruleset.
const result = await ruleset.verify(3);
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
// Validate whether string input matches 'orange'.
const ruleset = new Ruleset<string>();
const value = ruleset.value();
ruleset.add(value.must.be.equalTo('orange'));

// Tests input against all rules in ruleset.
const result = await ruleset.verify('valuehere');
```

&nbsp;

# Schemas
`Schema` verifies whole objects field-by-field. Define the expected fields and allowed types once, then verify any input object against it. Supports optional fields via `defaultValue`, `null` types, nested child schemas, custom types, and output transformation.

```typescript
import {Log} from '@toreda/log';
import {Schema, type SchemaData} from '@toreda/verify';

interface UserData extends SchemaData<string | number | boolean> {
	name: string;
	age: number;
	active: boolean;
}

class UserSchema extends Schema<string | number | boolean, UserData, UserData> {
	constructor(base: Log) {
		super({
			name: 'UserSchema',
			fields: [
				{name: 'name', types: ['string']},
				{name: 'age', types: ['number']},
				// Multiple types allowed per field, including 'null'.
				{name: 'active', types: ['boolean', 'null']}
			],
			base: base
		});
	}
}

const base = new Log();
const schema = new UserSchema(base);

// Verify input object against the schema. Returns Fate<SchemaVerified>.
const result = await schema.verify({
	data: {name: 'Ana', age: 30, active: true},
	base: base
});

if (result.ok()) {
	// All fields matched schema requirements.
}
```

Use `schema.verifyAndTransform({...})` to verify and map the verified fields onto a typed output object in one call.

**Note:** `base` accepts any `LogLike` logger. The example above uses [`@toreda/log`](https://www.npmjs.com/package/@toreda/log), which is installed separately.

&nbsp;

# Checks
Checks are standalone verifier functions. Each returns a `Fate` result object: call `ok()` for the outcome, read `data` for the verified value, and `errorCode()` for the failure reason.

## `verifyArray`
Check that `value` is a valid array.
```typescript
const result = verifyArray<string>(['a', 'b']);
// result.ok() -> true, result.data -> ['a', 'b']
```
## `verifyArrayEmpty`
Check that `value` is a valid array and empty.
```typescript
const result = verifyArrayEmpty([]);
// result.ok() -> true

const result2 = verifyArrayEmpty(['a']);
// result2.ok() -> false
```
## `verifyBigInt`
Check that `value` is a `BigInt` type, is an integer, and is finite.
```typescript
const result = verifyBigInt(BigInt(10));
// result.ok() -> true, result.data -> 10n
```
## `verifyBoolean`
Check that `value` has a boolean value `true` or `false`. Does not use type coercion.
```typescript
const result = verifyBoolean(false);
// result.ok() -> true, result.data -> false

const result2 = verifyBoolean(1);
// result2.ok() -> false - no type coercion.
```
## `verifyStringId`
Configurable validator for string-based ID values. Accepts a number of boundary condition parameters including min/max length, allow empty, allow nulls, auto-trim, etc. The first argument names the ID field in error codes.
```typescript
const result = verifyStringId('user_id', 'usr-a97x', {
	length: {min: 3, max: 32}
});
// result.ok() -> true, result.data -> 'usr-a97x'
```
## `verifyUrl`
Configurable validator for URL values.
```typescript
const result = verifyUrl('https://www.toreda.com');
// result.ok() -> true, result.data -> 'https://www.toreda.com'

const result2 = verifyUrl('not a url');
// result2.ok() -> false
```

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

### `between`
Determine if `value` is strictly greater than `left` AND less than `right`. Async — returns a `Promise<boolean>`.
```typescript
// Result is TRUE - 15 is between 10 and 20.
const result = await between(10, 15, 20);
```

### `divisible`
Determine if `value` divides evenly by `by`. Returns `false` for non-finite inputs or division by zero.
```typescript
// Result is TRUE.
const result = divisible(10, 5);
```

### `even` / `odd`
Determine if `value` is an even or odd number.
```typescript
// Result is TRUE.
const result = even(4);
```
```typescript
// Result is TRUE.
const result = odd(3);
```

### `greaterThan` / `greaterThanEqualTo`
Determine if `left` is greater than (or equal to) `right`.
```typescript
// Result is TRUE.
const result = greaterThan(10, 5);
```
```typescript
// Result is TRUE.
const result = greaterThanEqualTo(10, 10);
```

### `lessThan` / `lessThanEqualTo`
Determine if `left` is less than (or equal to) `right`.
```typescript
// Result is TRUE.
const result = lessThan(5, 10);
```
```typescript
// Result is TRUE.
const result = lessThanEqualTo(10, 10);
```

### `equalTo`
Determine if `left` is strictly equal to `right`. No type coercion.
```typescript
// Result is FALSE - strict comparison, no coercion.
const result = equalTo(1, '1');
```

### `positiveInteger` / `negativeInteger`
Determine if `value` is an integer greater than zero, or an integer less than zero.
```typescript
// Result is TRUE.
const result = positiveInteger(5);
```
```typescript
// Result is TRUE.
const result = negativeInteger(-5);
```

&nbsp;

---

&nbsp;
## Numbers
### `isInt`
Determine if `value` is an integer. Type guard for `number`.
```typescript
// Result is TRUE.
const result = isInt(10);

// Result is FALSE.
const result2 = isInt(1.5);
```

### `isIntPos` / `isIntNeg`
Determine if `value` is a positive integer, or a negative integer.
```typescript
// Result is TRUE.
const result = isIntPos(3);
```
```typescript
// Result is TRUE.
const result = isIntNeg(-3);
```

### `isUInt`
Determine if `value` is an unsigned integer (0 or greater).
```typescript
// Result is TRUE.
const result = isUInt(0);

// Result is FALSE.
const result2 = isUInt(-1);
```

### `isNumber`
Determine if `value` is a number type. Returns `false` for `NaN`.
```typescript
// Result is TRUE.
const result = isNumber(1.5);
```

### `isNumberFinite`
Determine if `value` is a finite number. Returns `false` for `NaN`, `Infinity`, and `-Infinity`.
```typescript
// Result is FALSE.
const result = isNumberFinite(Number.POSITIVE_INFINITY);
```

### `isPrimeInt`
Determine if `value` is a prime number.
```typescript
// Result is TRUE.
const result = isPrimeInt(7);
```

### `isBigInt`
Determine if `value` is a `BigInt` type. Type guard for `bigint`.
```typescript
// Result is TRUE.
const result = isBigInt(BigInt(10));
```

&nbsp;

---

&nbsp;
## Collections
### `isArray`
Determine if `value` is an array.
```typescript
// Result is TRUE.
const result = isArray([]);

// Result is FALSE.
const result2 = isArray('string');
```

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

### `isArrayNotEmpty`
Determine if `value` is an array containing at least one element. Returns `false` when `value` is not an array.
```typescript
// Result is TRUE.
const result = isArrayNotEmpty(['one']);

// Result is FALSE.
const result2 = isArrayNotEmpty([]);
```

### `isIterable`
Determine if `value` supports iteration (arrays, strings, Maps, Sets, generators, etc.).
```typescript
// Result is TRUE.
const result = isIterable(['a', 'b']);

// Result is FALSE.
const result2 = isIterable(11);
```

### `empty`
Determine if `value` is empty. Works with strings, arrays, and objects.
```typescript
// Result is TRUE.
const result = empty('');

// Result is FALSE.
const result2 = empty(['a']);
```

&nbsp;

---

&nbsp;
## Strings
### `isString`
Determine if `value` is a string.
```typescript
// Result is TRUE.
const result = isString('one');

// Result is FALSE - no coercion of non-string values.
const result2 = isString(111);
```

### `isStringNotEmpty`
Determine if `value` is a string with a length of at least 1. Type guard for `string`.
```typescript
// Result is TRUE.
const result = isStringNotEmpty('one');

// Result is FALSE.
const result2 = isStringNotEmpty('');
```

### `isHtml5Tag`
Determine if `value` is a valid HTML5 tag name. Type guard for `Html5Tag`.
```typescript
// Result is TRUE.
const result = isHtml5Tag('div');

// Result is FALSE.
const result2 = isHtml5Tag('not-a-tag');
```

&nbsp;

---

&nbsp;
## Booleans & Misc
### `isBoolean`
Determine if `value` is a strict boolean `true` or `false`. No type coercion. Type guard for `boolean`.
```typescript
// Result is TRUE.
const result = isBoolean(false);

// Result is FALSE - truthy, but not a boolean.
const result2 = isBoolean(1);
```

### `isTruthy`
Determine if `value` evaluates to a truthy value.
```typescript
// Result is TRUE.
const result = isTruthy('one');

// Result is FALSE.
const result2 = isTruthy(0);
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
Copyright &copy; 2019 - 2026 Toreda, Inc. All Rights Reserved.

&nbsp;

# Github
https://github.com/toreda

# Website
https://www.toreda.com
