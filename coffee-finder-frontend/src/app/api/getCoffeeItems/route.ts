import { db } from 'coffee-scraper'
import { CoffeeItem, VendorSnapshots } from 'coffee-scraper/src/types'
import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore'
import { NextResponse } from 'next/server'

export type GetCoffeeItemsResponse = {
  coffeeItems: CoffeeItem[]
  createdAt: number
}

export async function GET() {
  try {
    const queryLatestTimestamp = query(collection(db, 'createdAtTimestamps'), orderBy('createdAt', 'desc'), limit(1))
    const latestTimestampDocs = await getDocs(queryLatestTimestamp)
    const latestCreatedAt: number = latestTimestampDocs.docs[0].data().createdAt

    const queryLatestSnapshot = query(collection(db, 'vendorSnapshots'), where('createdAt', '==', latestCreatedAt))
    const snapShot = await getDocs(queryLatestSnapshot)

    // TODO replace 'as' with type converter
    const coffeeItems = snapShot.docs
      .map((doc) => doc.data() as VendorSnapshots)
      .map((vendorSnapshot) => Object.values(vendorSnapshot.items))
      .flat()
      .flat()
      .sort((a, b) => (a.vendorName > b.vendorName ? 1 : -1))

    return NextResponse.json({ coffeeItems, createdAt: latestCreatedAt })
  } catch (error) {
    return NextResponse.error()
  }
}
