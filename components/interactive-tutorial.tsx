import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const tutorialSteps = [
  {
    title: "Welcome to Stock Management",
    content: "This tutorial will guide you through managing your gifted stocks.",
  },
  {
    title: "Viewing Your Portfolio",
    content: "Your gifted stocks are displayed in your portfolio. You can see the current value and performance of each stock.",
  },
  {
    title: "Understanding Stock Performance",
    content: "Green numbers indicate a stock has increased in value, while red numbers show a decrease.",
  },
  {
    title: "Making Decisions",
    content: "You can choose to hold onto your stocks, sell them, or even gift them to someone else!",
  },
  {
    title: "Staying Informed",
    content: "Keep an eye on the news feed to stay updated on events that might affect your stocks.",
  },
]

export function InteractiveTutorial() {
  const [currentStep, setCurrentStep] = useState(0)

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, tutorialSteps.length - 1))
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0))

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>How to Manage Your Gifted Stocks</CardTitle>
      </CardHeader>
      <CardContent>
        <h3 className="text-lg font-semibold mb-2">{tutorialSteps[currentStep].title}</h3>
        <p>{tutorialSteps[currentStep].content}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={prevStep} disabled={currentStep === 0} variant="outline">
          <ChevronLeft className="mr-2 h-4 w-4" /> Previous
        </Button>
        <Button onClick={nextStep} disabled={currentStep === tutorialSteps.length - 1}>
          Next <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}

