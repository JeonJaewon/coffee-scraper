import { buildVendorUrl } from './utils'
import { buildCardShapeSelector, buildSelector } from './utils'

export type CardShape = 'SQUARE' | 'RECTANGLE' | 'V_RECT'
export type CardShapeSelector = `.${CardShape}`

type ScrapeSelectors = {
  cardShapeSelector: CardShapeSelector
  listSelector: string
  priceSelector: string
  titleSelector: string
  thumbnailSrcSelector: string
}

export type Vendor = {
  vendorName: string
  url: string
  selectors: ScrapeSelectors
}

export const realBean: Vendor = {
  vendorName: '리얼빈',
  url: buildVendorUrl('/realbean/category/cca9273ba86d4707adafaf15872a957a?cp=1'),
  selectors: {
    cardShapeSelector: buildCardShapeSelector('SQUARE'),
    listSelector: buildSelector(['wOWfwtMC_3', '_3cLKMqI7mI']),
    priceSelector: buildSelector('_2DywKu0J_8'),
    titleSelector: buildSelector('_26YxgX-Nu5'),
    thumbnailSrcSelector: buildSelector('_25CKxIKjAk'),
  },
}

export const beanBrothers: Vendor = {
  vendorName: '빈브라더스',
  url: buildVendorUrl('/beanbrothers/category/bde432298242411098a91d5474cf7eb4?cp=1'),
  selectors: {
    cardShapeSelector: buildCardShapeSelector('SQUARE'),
    listSelector: buildSelector(['wOWfwtMC_3', '_3cLKMqI7mI']),
    priceSelector: buildSelector('_2DywKu0J_8'),
    titleSelector: buildSelector('_26YxgX-Nu5'),
    thumbnailSrcSelector: buildSelector('_25CKxIKjAk'),
  },
}

export const hCoffeeRoasters: Vendor = {
  vendorName: '에이치커피로스터스',
  url: buildVendorUrl('/hcoffeeroasters/category/9868ab1333974cfe9a012075dc7f1c03?cp=1'),
  selectors: {
    cardShapeSelector: buildCardShapeSelector('V_RECT'),
    listSelector: buildSelector(['wOWfwtMC_3', 'FR2H3hWxUo']),
    priceSelector: buildSelector('_2DywKu0J_8'),
    titleSelector: buildSelector('_26YxgX-Nu5'),
    thumbnailSrcSelector: buildSelector('_25CKxIKjAk'),
  },
}

export const lowKeyCoffee: Vendor = {
  vendorName: '로우키 커피',
  url: buildVendorUrl('/lowkeycoffee/category/1f0142c3fcc34559ada637b364f915c2?cp=1'),
  selectors: {
    cardShapeSelector: buildCardShapeSelector('SQUARE'),
    listSelector: buildSelector(['_3ba8S41U2S', 'tCv2enlAmw']),
    priceSelector: buildSelector('_3XLnd6iWP5'),
    titleSelector: buildSelector('_16P0LCXnI1'),
    thumbnailSrcSelector: buildSelector('_25CKxIKjAk'),
  },
}

export const VENDORS = [realBean, beanBrothers, hCoffeeRoasters, lowKeyCoffee]
