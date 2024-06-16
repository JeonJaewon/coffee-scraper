import fs from 'fs'
import puppeteer, { ElementHandle } from 'puppeteer'
import { SMART_STORE_URL } from './constants'
import { Vendor, beanBrothers } from './vendors'

const DATA_DIR_PATH = './data'

export const scrape = async ({ title: vendorTitle, url, selectors }: Vendor) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(url)

  const { cardShapeSelector, listSelector, priceSelector, titleSelector } = selectors

  const list = await page.waitForSelector(listSelector)
  if (list === null) {
    throw new Error('No list found')
  }

  const rawItems = await list.$$(cardShapeSelector)

  const extractItemDetails = async (elementHandle: ElementHandle<Element>) => {
    const price = await elementHandle.$eval(priceSelector, (el) => Number(el.innerHTML.replace(',', '')))
    const title = await elementHandle.$eval(titleSelector, (el) => el.innerHTML)

    const urlPath = await elementHandle.$eval('a', (el) => el.getAttribute('href'))

    return {
      price,
      title,
      vendor: vendorTitle,
      url: `${SMART_STORE_URL}${urlPath}`,
    }
  }

  const coffeeItems = await Promise.all(rawItems.map(extractItemDetails))
  fs.writeFile(`${DATA_DIR_PATH}/${vendorTitle}.json`, JSON.stringify(coffeeItems), (err) => {
    if (err) {
      console.error(err)
      return
    }
  })

  await browser.close()
}

scrape(beanBrothers)
