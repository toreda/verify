# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
## [0.14.0] - 2026-09-14

## Dependencies
* Updated typescript to `v6`. Project is not yet ready for `v7` migration even though `v7` is available.
* Updated `@toreda/eslint` from `2.2.0` -> `3.1.0` which fixes `eslint` errors on build and cases where linting is skipped during build.

## [0.13.0] - 2026-01-18

### Added
* `odd` rule for rulesets - `value.is.odd()`
* `even` rule for rulesets - `value.is.even()`
* `greaterThanOrEqualTo` rule for rulesets. The previous usage of `value.greaterThan(value).or.equalTo(value)` still exists, but can be also used as a single call `value.is.greaterThanOrEqualTo(value)`.
* `lessThanOrEqualTo` rule for rulesets. The previous usage of `value.greaterThan(value).or.equalTo(value)` still exists, but can be also used as a single call `value.is.lessThanOrEqualTo(value)`.

### Changed
* Added dual CommonJS and ESM output.
* `@toreda/log` usage was converted to `LogLike` to enable `log` args to accept any object that satisfies the standard log method interface like the one `console` implements (e.g. `console.warn`, `console.info`, etc).

### Fixed
* Broken integer rule now works in `BlockIs` (e.g. `rule.is.`).
* Custom verifiers in Schema no longer reject input in some circumstances and should always work as expected.
* Schema fields now pass through `null` to the verified result when the field explicitly allows `null`. Previously, they came through as `undefined` if the input value was `null` even if the field allowed `null`.

## [0.12.3] - 2025-06-06
* Updated package dependencies.
* Removed yarn lock file and switched to `pnpm`.


## [0.12.2] - 2025-02-20
* Removed unnecessary debug output from schema validation functions.

## [0.12.1] - 2025-02-06
* Fixed recursive schema verification problem where verification failed after identifying a valid sub-schema type.

## [0.12.0] - 2025-01-11
* Fixed type errors that could occur with sub-schema fields and recursive verification.
* Schema fields with a custom schema type no longer share their parent's `TransformedT`. Schemas only transform `VerifiedT` -> `TransformedT` when data verification succeeds. Transform functions can produce any value as long as it's of type `TransformedT`, but there's no guarantee that a schema's `TransformedT` has any TypeScript type relationship to the `TransformedT` of a child schema property.
* Custom Type names used schema fields are now preprocessed to support additional shorthand in type names. Previously allowing `MyType[]` and `undefined` required two field entries, but can now be reduced to `MyType[]?`.
* Fixed 'undefined' types not being accepted when explicitly allowed in some cases.
* Minor package updates.
* Removed some comment tags causing doc generation errors.
* Changed `allowEmptyInputObject` flag to `failOnEmptyInputObject` used in `SchemaVerifyInit` to better describe the flag's purpose.

## [0.11.2] - 2024-06-14
* Fixed 'undefined' types not being accepted when explicitly allowed in some cases.

## [0.11.1] - 2024-06-14
* Fixed sub-schema array processing not bubbling up their error state to the final verification result. Schema elements that failed to verify would not be added to the verified output, but would not report the failure.

## [0.11.0] - 2024-06-13
* Added support for arrays + recursive schemas together.
* Fixed type error caused by generic type mismatch.

## [0.10.0] - 2024-05-29

### Added
* Schemas support recursive verification.

### Changed
* `schemaSimpleOutputTransform` became `simpleOutputTransform`.

## [0.9.0] - 2024-04-17

### Changed
* `SchemaField` from the previous version became `SchemaFieldData` and is the same except for `nullable` being removed. `SchemaField` is now a class instantiated using `SchemaFieldData`.

### Removed
* Unused helpers for schema type checks removed.
* `nullable` removed from `SchemaField` in favor of adding `'null'` to field types.

## [0.8.0] - 2024-04-12
### Added
* Added `isUInt` type to package in place of importing from `@toreda/strong-types`.
* `schemaSimpleOutput` returns basic `string` key -> `Primitive` maps from schema input data and is now the default factory for Schemas unless `factory` is provided in schema init.

### Changed
* Removed `schemaVerify` flow. Schema verification now flows through the `Schema` object and using `schema.verify(...)`.

## [0.7.1] - 2024-04-10
## Fixed
* Added missing `typings` property to `package.json`.

## [0.7.0] - 2024-04-04

## Added
* Schema system with JSON-style rule config.

## Changed
* Major rule system refactor to rework and simplify usage.

## [0.6.0] - 2023-05-25
## Changed
* `chk` functions return the provided `value` argument as `fate.data`. Some `chk` functions now accept a generic type which defaults to unknown and is not required to call. No other existing aspects of the returned `fate` object have changed. `fate.data` was already present but was not set to anything.

---

## [0.5.4] - 2023-05-24
### Fixed
* Changed `value` arg from type validator-specific types like `string` to `unknown` in all stand-alone `chk` functions like `chkStringId` and `chkArrayEmpty`. Strict `value` types caused build errors when `value` *may* not be the expected type.

### Dependencies
* Updated all packages in `devDependencies` to the latest version.

---
## [0.5.3]
* *No notes available for release.*

---
## [0.4.1] - 2023-03-10
* Fixed issue in `chkStringId` where the result `Fate.success` was not set to `true`.

---

## [0.4.0]
* *No notes available for release.*
---

## [0.3.1] - 2022-05-16
### Fixed
* Resolved issue preventing package install via `npm install @toreda/chk`.

### Updates
* Project dependencies updated to latest available.

---

## [0.3.0]

### Added
* First version of validator chains in place.
* Expanded test coverage for all classes.

---

## [0.1.0]
* *No notes available for release.*

[Unreleased]: https://github.com/toreda/verify/compare/v0.14.0...HEAD
[0.13.0]: https://github.com/toreda/verify/compare/v0.12.3...v0.14.0
[0.13.0]: https://github.com/toreda/verify/compare/v0.12.3...v0.13.0
[0.12.3]: https://github.com/toreda/verify/compare/v0.12.2...v0.12.3
[0.12.2]: https://github.com/toreda/verify/compare/v0.12.1...v0.12.2
[0.12.1]: https://github.com/toreda/verify/compare/v0.12.0...v0.12.1
[0.12.0]: https://github.com/toreda/verify/compare/v0.11.2...v0.12.0
[0.11.2]: https://github.com/toreda/verify/compare/v0.11.1...v0.11.2
[0.11.1]: https://github.com/toreda/verify/compare/v0.11.0...v0.11.1
[0.11.0]: https://github.com/toreda/verify/compare/v0.10.0...v0.11.0
[0.10.0]: https://github.com/toreda/verify/compare/v0.9.0...v0.10.0
[0.9.0]: https://github.com/toreda/verify/compare/v0.8.0...v0.9.0
[0.8.0]: https://github.com/toreda/verify/compare/v0.7.1...v0.8.0
[0.7.1]: https://github.com/toreda/verify/compare/v0.7.0...v0.7.1
[0.7.0]: https://github.com/toreda/verify/compare/v0.6.0...v0.7.0
[0.6.0]: https://github.com/toreda/verify/compare/v0.5.4...v0.6.0
[0.5.4]: https://github.com/toreda/verify/compare/v0.5.3...v0.5.4
[0.5.3]: https://github.com/toreda/verify/compare/v0.4.1...v0.5.3
[0.4.1]: https://github.com/toreda/verify/compare/v0.4.0...v0.4.1
[0.4.0]: https://github.com/toreda/verify/compare/v0.3.1...v0.4.0
[0.3.1]: https://github.com/toreda/verify/compare/v0.3.0...v0.3.1
[0.3.0]: https://github.com/toreda/verify/compare/v0.1.0...v0.3.0
[0.1.0]: https://github.com/toreda/verify/releases/tag/v0.1.0
