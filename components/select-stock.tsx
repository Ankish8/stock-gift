'use client'

import { useState, useEffect } from 'react'
import { Search, TrendingUp, TrendingDown, Package, Zap, Info, Bookmark, Filter } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Mock data for stocks with AI suggestions integrated
const stocks = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 150.30, change: 2.5, sector: 'Technology', aiSuggestion: { matchScore: 92, confidence: 'High', reason: 'Strong market position and consistent growth' } },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 2750.20, change: -1.2, sector: 'Technology', aiSuggestion: { matchScore: 88, confidence: 'High', reason: 'Dominant in search and digital advertising' } },
  { symbol: 'MSFT', name: 'Microsoft Corporation', price: 310.50, change: 0.8, sector: 'Technology', aiSuggestion: { matchScore: 90, confidence: 'High', reason: 'Leader in cloud computing and software' } },
  { symbol: 'AMZN', name: 'Amazon.com, Inc.', price: 3380.00, change: -0.5, sector: 'Consumer Cyclical', aiSuggestion: { matchScore: 85, confidence: 'Medium', reason: 'E-commerce giant with growing cloud services' } },
  { symbol: 'FB', name: 'Meta Platforms, Inc.', price: 330.80, change: 1.7, sector: 'Technology', aiSuggestion: { matchScore: 82, confidence: 'Medium', reason: 'Social media leader exploring new technologies' } },
  { symbol: 'TSLA', name: 'Tesla, Inc.', price: 750.40, change: 3.2, sector: 'Automotive', aiSuggestion: { matchScore: 87, confidence: 'High', reason: 'Electric vehicle pioneer with strong brand' } },
  { symbol: 'NVDA', name: 'NVIDIA Corporation', price: 280.60, change: 2.1, sector: 'Technology', aiSuggestion: { matchScore: 94, confidence: 'High', reason: 'Leading in AI and graphics processing' } },
  { symbol: 'JPM', name: 'JPMorgan Chase & Co.', price: 160.90, change: 0.3, sector: 'Financial', aiSuggestion: { matchScore: 80, confidence: 'Medium', reason: 'Strong financial performance and dividends' } },
  { symbol: 'JNJ', name: 'Johnson & Johnson', price: 170.20, change: -0.7, sector: 'Healthcare', aiSuggestion: { matchScore: 78, confidence: 'Medium', reason: 'Stable healthcare company with diverse portfolio' } },
  { symbol: 'V', name: 'Visa Inc.', price: 230.50, change: 1.1, sector: 'Financial', aiSuggestion: { matchScore: 86, confidence: 'High', reason: 'Global leader in digital payments' } },
]

// Mock data for pre-made bundles
const bundles = [
  { 
    id: 1, 
    name: 'Tech Giants', 
    stocks: ['AAPL', 'GOOGL', 'MSFT'], 
    occasion: 'Graduation',
    description: 'A curated selection of leading technology companies',
    totalValue: 3210.00,
    monthlyReturn: 2.8
  },
  { 
    id: 2, 
    name: 'E-commerce Leaders', 
    stocks: ['AMZN', 'SHOP', 'ETSY'], 
    occasion: 'Business Launch',
    description: 'Top performers in the e-commerce space',
    totalValue: 4520.00,
    monthlyReturn: -0.5
  },
  { 
    id: 3, 
    name: 'Green Energy', 
    stocks: ['TSLA', 'ENPH', 'NEE'], 
    occasion: 'Earth Day',
    description: 'Companies leading the sustainable energy revolution',
    totalValue: 1820.00,
    monthlyReturn: 1.7
  },
]

export default function SelectStock() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('all')
  const [selectedSector, setSelectedSector] = useState('all')
  const [favorites, setFavorites] = useState([])
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState('default')
  const router = useRouter()

  const sectors = ['all', ...new Set(stocks.map(stock => stock.sector))]

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      // Additional search logic if needed
    }, 300)
    return () => clearTimeout(timer)
  }, [searchTerm])

  const filteredStocks = stocks.filter(stock => {
    const matchesSearch = stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSector = selectedSector === 'all' || stock.sector === selectedSector
    return matchesSearch && matchesSector
  }).sort((a, b) => {
    if (sortBy === 'priceAsc') return a.price - b.price
    if (sortBy === 'priceDesc') return b.price - a.price
    if (sortBy === 'match') return b.aiSuggestion.matchScore - a.aiSuggestion.matchScore
    return 0
  })

  const handleStockSelect = (symbol: string) => {
    router.push(`/gift-stock?symbol=${symbol}`)
  }

  const toggleFavorite = (e: React.MouseEvent, symbol: string) => {
    e.stopPropagation()
    setFavorites(prev => 
      prev.includes(symbol) 
        ? prev.filter(s => s !== symbol)
        : [...prev, symbol]
    )
  }

  const PriceChange = ({ change }) => (
    <div className={`text-sm flex items-center ${change >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
      {change >= 0 ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
      {Math.abs(change).toFixed(2)}%
    </div>
  )

  return (
    <TooltipProvider>
      <Card className="w-full h-full rounded-none bg-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-semibold text-gray-800">Select a Stock</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="all" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
                All Stocks
                {filteredStocks.length > 0 && (
                  <Badge variant="secondary" className="ml-2 bg-emerald-600 text-white">
                    {filteredStocks.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="bundles" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
                Bundles
                <Badge variant="secondary" className="ml-2 bg-emerald-600 text-white">
                  {bundles.length}
                </Badge>
              </TabsTrigger>
            </TabsList>
            
            <div className="space-y-4 px-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by symbol or company name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 bg-gray-50 rounded-2xl placeholder-gray-400"
                />
              </div>

              {showFilters && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <select
                      className="p-2 rounded-md border border-gray-200"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="default">Sort by</option>
                      <option value="priceAsc">Price: Low to High</option>
                      <option value="priceDesc">Price: High to Low</option>
                      <option value="match">Best AI Match</option>
                    </select>
                  </div>
                  
                  {activeTab === 'all' && (
                    <ScrollArea className="whitespace-nowrap">
                      <div className="flex gap-2 pb-2">
                        {sectors.map(sector => (
                          <Button
                            key={sector}
                            variant={selectedSector === sector ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedSector(sector)}
                            className={`whitespace-nowrap ${selectedSector === sector ? 'bg-emerald-500 text-white' : 'text-gray-600'}`}
                          >
                            {sector.charAt(0).toUpperCase() + sector.slice(1)}
                          </Button>
                        ))}
                      </div>
                    </ScrollArea>
                  )}
                </div>
              )}
            </div>

            <ScrollArea className="h-[calc(100vh-280px)]">
              <TabsContent value="all" className="px-4">
                {filteredStocks.length === 0 ? (
                  <Alert>
                    <AlertDescription>
                      No stocks found matching your criteria. Try adjusting your search or filters.
                    </AlertDescription>
                  </Alert>
                ) : (
                  <div className="space-y-4">
                    {filteredStocks.map(stock => (
                      <Card 
                        key={stock.symbol}
                        className="cursor-pointer hover:bg-gray-50 transition-colors relative"
                        onClick={() => handleStockSelect(stock.symbol)}
                      >
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                                {stock.symbol}
                                <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                                  {stock.sector}
                                </Badge>
                                <button
                                  onClick={(e) => toggleFavorite(e, stock.symbol)}
                                  className="text-gray-400 hover:text-yellow-500 transition-colors"
                                >
                                  <Bookmark
                                    className={`h-4 w-4 ${favorites.includes(stock.symbol) ? 'fill-yellow-500 text-yellow-500' : ''}`}
                                  />
                                </button>
                              </h3>
                              <p className="text-sm text-gray-600">{stock.name}</p>
                            </div>
                            <div className="text-right">
                              <span className="font-medium text-gray-800">${stock.price.toFixed(2)}</span>
                              <PriceChange change={stock.change} />
                            </div>
                          </div>
                          <div className="mt-2 flex items-center gap-2">
                            <Zap className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm text-gray-600">AI Match: {stock.aiSuggestion.matchScore}%</span>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className="h-4 w-4 text-gray-400" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="text-sm">{stock.aiSuggestion.reason}</p>
                                <p className="text-sm font-semibold mt-1">{stock.aiSuggestion.confidence} Confidence</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="bundles" className="px-4">
                {bundles.map(bundle => (
                  <Card key={bundle.id} className="mb-4 cursor-pointer hover:bg-gray-50 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="space-y-2">
                          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                            <Package className="h-4 w-4 text-emerald-500" />
                            {bundle.name}
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className="h-4 w-4 text-gray-400" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{bundle.description}</p>
                              </TooltipContent>
                            </Tooltip>
                          </h3>
                          <div className="flex gap-2 flex-wrap">
                            <Badge variant="outline" className="text-gray-600 border-gray-300">Perfect for: {bundle.occasion}</Badge>
                            <Badge variant="outline" className="text-gray-600 border-gray-300">${bundle.totalValue.toFixed(2)}</Badge>
                            <PriceChange change={bundle.monthlyReturn} />
                          </div>
                          <p className="text-sm text-gray-600">Includes: {bundle.stocks.join(', ')}</p>
                        </div>
                      </div>
                      <Button className="mt-4 w-full bg-emerald-500 text-white hover:bg-emerald-600" onClick={() => handleStockSelect(bundle.stocks[0])}>
                        Select Bundle
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </CardContent>
      </Card>
    </TooltipProvider>
  )
}

