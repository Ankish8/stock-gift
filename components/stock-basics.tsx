import { Book, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const topics = [
  { title: "What is a Stock?", icon: Book },
  { title: "How the Stock Market Works", icon: Book },
  { title: "Understanding Stock Prices", icon: Book },
  { title: "Basics of Stock Analysis", icon: Book },
  { title: "Risks and Rewards of Investing", icon: Book },
]

export function StockBasics() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Stock Market Basics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topics.map((topic, index) => (
            <Button key={index} variant="outline" className="w-full justify-between">
              <div className="flex items-center">
                <topic.icon className="mr-2 h-4 w-4" />
                {topic.title}
              </div>
              <ChevronRight className="h-4 w-4" />
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

