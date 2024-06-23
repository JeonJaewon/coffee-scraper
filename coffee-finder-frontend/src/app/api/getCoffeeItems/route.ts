import { CoffeeItem, db } from 'coffee-scraper'
import { collection, getDocs } from 'firebase/firestore'

export async function GET() {
  const snapShot = await getDocs(collection(db, 'coffeeItems'))
  // TODO replace 'as' with type converter
  const coffeeItems = snapShot.docs.map((doc) => doc.data() as CoffeeItem)
  return Response.json(coffeeItems)
}
