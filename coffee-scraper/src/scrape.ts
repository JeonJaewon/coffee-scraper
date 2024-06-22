import { doc, setDoc } from 'firebase/firestore'
import puppeteer, { ElementHandle } from 'puppeteer'
import { SMART_STORE_URL } from './constants'
import { db } from './firebase'
import { Vendor, beanBrothers, hCoffeeRoasters, realBean } from './vendors'
import { v5 as uuidv5 } from 'uuid'
import { CoffeeItem } from './types'

export const scrape = async ({ title: vendorTitle, url, selectors }: Vendor) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(url)
  const createdAt = new Date().getTime()

  const { cardShapeSelector, listSelector, priceSelector, titleSelector, thumbnailSrcSelector } = selectors

  const list = await page.waitForSelector(listSelector)
  if (list === null) {
    throw new Error('No list found')
  }

  const rawItems = await list.$$(cardShapeSelector)

  const extractItemDetails = async (elementHandle: ElementHandle<Element>): Promise<CoffeeItem> => {
    const price = await elementHandle.$eval(priceSelector, (el) => Number(el.innerHTML.replace(',', '')))
    const title = await elementHandle.$eval(titleSelector, (el) => el.innerHTML)

    const thumbnailSrc = (await elementHandle.$eval(thumbnailSrcSelector, (img) => img.getAttribute('src'))) ?? ''

    const urlPath = await elementHandle.$eval('a', (el) => el.getAttribute('href'))

    return {
      price,
      title,
      thumbnailSrc,
      createdAt,
      vendor: vendorTitle,
      url: `${SMART_STORE_URL}${urlPath}`,
    }
  }

  const coffeeItems = await Promise.all(rawItems.map(extractItemDetails))

  for (const item of coffeeItems) {
    try {
      const id = uuidv5(item.url, uuidv5.URL)
      await setDoc(doc(db, 'coffeeItems', id), item)
    } catch (error) {
      console.error(error)
      return
    }
  }

  await browser.close()
  console.log(`Scraping Done for ${vendorTitle}, ${coffeeItems.length} items scraped`)
}

const vendors = [beanBrothers]
Promise.all(vendors.map((vendor) => scrape(vendor)))
  .then(() => {
    console.log('All scraping done')
    process.exit(0)
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
