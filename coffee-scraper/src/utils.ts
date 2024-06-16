import { SMART_STORE_URL } from './constants'
import { CardShape, CardShapeSelector } from './vendors'

export const buildSelector = (selector: string | string[]) => {
  if (Array.isArray(selector)) {
    return `.${selector.join('.')}`
  } else {
    return `.${selector}`
  }
}

export const buildCardShapeSelector = (shape: CardShape): CardShapeSelector => {
  return `.${shape}`
}

export const buildVendorUrl = (path: string) => {
  return `${SMART_STORE_URL}${path}`
}
