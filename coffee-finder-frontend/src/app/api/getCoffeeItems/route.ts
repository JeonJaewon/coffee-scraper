import { db } from 'coffee-scraper'
import { VendorSnapshot } from 'coffee-scraper/src/types'
import { collection, getDocs } from 'firebase/firestore'

export async function GET() {
  const snapShot = await getDocs(collection(db, 'vendorSnapshots'))
  // TODO replace 'as' with type converter
  const coffeeItems = snapShot.docs
    .map((doc) => doc.data() as VendorSnapshot)
    .map((vendorSnapshot) => vendorSnapshot.coffeeItems)
    .flat()
  return Response.json(coffeeItems)
}
