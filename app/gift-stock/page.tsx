'use client'

import { useSearchParams } from 'next/navigation'
import GiftStock from '@/components/gift-stock'
import { IPhone14ProMaxMockup } from "@/components/iphone-14-pro-max-mockup"

export default function GiftStockPage() {
  const searchParams = useSearchParams()
  const symbol = searchParams.get('symbol')

  if (!symbol) {
    return <div>No stock symbol provided</div>
  }

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <IPhone14ProMaxMockup>
        <GiftStock symbol={symbol} />
      </IPhone14ProMaxMockup>
    </main>
  )
}

