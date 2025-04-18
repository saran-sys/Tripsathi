import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plane, Hotel, MapPin, Utensils, Ticket } from "lucide-react"

export function ItineraryTimeline() {
  const days = [
    {
      day: 1,
      date: "May 15, 2023",
      activities: [
        {
          id: 1,
          time: "08:30 AM",
          title: "Flight to Paris",
          description: "Air France AF123",
          type: "flight",
          location: "JFK International Airport",
        },
        {
          id: 2,
          time: "3:45 PM",
          title: "Check-in at Hotel",
          description: "Le Grand Paris",
          type: "accommodation",
          location: "15 Rue de Rivoli, Paris",
        },
        {
          id: 3,
          time: "7:00 PM",
          title: "Dinner at Le Petit Bistro",
          description: "French cuisine",
          type: "food",
          location: "22 Avenue des Champs-Élysées, Paris",
        },
      ],
    },
    {
      day: 2,
      date: "May 16, 2023",
      activities: [
        {
          id: 4,
          time: "09:00 AM",
          title: "Eiffel Tower Visit",
          description: "Skip-the-line tickets",
          type: "attraction",
          location: "Champ de Mars, Paris",
        },
        {
          id: 5,
          time: "12:30 PM",
          title: "Lunch at Café de Paris",
          description: "Outdoor seating",
          type: "food",
          location: "10 Place de la Concorde, Paris",
        },
        {
          id: 6,
          time: "3:00 PM",
          title: "Louvre Museum",
          description: "Guided tour",
          type: "attraction",
          location: "Rue de Rivoli, Paris",
        },
      ],
    },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "flight":
        return <Plane className="h-5 w-5 text-blue-500" />;
      case "accommodation":
        return <Hotel className="h-5 w-5 text-[#FF5722]" />;
      case "food":
        return <Utensils className="h-5 w-5 text-orange-500" />;
      case "attraction":
        return <Ticket className="h-5 w-5 text-purple-500" />;
      default:
        return <MapPin className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {days.map((day) => (
        <div key={day.day} className="space-y-4">
          <div className="flex items-center">
            <Badge className="mr-2 bg-[#FF5722]">Day {day.day}</Badge>
            <h3 className="font-bold">{day.date}</h3>
          </div>
          <div className="space-y-3 pl-4 border-l-2 border-gray-200">
            {day.activities.map((activity) => (
              <Card key={activity.id} className="ml-4 relative">
                <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-gray-200"></div>
                <CardContent className="p-4">
                  <div className="flex items-start">
                    <div className="mr-4 mt-1">{getActivityIcon(activity.type)}</div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold">{activity.title}</h4>
                          <p className="text-sm text-gray-500">{activity.description}</p>
                          <p className="text-xs text-gray-400 mt-1">{activity.location}</p>
                        </div>
                        <div className="text-sm text-gray-500">{activity.time}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
} 