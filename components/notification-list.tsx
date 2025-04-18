import { Plane, Hotel, AlertTriangle, Info } from "lucide-react"

export function NotificationList() {
  const notifications = [
    {
      id: 1,
      type: "flight",
      message: "Your flight to Bali has been delayed by 1 hour.",
      time: "2 hours ago",
      icon: <Plane className="h-5 w-5 text-blue-500" />,
      urgent: true,
    },
    {
      id: 2,
      type: "hotel",
      message: "Hotel check-in reminder: Le Grand Paris at 3:00 PM tomorrow.",
      time: "5 hours ago",
      icon: <Hotel className="h-5 w-5 text-[#FF5722]" />,
      urgent: false,
    },
    {
      id: 3,
      type: "weather",
      message: "Weather alert: Heavy rain expected in Tokyo during your stay.",
      time: "1 day ago",
      icon: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
      urgent: true,
    },
    {
      id: 4,
      type: "info",
      message: "Your itinerary for Paris trip has been updated.",
      time: "2 days ago",
      icon: <Info className="h-5 w-5 text-purple-500" />,
      urgent: false,
    },
  ]

  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`flex items-start space-x-4 p-3 rounded-lg ${notification.urgent ? "bg-red-50" : "bg-gray-50"}`}
        >
          <div className="mt-0.5">{notification.icon}</div>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">{notification.message}</p>
            <p className="text-sm text-gray-500">{notification.time}</p>
          </div>
          {notification.urgent && (
            <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
              Urgent
            </span>
          )}
        </div>
      ))}
    </div>
  )
}
