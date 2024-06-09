import puppeteer from "puppeteer";
import { ElementHandle } from "puppeteer";
import { Vendor, beanBrothers, hCoffeeRoasters, realBean } from "./vendors";
import { SMART_STORE_URL } from "./constants";

export const scrape = async ({ url, selectors }: Vendor) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const { cardShapeSelector, listSelector, priceSelector, titleSelector } =
    selectors;

  const list = await page.waitForSelector(listSelector);
  if (list === null) {
    throw new Error("No list found");
  }

  const rawItems = await list.$$(cardShapeSelector);

  const extractItemDetails = async (elementHandle: ElementHandle<Element>) => {
    const price = await elementHandle.$eval(priceSelector, (el) =>
      Number(el.innerHTML.replace(",", ""))
    );
    const title = await elementHandle.$eval(
      titleSelector,
      (el) => el.innerHTML
    );

    const urlPath = await elementHandle.$eval("a", (el) =>
      el.getAttribute("href")
    );

    return {
      price,
      title,
      url: `${SMART_STORE_URL}${urlPath}`,
    };
  };

  const coffeeItems = await Promise.all(rawItems.map(extractItemDetails));

  console.log(coffeeItems);

  await browser.close();
};
