import { doc, setDoc } from 'firebase/firestore'
import puppeteer, { ElementHandle } from 'puppeteer'
import { SMART_STORE_URL } from './constants'
import { db } from './firebase'
import { CoffeeItem, CreatedAtTimestamp, VendorSnapshots } from './types'
import { VENDORS, Vendor } from './vendors'

const createdAt = new Date().getTime()

const scrapeCoffeeItems = async ({ vendorName, url, selectors }: Vendor): Promise<CoffeeItem[]> => {
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
  const coffeeItems = await Promise.all(rawItems.map(extractItemDetails))
  console.log(`Scraping Done for ${vendorName}, ${coffeeItems.length} items scraped`)

  return coffeeItems
}

const writeScrapedVendors = async (vendors: Vendor[]) => {
  const vendorSnapshots = { createdAt, items: {} } as VendorSnapshots
  for (const vendor of vendors) {
    const coffeeItems = await scrapeCoffeeItems(vendor)
    vendorSnapshots.items[vendor.vendorName] = coffeeItems
  }

  try {
    const id = new Date(createdAt).toISOString()
    await setDoc(doc(db, 'vendorSnapshots', id), vendorSnapshots)
  } catch (error) {
    console.error(error)
    return
  }
}

const writeCreatedAtTimestamp = async (createdAt: number) => {
  try {
    const id = new Date(createdAt).toISOString()
    const createdAtTimestamp: CreatedAtTimestamp = { createdAt }
    await setDoc(doc(db, 'createdAtTimestamps', id), createdAtTimestamp)
    console.log('Added createdAt timestamp', createdAt)
  } catch (error) {
    console.error(error)
  }
}

const main = async () => {
  try {
    await Promise.all([writeCreatedAtTimestamp(createdAt), writeScrapedVendors(VENDORS)])
    console.log('All scraping done')
    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

main()
