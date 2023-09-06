export const formatSmallNumber = (_val: number, maxFractionDigits = 4) => {
  if (_val % 1 == 0) {
    return Math.round(_val).toLocaleString()
  } else {
    if (_val < 10 ** -maxFractionDigits) {
      return _val.toExponential(2).toLocaleString()
    }
    return parseFloat(_val.toFixed(maxFractionDigits)).toString()
  }
}

//borrowed from viem: https://github.com/wagmi-dev/viem/blob/main/src/utils/unit/formatUnits.ts
function formatUnits(value: bigint, decimals: number) {
  let display = value.toString()

  const negative = display.startsWith('-')
  if (negative) display = display.slice(1)

  display = display.padStart(decimals, '0')

  let [integer, fraction] = [
    display.slice(0, display.length - decimals),
    display.slice(display.length - decimals),
  ]
  fraction = fraction.replace(/(0+)$/, '')
  return `${negative ? '-' : ''}${integer || '0'}${
    fraction ? `.${fraction}` : ''
  }`
}

export function humanNumber(
  value: number,
  scale = false,
  maximumFractionDigits = 4,
  locale = 'en-US'
): string {
  const absValue = Math.abs(value)

  if (absValue < 1) {
    return formatSmallNumber(absValue, maximumFractionDigits)
  }

  if (scale) {
    const formatter = new Intl.NumberFormat(locale, {
      minimumFractionDigits: 0,
      maximumFractionDigits
    })

    if (absValue >= 1_000_000_000) {
      return formatter.format(value / 1_000_000_000) + 'B'
    } else if (absValue >= 1_000_000) {
      return formatter.format(value / 1_000_000) + 'M'
    } else if (absValue >= 100_000) {
      return formatter.format(value / 1_000) + 'K'
    } else if (absValue > 10_000) {
      return formatter.format(Math.round(absValue))
    }
  }

  const formatter = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits
  })

  return formatter.format(value)
}

export function humanBigint(
  value: bigint | string,
  decimals = 18,
  scale?: boolean,
  maximumFractionDigits?: number
) {
  return humanNumber(
    parseFloat(
      formatUnits(typeof value === 'string' ? BigInt(value) : value, decimals)
    ),
    scale,
    maximumFractionDigits
  )
}
