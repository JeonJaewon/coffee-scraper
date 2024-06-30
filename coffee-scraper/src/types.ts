export type CoffeeItem = {
  price: number
  url: string
  thumbnailSrc: string
  title: string
  vendorName: string
}

export type CreatedAtTimestamp = {
  createdAt: number
}

export type VendorSnapshots = {
  items: {
    [vendorName: string]: CoffeeItem[]
  }
} & CreatedAtTimestamp
