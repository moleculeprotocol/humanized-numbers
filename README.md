# humanized numbers

humanizes numbers aka cuts unnecessary floating point display precision and shows 10exp shortcuts (monetary) like "M","K","B". 

Supports bigints, scientific notation, decimal cutting.

zero dependencies

```bash
npm i @moleculexyz/humanized-numbers
``` 

```ts
import {humanNumber, humanBigint} from '@moleculexyz/humanized-numbers'

expect(humanNumber(1234.567891)).toEqual('1,234.5679')
expect(humanNumber(1200.2345, true, 2)).toEqual('1,200.23')
expect(humanNumber(1_205_860, true)).toEqual('1.2059M')
expect(humanNumber(1_059_424.52, true, 2)).toEqual('1.06M')

//also works with bigints
expect(humanBigint(1205860000000000000000000n, 18, true)).toEqual('1.2059M')
expect(humanBigint(64068284585n, 6, true, 0)).toEqual('64,068')

```

## TODO

Use the user's locale by default. Atm we're using en_US as the default.