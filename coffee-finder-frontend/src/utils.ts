export const formatToKRW = (price: number) => {
  if (price < 1000) return `${price}원`

  return price
    .toString()
    .split('')
    .reverse()
    .map((char, index) => {
      if (index % 3 === 0 && index !== 0) {
        return `${char},`
      }
      return char
    })
    .reverse()
    .join('')
    .concat('원')
}
