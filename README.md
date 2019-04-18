# millify
Converts long `numbers` into pretty, human-readable `strings`.

Before :unamused: | After :tada:
--- | ---
`2000` | `"2K"`
`42500` | `"42.5K"`
`1250000` | `"1.25M"`
`2700000000` | `"2.7B"`


## Install

Get it on [npm](https://www.npmjs.com/package/millify):

```bash
npm install millify
```
## Usage

### CLI

```bash
$ millify 10000
# 10K
```
See `millify --help` for options.

### Programmatically

**`millify(number, options)`**

```js
import millify from 'millify'

millify(2500)
// 2.5K

millify(1250000, {
  precision: 3,
  lowerCase: true
})
// 1.25m

millify(39500, {
  precision: 2,  
  decimalSeparator: ','
  space: true,
})
// 3,95 K
```

### Options

Name | Type | Default | Description
--- | --- | --- | ---
`precision` | `number` | `2` | Number of significant figures to use
`decimalSeparator` | `string` | `'.'` | Desired decimal separator (e.g. decimal point or comma)
`lowerCase` | `boolean` | `false` | Use lowercase abbreviations
`space` | `boolean` | `false` | Add a space between number and abbreviation
