type Props = {
  totalItems: number
  lastUpdatedAt: number
}

export const StatusBox = ({ totalItems, lastUpdatedAt }: Props) => {
  return (
    <div className="flex justify-between items-center mt-4">
      <p className="text-sm text-gray-700">{totalItems}개의 상품</p>
      <p className="text-left text-xs text-gray-500">최종 업데이트: {new Date(lastUpdatedAt).toLocaleString()}</p>
    </div>
  )
}
