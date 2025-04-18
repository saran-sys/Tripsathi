import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Wifi, Coffee, Tv, ParkingMeterIcon as Parking, Leaf } from "lucide-react"

export function HotelSearchResults() {
  const hotels = [
    {
      id: 1,
      name: "Grand Hyatt",
      location: "Downtown, New York",
      rating: 4.8,
      reviews: 1245,
      price: "$199",
      perNight: true,
      image: "/placeholder.svg?height=200&width=300",
      amenities: ["wifi", "breakfast", "tv", "parking"],
      eco: true,
      discount: "15% OFF",
    },
    {
      id: 2,
      name: "Seaside Resort & Spa",
      location: "Beachfront, Miami",
      rating: 4.6,
      reviews: 890,
      price: "$249",
      perNight: true,
      image: "/placeholder.svg?height=200&width=300",
      amenities: ["wifi", "breakfast", "tv", "parking"],
      eco: true,
      discount: null,
    },
    {
      id: 3,
      name: "Urban Boutique Hotel",
      location: "City Center, San Francisco",
      rating: 4.5,
      reviews: 723,
      price: "$179",
      perNight: true,
      image: "/placeholder.svg?height=200&width=300",
      amenities: ["wifi", "tv"],
      eco: false,
      discount: "10% OFF",
    },
  ]

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case "wifi":
        return <Wifi className="h-4 w-4" />
      case "breakfast":
        return <Coffee className="h-4 w-4" />
      case "tv":
        return <Tv className="h-4 w-4" />
      case "parking":
        return <Parking className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Search Results</h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            Filter
          </Button>
          <Button variant="outline" size="sm">
            Sort: Recommended
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {hotels.map((hotel) => (
          <Card key={hotel.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <img
                    src={hotel.image || "/placeholder.svg"}
                    alt={hotel.name}
                    className="w-full h-full object-cover"
                    style={{ minHeight: "200px" }}
                  />
                  {hotel.discount && <Badge className="absolute top-2 left-2 bg-red-500">{hotel.discount}</Badge>}
                  {hotel.eco && (
                    <Badge className="absolute top-2 right-2 bg-green-500">
                      <Leaf className="h-3 w-3 mr-1" /> Eco-friendly
                    </Badge>
                  )}
                </div>
                <div className="p-4 md:col-span-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-xl font-bold">{hotel.name}</h3>
                      <div className="flex items-center mt-1">
                        <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                        <p className="text-sm text-gray-500">{hotel.location}</p>
                      </div>
                      <div className="flex items-center mt-2">
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(hotel.rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-sm ml-2">
                          <span className="font-bold">{hotel.rating}</span>{" "}
                          <span className="text-gray-500">({hotel.reviews} reviews)</span>
                        </p>
                      </div>
                      <div className="flex items-center space-x-2 mt-4">
                        {hotel.amenities.map((amenity, index) => (
                          <div key={index} className="flex items-center text-gray-500 text-sm">
                            {getAmenityIcon(amenity)}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col justify-between items-end">
                      <div className="text-right">
                        <p className="text-2xl font-bold text-[#FF5722]">{hotel.price}</p>
                        {hotel.perNight && <p className="text-sm text-gray-500">per night</p>}
                      </div>
                      <Button className="mt-4 bg-[#FF5722] hover:bg-[#FF5722]/90">View Details</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
