import { parseEther } from './utils'

import { humanBigint, humanNumber } from '..'

describe('can format numbers for humans', () => {
  it('can format large numbers', () => {
    expect(humanNumber(1)).toEqual('1')
    expect(humanNumber(1.005)).toEqual('1.005')
    expect(humanNumber(1.0059)).toEqual('1.0059')
    expect(humanNumber(1.2)).toEqual('1.2')
    expect(humanNumber(1.23456)).toEqual('1.2346')
    expect(humanNumber(1200)).toEqual('1,200')
    expect(humanNumber(12000)).toEqual('12,000')
    expect(humanNumber(120000)).toEqual('120,000')
    expect(humanNumber(120500)).toEqual('120,500')
    expect(humanNumber(1_200_000)).toEqual('1,200,000')
    expect(humanNumber(1_205_000)).toEqual('1,205,000')
    expect(humanNumber(1_205_860)).toEqual('1,205,860')
    expect(humanNumber(1_200_000_000)).toEqual('1,200,000,000')
    expect(humanNumber(1_201_000_000)).toEqual('1,201,000,000')

    expect(humanNumber(1234.567891)).toEqual('1,234.5679')
    expect(humanNumber(1234.567891, false, 8)).toEqual('1,234.567891')
  })

  it('can format bigints, too', () => {
    expect(humanBigint(parseEther('1'))).toEqual('1')
    expect(humanBigint(parseEther('1.005'))).toEqual('1.005')
    expect(humanBigint(parseEther('1.0059'))).toEqual('1.0059')
    expect(humanBigint(parseEther('1.2'))).toEqual('1.2')
    expect(humanBigint(parseEther('1.23456'))).toEqual('1.2346')
    expect(humanBigint(parseEther('1200'))).toEqual('1,200')
    expect(humanBigint(parseEther('12000'))).toEqual('12,000')
    expect(humanBigint(parseEther('120000'))).toEqual('120,000')
    expect(humanBigint(parseEther('120500'))).toEqual('120,500')
    expect(humanBigint(parseEther('1200000'))).toEqual('1,200,000')
    expect(humanBigint(parseEther('1205000'))).toEqual('1,205,000')
    expect(humanBigint(parseEther('1205860'))).toEqual('1,205,860')
    expect(humanBigint(parseEther('1200000000'))).toEqual('1,200,000,000')
    expect(humanBigint(parseEther('1201000000'))).toEqual('1,201,000,000')

    expect(humanBigint(parseEther('1234.567891'))).toEqual('1,234.5679')
    expect(humanBigint(parseEther('1234.567891'), 18, false, 8)).toEqual(
      '1,234.567891'
    )
  })

  it('can reduce large numbers', () => {
    expect(humanNumber(1, true)).toEqual('1')
    expect(humanNumber(1.005, true)).toEqual('1.005')
    expect(humanNumber(1.0059, true)).toEqual('1.0059')
    expect(humanNumber(1.2, true)).toEqual('1.2')
    expect(humanNumber(1.23456, true)).toEqual('1.2346')
    expect(humanNumber(1200, true)).toEqual('1,200')
    expect(humanNumber(12000, true)).toEqual('12,000')
    expect(humanNumber(1200.2345, true)).toEqual('1,200.2345')
    expect(humanNumber(1200.2345, true, 0)).toEqual('1,200')
    expect(humanNumber(1200.2345, true, 2)).toEqual('1,200.23')
    expect(humanNumber(120000, true)).toEqual('120K')
    expect(humanNumber(120500, true)).toEqual('120.5K')
    expect(humanNumber(1_200_000, true, 0)).toEqual('1M')
    expect(humanNumber(1_200_000, true)).toEqual('1.2M')
    expect(humanNumber(1_205_000, true)).toEqual('1.205M')
    expect(humanNumber(1_205_860, true)).toEqual('1.2059M')
    expect(humanNumber(1_200_000_000, true)).toEqual('1.2B')
    expect(humanNumber(1_201_000_000, true)).toEqual('1.201B')

    //strips all decimals for numbers > 10k
    //seen at athena auction
    expect(humanNumber(64_068.2684, true, 0)).toEqual('64,068')
    expect(humanNumber(64_068.2684, true, 2)).toEqual('64,068')
    expect(humanNumber(65_068.28, true, 2)).toEqual('65,068')

    expect(humanNumber(1_059_424.52, true, 2)).toEqual('1.06M')
  })

  it('can reduce bigints, too', () => {
    expect(humanBigint(parseEther('1'), 18, true)).toEqual('1')
    expect(humanBigint(parseEther('1.005'), 18, true)).toEqual('1.005')
    expect(humanBigint(parseEther('1.0059'), 18, true)).toEqual('1.0059')
    expect(humanBigint(parseEther('1.2'), 18, true)).toEqual('1.2')
    expect(humanBigint(parseEther('1.23456'), 18, true)).toEqual('1.2346')
    expect(humanBigint(parseEther('1200'), 18, true)).toEqual('1,200')
    expect(humanBigint(parseEther('12000'), 18, true)).toEqual('12,000')
    expect(humanBigint(parseEther('120000'), 18, true)).toEqual('120K')
    expect(humanBigint(parseEther('120500'), 18, true)).toEqual('120.5K')
    expect(humanBigint(parseEther('1200000'), 18, true)).toEqual('1.2M')
    expect(humanBigint(parseEther('1205000'), 18, true)).toEqual('1.205M')
    expect(humanBigint(parseEther('1205860'), 18, true)).toEqual('1.2059M')
    expect(humanBigint(parseEther('1200000000'), 18, true)).toEqual('1.2B')
    expect(humanBigint(parseEther('1201000000'), 18, true)).toEqual('1.201B')

    //from athena auction
    expect(humanBigint(64068284585n, 6, true, 0)).toEqual('64,068')
  })

  it('can format small numbers', () => {
    expect(humanNumber(0.5176, false, 4)).toEqual('0.5176')
    expect(humanNumber(0.5176, false, 3)).toEqual('0.518')
    expect(humanNumber(0.51755, false, 4)).toEqual('0.5175') //todo interesting rounding issue
    expect(humanNumber(0.9)).toEqual('0.9')
    expect(humanNumber(0.09)).toEqual('0.09')
    expect(humanNumber(0.009)).toEqual('0.009')
    expect(humanNumber(0.0009)).toEqual('0.0009')
    expect(humanNumber(0.00009)).toEqual('9.00e-5')
    expect(humanNumber(0.000091)).toEqual('9.10e-5')
    expect(humanNumber(0.00009005)).toEqual('9.00e-5')
    expect(humanNumber(0.00009055)).toEqual('9.06e-5')
    expect(humanNumber(0.0000091)).toEqual('9.10e-6')
  })
})
