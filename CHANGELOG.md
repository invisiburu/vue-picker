# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.1.0] - 2022-01-05
### Added
- `onKeyDown` prop to override/extend the key down listener

## [2.0.5] - 2021-11-18
### Fixed
- Focus of null `openerRef` issue

## [2.0.4] - 2021-09-25
### Fixed
- Readme npm preview fix

## [2.0.3] - 2021-09-09
### Fixed
- onBeforeUnmount unlisten() fix
- NPM audit issues

## [2.0.2] - 2021-06-09
### Fixed
- NPM audit issues

## [2.0.1] - 2021-06-09
### Fixed
- UNPKG version example

## [2.0.0] - 2021-06-08
### Changed
- Now supports only Vue3 version. Please use the lower versions of the package
  for Vue2 applications.
- Replaced `disabled` and `autofocus` attributes with `isDisabled` and
  `isAutofocus` boolean props. So you can now only use `:isDisabled="true"`
  instead of former possible forms like `disabled`, `disabled="disabled"` or
  `disabled="true"`. Although their API felt similar to familiar HTML
  attributes, the feature took too many resources for an incomparably
  insignificant impact. The change affects both `VuePicker` and
  `VuePickerOption`.
- Renamed css modifier selectors:
  - `.vue-picker--open` => `.vue-picker_open`
  - `.vue-picker--disabled` => `.vue-picker_disabled`
  - `.vue-picker--has-val` => `.vue-picker_has-val`
- The opener's text is now immediately updated on navigation with up and down
  arrows in the open dropdown.
- Updated demo
- Updated README.md

### Fixed
- Resolved an issue of wrong navigation order on dynamically updated option list
- Resolved an issue of opener's wrongly text coloured as placeholder despite a
  preselected valuable option.

## [1.1.2] - 2021-03-06
### Fixed
- Deps security issues

## [1.1.1] - 2020-10-31
### Fixed
- Security issues for `npm audit`

## [1.1.0] - 2020-10-31
### Added
- Demo page

### Fixed
- An issue with broken bottom padding of the default styles

### Changed
- Show empty when no options with the provided value found
- Show disabled options for forcedly applied values

## [1.0.2] - 2020-08-08
### Fixed
- Fix CHANGELOG.md

## [1.0.1] - 2020-08-08
### Changed
- Updated README.md

## [1.0.0] - 2020-08-07
### Added
- VuePicker and VuePickerOption components
- NPM package, build and minify setup
- README.md
- LICENSE

[UNRELEASED]: https://github.com/invisiburu/vue-picker/compare/v2.0.5...HEAD
[2.0.5]: https://github.com/invisiburu/vue-picker/compare/v2.0.4...v2.0.5
[2.0.4]: https://github.com/invisiburu/vue-picker/compare/v2.0.3...v2.0.4
[2.0.3]: https://github.com/invisiburu/vue-picker/compare/v2.0.2...v2.0.3
[2.0.2]: https://github.com/invisiburu/vue-picker/compare/v2.0.1...v2.0.2
[2.0.1]: https://github.com/invisiburu/vue-picker/compare/v2.0.0...v2.0.1
[2.0.0]: https://github.com/invisiburu/vue-picker/compare/v1.1.2...v2.0.0
[1.1.2]: https://github.com/invisiburu/vue-picker/compare/v1.1.1...v1.1.2
[1.1.1]: https://github.com/invisiburu/vue-picker/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/invisiburu/vue-picker/compare/v1.0.2...v1.1.0
[1.0.2]: https://github.com/invisiburu/vue-picker/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/invisiburu/vue-picker/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/invisiburu/vue-picker/releases/tag/v1.0.0

