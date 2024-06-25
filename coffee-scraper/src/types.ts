export type CoffeeItem = {
  price: number
  url: string
  thumbnailSrc: string
  title: string
  vendorName: string
}

export type VendorSnapshot = {
  vendorName: string
  createdAt: number
  coffeeItems: CoffeeItem[]
}

export type CreatedAtTimestamp = {
  createdAt: number
}
