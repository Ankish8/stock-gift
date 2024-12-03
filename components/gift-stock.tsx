'use client'

import { useState, useEffect } from 'react'
import { Gift, Bell, Menu, Search, Calendar, Share2, Info, ChevronDown, Sparkles, ChevronLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import GiftTracking from "./gift-tracking"
import { useRouter } from 'next/navigation'

interface GiftStockProps {
  symbol: string
}

export default function GiftStock({ symbol }: GiftStockProps) {
  const router = useRouter()
  const [selectedStock, setSelectedStock] = useState({ name: '', price: 0, quantity: 1 })
  const [giftDate, setGiftDate] = useState<string>('')
  const [giftTheme, setGiftTheme] = useState('default')
  const [isScheduled, setIsScheduled] = useState(false)
  const [customImage, setCustomImage] = useState<File | null>(null)
  const [giftMessage, setGiftMessage] = useState('')
  //const [activeScreen, setActiveScreen] = useState('gift')

  useEffect(() => {
    // In a real app, you would fetch the stock data from an API
    const stockData = {
      AAPL: { name: 'Apple Inc.', price: 150.30 },
      GOOGL: { name: 'Alphabet Inc.', price: 2750.20 },
      MSFT: { name: 'Microsoft Corporation', price: 310.50 },
      AMZN: { name: 'Amazon.com, Inc.', price: 3380.00 },
      FB: { name: 'Meta Platforms, Inc.', price: 330.80 },
    }[symbol] || { name: 'Unknown Stock', price: 0 }

    setSelectedStock({ ...stockData, quantity: 1 })
  }, [symbol])

  const recentRecipients = [
    { name: 'Ankish Khatri', email: 'ankish@example.com', avatar: '/avatars/ankish.jpg' },
    { name: 'Tilak Verma', email: 'tilak@example.com', avatar: '/avatars/tilak.jpg' },
    { name: 'Bhawana Jain', email: 'bhawana@example.com', avatar: '/avatars/bhawana.jpg' },
    { name: 'Deepali Gaur', email: 'deepali@example.com', avatar: '/avatars/deepali.jpg' },
    { name: 'Kshitij Rana', email: 'kshitij@example.com', avatar: '/avatars/kshitij.jpg' },
    { name: 'Radhika Jaiprakash', email: 'radhika@example.com', avatar: '/avatars/radhika.jpg' },
  ]

  const giftThemes = [
    { value: 'default', label: 'Classic Celebration' },
    { value: 'birthday', label: 'Birthday Bonanza' },
    { value: 'holiday', label: 'Festive Fortune' },
    { value: 'congratulations', label: 'Success Shares' },
    { value: 'graduation', label: 'Grad Gains' },
    { value: 'wedding', label: 'Matrimony Moolah' },
    { value: 'newYear', label: 'New Year, New Wealth' },
    { value: 'christmas', label: 'Christmas Capital' },
    { value: 'valentines', label: "Love & Dividends" },
  ]

  const messageTemplates = [
    { value: 'custom', label: 'Write your own message' },
    { value: 'birthday', label: 'Happy Birthday! May this stock grow as much as you have this year.' },
    { value: 'congratulations', label: 'Congrats on your big win! Here\'s a piece of the market to celebrate.' },
    { value: 'holiday', label: 'Seasons Greetings! Wishing you a prosperous new year with this growing gift.' },
  ]

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setCustomImage(file)
    }
  }

  const handleGiftSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // In a real app, this would send the gift and update the backend
    console.log('Gift submitted:', { selectedStock, giftDate, giftTheme, isScheduled, customImage, giftMessage })
    // Show a success message or navigate to a confirmation screen
  }

  return (
    <Dialog>
      <Card className="w-full h-full rounded-none bg-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <Button variant="ghost" size="icon" className="text-gray-600" onClick={() => router.back()}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center">
            <span className="text-emerald-500 text-xl font-semibold">Grow</span>
            <span className="text-gray-800 text-xl font-semibold">Gift</span>
          </div>
          <Button variant="ghost" size="icon" className="text-gray-600">
            <Bell className="h-4 w-4" />
          </Button>
        </CardHeader>
        <ScrollArea className="h-[calc(100%-4rem)]">
          <CardContent className="pt-6">
            <Tabs defaultValue="send" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="send">Send Gift</TabsTrigger>
                <TabsTrigger value="my-gifts">My Gifts</TabsTrigger>
              </TabsList>
              <TabsContent value="send">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 flex items-center justify-center">
                    <Gift className="w-12 h-12 text-emerald-500" />
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-8 h-8 bg-amber-100 rounded-xl flex items-center justify-center">
                      <Gift className="w-5 h-5 text-amber-500" />
                    </div>
                    <h2 className="text-indigo-600 text-lg font-medium">Gift {selectedStock.name} Stock</h2>
                  </div>

                  <form className="space-y-4" onSubmit={handleGiftSubmit}>
                    <div className="space-y-2">
                      <Label htmlFor="recipient">Recipient Details</Label>
                      <Select>
                        <SelectTrigger id="recipient" className="bg-gray-50 rounded-2xl">
                          <SelectValue placeholder="Choose or add a new friend" />
                        </SelectTrigger>
                        <SelectContent>
                          {recentRecipients.map((recipient, index) => (
                            <SelectItem key={index} value={recipient.email}>
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={recipient.avatar} alt={recipient.name} />
                                  <AvatarFallback>{recipient.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span>{recipient.name}</span>
                              </div>
                            </SelectItem>
                          ))}
                          <SelectItem value="new">➕ Add New Recipient</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Input type="text" placeholder="Recipient's Full Name" className="bg-gray-50 rounded-2xl placeholder-gray-400" />
                    <Input type="tel" placeholder="Recipient's Phone (optional)" className="bg-gray-50 rounded-2xl placeholder-gray-400" />
                    <Input type="email" placeholder="Recipient's Email" className="bg-gray-50 rounded-2xl placeholder-gray-400" />
                    
                    <div className="space-y-2">
                      <Label htmlFor="gift-theme">Make it special with a theme</Label>
                      <Select value={giftTheme} onValueChange={setGiftTheme}>
                        <SelectTrigger id="gift-theme" className="bg-gray-50 rounded-2xl">
                          <SelectValue placeholder="Pick a gifting occasion" />
                        </SelectTrigger>
                        <SelectContent>
                          {giftThemes.map((theme) => (
                            <SelectItem key={theme.value} value={theme.value}>
                              {theme.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="custom-image">Add a personal touch</Label>
                      <Input
                        id="custom-image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="bg-gray-50 rounded-2xl"
                      />
                      {customImage && (
                        <p className="text-sm text-gray-500">
                          Image uploaded: {customImage.name}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="gift-message">Add Your Message</Label>
                      <Select onValueChange={(value) => setGiftMessage(value)}>
                        <SelectTrigger id="gift-message" className="bg-gray-50 rounded-2xl">
                          <SelectValue placeholder="Choose a message or write your own" />
                        </SelectTrigger>
                        <SelectContent>
                          {messageTemplates.map((template) => (
                            <SelectItem key={template.value} value={template.label}>
                              {template.value === 'custom' ? template.label : template.label.substring(0, 30) + '...'}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Textarea
                        placeholder="Your personalized message goes here..."
                        value={giftMessage}
                        onChange={(e) => setGiftMessage(e.target.value)}
                        className="bg-gray-50 rounded-2xl placeholder-gray-400"
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="schedule-gift"
                        checked={isScheduled}
                        onCheckedChange={setIsScheduled}
                      />
                      <Label htmlFor="schedule-gift">Schedule for later?</Label>
                    </div>
                    
                    {isScheduled && (
                      <div className="flex gap-2">
                        <Input
                          type="date"
                          value={giftDate}
                          onChange={(e) => setGiftDate(e.target.value)}
                          className="bg-gray-50 rounded-2xl"
                        />
                        <Button variant="outline" size="icon">
                          <Calendar className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                    
                    <Button type="submit" className="w-full bg-emerald-400 text-white rounded-2xl font-medium hover:bg-emerald-500">
                      Gift Stock
                    </Button>
                  </form>
                </div>

                <div className="mt-6">
                  <h3 className="text-gray-700 font-medium mb-4">Stock to Gift</h3>
                  <div className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl">
                    <div>
                      <span className="text-gray-600">{selectedStock.name}</span>
                      <div className="text-2xl font-semibold">₹ {selectedStock.price.toFixed(2)}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="rounded-full" onClick={() => setSelectedStock(prev => ({ ...prev, quantity: Math.max(1, prev.quantity - 1) }))}>-</Button>
                      <span className="text-lg font-medium">{selectedStock.quantity}</span>
                      <Button variant="outline" size="sm" className="rounded-full" onClick={() => setSelectedStock(prev => ({ ...prev, quantity: prev.quantity + 1 }))}>+</Button>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-gray-700 font-medium mb-4">Investment Details</h3>
                  <div className="bg-gray-50 p-4 rounded-2xl">
                    {/* Placeholder for stock chart */}
                    <div className="h-40 bg-gray-200 rounded-xl flex items-center justify-center">
                      <span className="text-gray-400">Stock Performance Visualization</span>
                    </div>
                  </div>
                </div>

              </TabsContent>
              <TabsContent value="my-gifts">
                <GiftTracking />
              </TabsContent>
            </Tabs>
          </CardContent>
        </ScrollArea>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>The Joy of Gifting Stocks</DialogTitle>
            <DialogDescription>
              When you gift a stock, you're not just giving a present – you're opening a door to financial growth and education. It's a thoughtful way to help someone start their investment journey or add to their portfolio. Watch together as your gift grows over time, creating lasting value and memories.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Card>
    </Dialog>
  )
}

