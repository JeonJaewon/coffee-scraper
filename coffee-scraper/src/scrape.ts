import { doc, setDoc } from 'firebase/firestore'
import puppeteer, { ElementHandle } from 'puppeteer'
import { SMART_STORE_URL } from './constants'
import { db } from './firebase'
import { CoffeeItem, CreatedAtTimestamp, VendorSnapshot } from './types'
import { Vendor, beanBrothers, hCoffeeRoasters, realBean } from './vendors'

const createdAt = new Date().getTime()

const scrape = async ({ vendorName, url, selectors }: Vendor) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(url)

  const { cardShapeSelector, listSelector, priceSelector, titleSelector, thumbnailSrcSelector } = selectors

  const list = await page.waitForSelector(listSelector)
  if (list === null) {
    throw new Error('No list found')
  }

  const rawItems = await list.$$(cardShapeSelector)

  const extractItemDetails = async (elementHandle: ElementHandle<Element>): Promise<CoffeeItem> => {
    const price = await elementHandle.$eval(priceSelector, (el) => Number(el.innerHTML.replace(',', '')))
    const title = await elementHandle.$eval(titleSelector, (el) => el.innerHTML)
    const thumbnailSrc = await elementHandle.$eval(thumbnailSrcSelector, (img) => img.getAttribute('src'))
    const urlPath = await elementHandle.$eval('a', (el) => el.getAttribute('href'))

    return {
      price,
      title,
      vendorName,
      thumbnailSrc: thumbnailSrc ?? '',
      url: `${SMART_STORE_URL}${urlPath}`,
    }
  }
  const id = `${createdAt}-${vendorName}`
  const coffeeItems = await Promise.all(rawItems.map(extractItemDetails))

  const makeVendorSnapshot = (): VendorSnapshot => {
    return { vendorName, coffeeItems, createdAt }
  }
  try {
    await setDoc(doc(db, 'vendorSnapshots', id), makeVendorSnapshot())
  } catch (error) {
    console.error(error)
    return
  }

  await browser.close()
  console.log(`Scraping Done for ${vendorName}, ${coffeeItems.length} items scraped`)
}

const addCreatedAtTimestamp = async (createdAt: number) => {
  try {
    const createdAtTimestamp: CreatedAtTimestamp = { createdAt }
    await setDoc(doc(db, 'createdAtTimestamps', createdAt.toString()), createdAtTimestamp)
    console.log('Added createdAt timestamp', createdAt, createdAt.toLocaleString())
  } catch (error) {
    console.error(error)
  }
}

const vendors = [hCoffeeRoasters, realBean, beanBrothers]
try {
  await Promise.all(vendors.map((vendor) => scrape(vendor)))
  await addCreatedAtTimestamp(createdAt)
  console.log('All scraping done')
  process.exit(0)
} catch (error) {
  console.error(error)
  process.exit(1)
}
