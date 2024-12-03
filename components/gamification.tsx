import { Trophy, Star, Gift, TrendingUp, Award } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function Gamification() {
  const userLevel = 5
  const userXP = 2750
  const nextLevelXP = 3000
  const achievements = [
    { name: 'First Gift Sent', icon: Gift, completed: true },
    { name: 'Gift Streak: 7 Days', icon: TrendingUp, completed: true },
    { name: 'Diverse Portfolio', icon: Award, completed: false },
  ]

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5" />
          Your Gifting Journey
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium">Gifting Level {userLevel}</span>
            <span className="text-sm text-gray-500">{userXP} / {nextLevelXP} XP</span>
          </div>
          <Progress value={(userXP / nextLevelXP) * 100} className="w-full" />
        </div>
        <div className="space-y-2">
          {achievements.map((achievement, index) => (
            <div key={index} className="flex items-center gap-2">
              <achievement.icon className={`h-5 w-5 ${achievement.completed ? 'text-yellow-500' : 'text-gray-400'}`} />
              <span className={achievement.completed ? 'text-gray-900' : 'text-gray-500'}>
                {achievement.name}
              </span>
              {achievement.completed && <Star className="h-4 w-4 text-yellow-500 ml-auto" />}
            </div>
          ))}
        </div>
        <Button className="w-full mt-4">View All Achievements</Button>
      </CardContent>
    </Card>
  )
}

