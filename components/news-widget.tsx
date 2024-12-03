import { useState, useEffect } from 'react'
import { ExternalLink } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type NewsItem = {
  title: string
  url: string
  source: string
}

export function NewsWidget({ stockSymbol }: { stockSymbol: string }) {
  const [news, setNews] = useState<NewsItem[]>([])

  useEffect(() => {
    // In a real app, you would fetch news from an API here
    setNews([
      { title: `${stockSymbol} Reports Strong Q2 Earnings`, url: '#', source: 'Financial Times' },
      { title: `Analysts Upgrade ${stockSymbol} Stock`, url: '#', source: 'Wall Street Journal' },
      { title: `${stockSymbol} Announces New Product Line`, url: '#', source: 'TechCrunch' },
    ])
  }, [stockSymbol])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Latest News for {stockSymbol}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {news.map((item, index) => (
            <li key={index} className="flex justify-between items-start">
              <div>
                <a href={item.url} className="text-blue-600 hover:underline">{item.title}</a>
                <p className="text-sm text-gray-500">{item.source}</p>
              </div>
              <ExternalLink className="h-4 w-4 flex-shrink-0 text-gray-400" />
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

