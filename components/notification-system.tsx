'use strict';
'use client'

import { useState, useEffect, useCallback } from 'react'
import { Bell, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

type Notification = {
  id: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  timestamp: Date
}

export default function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    // Simulating receiving notifications
    const interval = setInterval(() => {
      const newNotification: Notification = {
        id: Math.random().toString(36).substr(2, 9),
        message: `New notification ${Math.floor(Math.random() * 100)}`,
        type: ['info', 'success', 'warning', 'error'][Math.floor(Math.random() * 4)] as Notification['type'],
        timestamp: new Date(),
      }
      setNotifications(prev => [...prev, newNotification])
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {notifications.map((notification) => (
        <Card key={notification.id} className={`mb-2 ${getNotificationColor(notification.type)}`}>
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center">
              <Bell className="mr-2 h-4 w-4" />
              <span>{notification.message}</span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => removeNotification(notification.id)}>
              <X className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function getNotificationColor(type: Notification['type']) {
  switch (type) {
    case 'info':
      return 'bg-blue-100 text-blue-800'
    case 'success':
      return 'bg-green-100 text-green-800'
    case 'warning':
      return 'bg-yellow-100 text-yellow-800'
    case 'error':
      return 'bg-red-100 text-red-800'
  }
}

