import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Clock, Plane, Wifi, Coffee, Monitor, Leaf } from "lucide-react"

export function FlightSearchResults() {
  const flights = [
    {
      id: 1,
      airline: "AirAsia",
      flightNumber: "AA 123",
      departureTime: "10:30 AM",
      departureAirport: "JFK",
      arrivalTime: "2:45 PM",
      arrivalAirport: "LHR",
      duration: "7h 15m",
      stops: 0,
      price: "$499",
      eco: true,
      amenities: ["wifi", "food", "entertainment"],
    },
    {
      id: 2,
      airline: "Singapore Airlines",
      flightNumber: "SQ 456",
      departureTime: "1:15 PM",
      departureAirport: "JFK",
      arrivalTime: "6:30 PM",
      arrivalAirport: "LHR",
      duration: "7h 15m",
      stops: 1,
      stopAirport: "DUB",
      price: "$549",
      eco: false,
      amenities: ["wifi", "food", "entertainment"],
    },
    {
      id: 3,
      airline: "British Airways",
      flightNumber: "BA 789",
      departureTime: "8:45 PM",
      departureAirport: "JFK",
      arrivalTime: "9:00 AM",
      arrivalAirport: "LHR",
      duration: "7h 15m",
      stops: 0,
      price: "$599",
      eco: true,
      amenities: ["wifi", "food", "entertainment"],
    },
  ]

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case "wifi":
        return <Wifi className="h-4 w-4" />
      case "food":
        return <Coffee className="h-4 w-4" />
      case "entertainment":
        return <Monitor className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Search Results</h2>
        <Tabs defaultValue="best">
          <TabsList>
            <TabsTrigger value="best">Best</TabsTrigger>
            <TabsTrigger value="cheapest">Cheapest</TabsTrigger>
            <TabsTrigger value="fastest">Fastest</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="space-y-4">
        {flights.map((flight) => (
          <Card key={flight.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <Plane className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-bold">{flight.airline}</p>
                    <p className="text-sm text-gray-500">{flight.flightNumber}</p>
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <div className="flex items-center space-x-2">
                    <p className="font-bold">{flight.departureTime}</p>
                    <p className="text-sm text-gray-500">{flight.departureAirport}</p>
                  </div>
                  <div className="flex items-center my-1">
                    <div className="h-0.5 flex-grow bg-gray-300"></div>
                    {flight.stops > 0 && (
                      <Badge variant="outline" className="mx-2">
                        {flight.stops} stop
                      </Badge>
                    )}
                    {flight.stops === 0 && (
                      <Badge variant="outline" className="mx-2 bg-[#FF5722]/10 text-[#FF5722] border-[#FF5722]/20">
                        Direct
                      </Badge>
                    )}
                    <div className="h-0.5 flex-grow bg-gray-300"></div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <p className="font-bold">{flight.arrivalTime}</p>
                    <p className="text-sm text-gray-500">{flight.arrivalAirport}</p>
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <p className="text-sm">{flight.duration}</p>
                  </div>
                  {flight.stops > 0 && <p className="text-sm text-gray-500 mt-1">via {flight.stopAirport}</p>}
                  <div className="flex items-center space-x-2 mt-1">
                    {flight.amenities.map((amenity, index) => (
                      <div key={index} className="text-gray-500">
                        {getAmenityIcon(amenity)}
                      </div>
                    ))}
                    {flight.eco && (
                      <div className="text-green-600">
                        <Leaf className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col justify-between items-end">
                  <p className="text-xl font-bold text-[#FF5722]">{flight.price}</p>
                  <Button className="bg-[#FF5722] hover:bg-[#FF5722]/90">Select</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
