'use client'

import { useState } from 'react'
import { Gift, ChevronDown, ChevronUp, TrendingUp, TrendingDown, Eye, Share2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type GiftStatus = 'Pending' | 'Delivered' | 'Viewed'

interface Gift {
  id: string
  recipientName: string
  recipientEmail: string
  stock: string
  quantity: number
  price: number
  currentPrice: number
  sentDate: Date
  status: GiftStatus
  viewed: boolean
  viewedDate?: Date
}

export default function GiftTracking() {
  const [gifts, setGifts] = useState<Gift[]>([
    {
      id: '123',
      recipientName: 'Ankish Khatri',
      recipientEmail: 'ankish@example.com',
      stock: 'AAPL',
      quantity: 1,
      price: 150.30,
      currentPrice: 155.50,
      sentDate: new Date('2023-06-01'),
      status: 'Viewed',
      viewed: true,
      viewedDate: new Date('2023-06-02'),
    },
    {
      id: '124',
      recipientName: 'Tilak Verma',
      recipientEmail: 'tilak@example.com',
      stock: 'GOOGL',
      quantity: 2,
      price: 2750.20,
      currentPrice: 2800.00,
      sentDate: new Date('2023-06-15'),
      status: 'Delivered',
      viewed: false,
    },
    {
      id: '125',
      recipientName: 'Bhawana Jain',
      recipientEmail: 'bhawana@example.com',
      stock: 'MSFT',
      quantity: 3,
      price: 310.50,
      currentPrice: 305.20,
      sentDate: new Date('2023-06-20'),
      status: 'Pending',
      viewed: false,
    },
  ])

  const [expandedGift, setExpandedGift] = useState<string | null>(null)

  const calculateGrowth = (gift: Gift) => {
    const growthPercentage = ((gift.currentPrice - gift.price) / gift.price) * 100
    return growthPercentage.toFixed(2)
  }

  const renderGiftStatus = (status: GiftStatus) => {
    switch (status) {
      case 'Pending':
        return <span className="text-amber-500 font-medium">Pending</span>
      case 'Delivered':
        return <span className="text-emerald-500 font-medium">Delivered</span>
      case 'Viewed':
        return <span className="text-blue-500 font-medium">Viewed</span>
    }
  }

  const toggleExpand = (giftId: string) => {
    setExpandedGift(expandedGift === giftId ? null : giftId)
  }

  return (
    <div className="w-full space-y-4">
      <h3 className="text-gray-700 font-medium mb-4">Your Sent Gifts</h3>
      {gifts.map((gift) => (
        <Card key={gift.id} className="overflow-hidden">
          <CardHeader className="p-4 cursor-pointer" onClick={() => toggleExpand(gift.id)}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Gift className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                  <CardTitle className="text-base">{gift.recipientName}</CardTitle>
                  <p className="text-sm text-gray-500">{gift.stock} x {gift.quantity}</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                {renderGiftStatus(gift.status)}
                <div className={`text-sm flex items-center ${Number(calculateGrowth(gift)) >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                  {Number(calculateGrowth(gift)) >= 0 ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                  {calculateGrowth(gift)}%
                </div>
              </div>
            </div>
            <ChevronDown className={`h-5 w-5 transition-transform ${expandedGift === gift.id ? 'rotate-180' : ''}`} />
          </CardHeader>
          {expandedGift === gift.id && (
            <CardContent className="p-4 bg-gray-50">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="tracking">Tracking</TabsTrigger>
                </TabsList>
                <TabsContent value="overview">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Recipient</h4>
                      <p>{gift.recipientName}</p>
                      <p className="text-sm text-gray-500">{gift.recipientEmail}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Gift Details</h4>
                      <p>{gift.stock} x {gift.quantity}</p>
                      <p className="text-sm text-gray-500">Sent on {gift.sentDate.toLocaleDateString()}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Gift Value</h4>
                      <p>Current: ${(gift.currentPrice * gift.quantity).toFixed(2)}</p>
                      <p className="text-sm text-gray-500">Original: ${(gift.price * gift.quantity).toFixed(2)}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Growth</h4>
                      <div className={`text-lg flex items-center ${Number(calculateGrowth(gift)) >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                        {Number(calculateGrowth(gift)) >= 0 ? <TrendingUp className="h-5 w-5 mr-1" /> : <TrendingDown className="h-5 w-5 mr-1" />}
                        {calculateGrowth(gift)}%
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="tracking">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Gift Status</h4>
                      {renderGiftStatus(gift.status)}
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Gift Progress</h4>
                      <Progress value={gift.status === 'Viewed' ? 100 : gift.status === 'Delivered' ? 66 : 33} className="mt-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2" />
                        <span className="text-sm">Gift Sent</span>
                        <span className="text-sm text-gray-500 ml-auto">{gift.sentDate.toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center">
                        <div className={`w-2 h-2 ${gift.status !== 'Pending' ? 'bg-emerald-500' : 'bg-gray-300'} rounded-full mr-2`} />
                        <span className="text-sm">Gift Delivered</span>
                        {gift.status !== 'Pending' && (
                          <span className="text-sm text-gray-500 ml-auto">
                            {new Date(gift.sentDate.getTime() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center">
                        <div className={`w-2 h-2 ${gift.status === 'Viewed' ? 'bg-emerald-500' : 'bg-gray-300'} rounded-full mr-2`} />
                        <span className="text-sm">Gift Viewed</span>
                        {gift.status === 'Viewed' && gift.viewedDate && (
                          <span className="text-sm text-gray-500 ml-auto">{gift.viewedDate.toLocaleDateString()}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              <div className="flex justify-between mt-4">
                <Button variant="outline" size="sm">
                  <Eye className="mr-2 h-4 w-4" />
                  View Gift
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  )
}

