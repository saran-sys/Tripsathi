import { Card, CardContent } from "@/components/ui/card"
import { Plane, Hotel, Calendar } from "lucide-react"

interface UpcomingTripProps {
  destination: string
  dates: string
  image: string
  flightInfo: string
  hotelInfo: string
}

export function UpcomingTrip({ destination, dates, image, flightInfo, hotelInfo }: UpcomingTripProps) {
  return (
    <Card className="mb-4 overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row">
          <div className="w-full sm:w-1/3">
            <img
              src={image || "/placeholder.svg"}
              alt={destination}
              className="h-full w-full object-cover"
              style={{ minHeight: "120px" }}
            />
          </div>
          <div className="p-4 w-full sm:w-2/3">
            <h3 className="font-bold text-lg">{destination}</h3>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <Calendar className="h-4 w-4 mr-1" />
              {dates}
            </div>
            <div className="mt-3 space-y-2">
              <div className="flex items-center text-sm">
                <Plane className="h-4 w-4 mr-2 text-blue-500" />
                <span>{flightInfo}</span>
              </div>
              <div className="flex items-center text-sm">
                <Hotel className="h-4 w-4 mr-2 text-[#FF5722]" />
                <span>{hotelInfo}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
