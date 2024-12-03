import { useState } from 'react'
import { Trophy, Star, Gift, TrendingUp, Award, Zap, Users, Calendar } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type Challenge = {
  id: number
  title: string
  description: string
  reward: number
  progress: number
  total: number
}

type Achievement = {
  id: number
  name: string
  description: string
  icon: React.ElementType
  progress: number
  total: number
  completed: boolean
}

type LeaderboardEntry = {
  rank: number
  name: string
  avatar: string
  giftCount: number
}

export function EnhancedGamification() {
  const [activeTab, setActiveTab] = useState('overview')
  const userLevel = 5
  const userXP = 2750
  const nextLevelXP = 3000
  const giftStreak = 7

  const challenges: Challenge[] = [
    { id: 1, title: "Daily Gifter", description: "Send a gift today", reward: 50, progress: 0, total: 1 },
    { id: 2, title: "Diverse Portfolio", description: "Gift 3 different stocks", reward: 100, progress: 2, total: 3 },
    { id: 3, title: "Big Spender", description: "Gift stocks worth $1000", reward: 200, progress: 750, total: 1000 },
  ]

  const achievements: Achievement[] = [
    { id: 1, name: "First Steps", description: "Send your first gift", icon: Gift, progress: 1, total: 1, completed: true },
    { id: 2, name: "Gifting Spree", description: "Send 10 gifts", icon: TrendingUp, progress: 7, total: 10, completed: false },
    { id: 3, name: "Diversification Master", description: "Gift 20 different stocks", icon: Award, progress: 12, total: 20, completed: false },
  ]

  const leaderboard: LeaderboardEntry[] = [
    { rank: 1, name: "Sarah J.", avatar: "/avatars/sarah.jpg", giftCount: 47 },
    { rank: 2, name: "Michael R.", avatar: "/avatars/michael.jpg", giftCount: 42 },
    { rank: 3, name: "Emma L.", avatar: "/avatars/emma.jpg", giftCount: 39 },
    { rank: 4, name: "You", avatar: "/avatars/user.jpg", giftCount: 35 },
    { rank: 5, name: "David K.", avatar: "/avatars/david.jpg", giftCount: 31 },
  ]

  const rewardsForNextLevel = [
    "Unlock exclusive gift themes",
    "Reduced fees on stock purchases",
    "Early access to new features",
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
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="challenges">Challenges</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Gifting Level {userLevel}</span>
                  <span className="text-sm text-gray-500">{userXP} / {nextLevelXP} XP</span>
                </div>
                <Progress value={(userXP / nextLevelXP) * 100} className="w-full" />
              </div>
              
              <div className="bg-amber-100 p-4 rounded-lg flex items-center gap-3">
                <Zap className="h-6 w-6 text-amber-500" />
                <div>
                  <p className="font-medium">🔥 {giftStreak} Day Streak!</p>
                  <p className="text-sm text-gray-600">Keep it up for bonus rewards!</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Rewards for Next Level:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                  {rewardsForNextLevel.map((reward, index) => (
                    <li key={index}>{reward}</li>
                  ))}
                </ul>
              </div>
              
              <Button className="w-full">View All Rewards</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="challenges">
            <div className="space-y-4">
              {challenges.map((challenge) => (
                <div key={challenge.id} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">{challenge.title}</h4>
                    <span className="text-sm text-emerald-600">+{challenge.reward} XP</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{challenge.description}</p>
                  <Progress value={(challenge.progress / challenge.total) * 100} className="w-full" />
                  <p className="text-xs text-right mt-1 text-gray-500">
                    {challenge.progress} / {challenge.total}
                  </p>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="achievements">
            <div className="space-y-4">
              {achievements.map((achievement) => (
                <div key={achievement.id} className="flex items-center gap-4">
                  <div className={`p-2 rounded-full ${achievement.completed ? 'bg-yellow-100' : 'bg-gray-100'}`}>
                    <achievement.icon className={`h-6 w-6 ${achievement.completed ? 'text-yellow-500' : 'text-gray-400'}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{achievement.name}</h4>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                    <Progress value={(achievement.progress / achievement.total) * 100} className="w-full mt-2" />
                    <p className="text-xs text-right mt-1 text-gray-500">
                      {achievement.progress} / {achievement.total}
                    </p>
                  </div>
                  {achievement.completed && <Star className="h-5 w-5 text-yellow-500" />}
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="leaderboard">
            <div className="space-y-4">
              {leaderboard.map((entry) => (
                <div key={entry.rank} className="flex items-center gap-4">
                  <span className={`font-bold ${entry.rank <= 3 ? 'text-2xl text-amber-500' : 'text-xl text-gray-500'}`}>
                    {entry.rank}
                  </span>
                  <Avatar>
                    <AvatarImage src={entry.avatar} alt={entry.name} />
                    <AvatarFallback>{entry.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-medium">{entry.name}</h4>
                    <p className="text-sm text-gray-600">{entry.giftCount} gifts sent</p>
                  </div>
                  {entry.rank === 4 && <Award className="h-5 w-5 text-emerald-500" />}
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

