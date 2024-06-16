import { buildVendorUrl } from './utils'
import { buildCardShapeSelector, buildSelector } from './utils'

export type CardShape = 'SQUARE' | 'RECTANGLE' | 'V_RECT'
export type CardShapeSelector = `.${CardShape}`

type ScrapeSelectors = {
  cardShapeSelector: CardShapeSelector
  listSelector: string
  priceSelector: string
  titleSelector: string
}

export type Vendor = {
  title: string
  url: string
  selectors: ScrapeSelectors
}

export const realBean: Vendor = {
  title: '리얼빈',
  url: buildVendorUrl('/realbean/category/cca9273ba86d4707adafaf15872a957a?cp=1'),
  selectors: {
    cardShapeSelector: buildCardShapeSelector('SQUARE'),
    listSelector: buildSelector(['wOWfwtMC_3', '_3cLKMqI7mI']),
    priceSelector: buildSelector('_2DywKu0J_8'),
    titleSelector: buildSelector('_26YxgX-Nu5'),
  },
}

export const beanBrothers: Vendor = {
  title: '빈브라더스',
  url: buildVendorUrl('/beanbrothers/category/bde432298242411098a91d5474cf7eb4?cp=1'),
  selectors: {
    cardShapeSelector: buildCardShapeSelector('SQUARE'),
    listSelector: buildSelector(['wOWfwtMC_3', '_3cLKMqI7mI']),
    priceSelector: buildSelector('_2DywKu0J_8'),
    titleSelector: buildSelector('_26YxgX-Nu5'),
  },
}

export const hCoffeeRoasters: Vendor = {
  title: '에이치커피로스터스',
  url: buildVendorUrl('/hcoffeeroasters/category/9868ab1333974cfe9a012075dc7f1c03?cp=1'),
  selectors: {
    cardShapeSelector: buildCardShapeSelector('V_RECT'),
    listSelector: buildSelector(['wOWfwtMC_3', 'FR2H3hWxUo']),
    priceSelector: buildSelector('_2DywKu0J_8'),
    titleSelector: buildSelector('_26YxgX-Nu5'),
  },
}
