import { db } from 'coffee-scraper'
import { VendorSnapshots } from 'coffee-scraper/src/types'
import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore'

export async function GET() {
  const queryLatestTimestamp = query(collection(db, 'createdAtTimestamps'), orderBy('createdAt', 'desc'), limit(1))
  const latestTimestampDocs = await getDocs(queryLatestTimestamp)
  const latestCreatedAt = latestTimestampDocs.docs[0].data().createdAt

  const queryLatestSnapshot = query(collection(db, 'vendorSnapshots'), where('createdAt', '==', latestCreatedAt))
  const snapShot = await getDocs(queryLatestSnapshot)

  // TODO replace 'as' with type converter
  const coffeeItems = snapShot.docs
    .map((doc) => doc.data() as VendorSnapshots)
    .map((vendorSnapshot) => Object.values(vendorSnapshot.items))
    .flat()
    .flat()

  return Response.json(coffeeItems)
}
