import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, MapPin, Search, Users } from "lucide-react"

export default function HotelsPage() {
  return (
    <div className="container mx-auto py-10 space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold">Hotel Booking</h1>
        <p className="text-gray-500">Find and book accommodations worldwide</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="destination">Destination</Label>
              <div className="relative">
                <MapPin className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input id="destination" placeholder="City, region, or hotel" className="pl-8" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="check-in">Check-in</Label>
              <div className="relative">
                <Calendar className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input id="check-in" type="date" className="pl-8" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="check-out">Check-out</Label>
              <div className="relative">
                <Calendar className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input id="check-out" type="date" className="pl-8" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="guests">Guests</Label>
              <div className="relative">
                <Users className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Select>
                  <SelectTrigger id="guests" className="pl-8">
                    <SelectValue placeholder="2 Adults, 0 Children" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1a">1 Adult</SelectItem>
                    <SelectItem value="2a">2 Adults</SelectItem>
                    <SelectItem value="2a1c">2 Adults, 1 Child</SelectItem>
                    <SelectItem value="2a2c">2 Adults, 2 Children</SelectItem>
                    <SelectItem value="4a">4 Adults</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="property-type">Property Type</Label>
              <Select>
                <SelectTrigger id="property-type">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="hotel">Hotels</SelectItem>
                  <SelectItem value="resort">Resorts</SelectItem>
                  <SelectItem value="apartment">Apartments</SelectItem>
                  <SelectItem value="villa">Villas</SelectItem>
                  <SelectItem value="hostel">Hostels</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="price-range">Price Range</Label>
              <Select>
                <SelectTrigger id="price-range">
                  <SelectValue placeholder="Any Price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Price</SelectItem>
                  <SelectItem value="budget">Budget ($)</SelectItem>
                  <SelectItem value="moderate">Moderate ($$)</SelectItem>
                  <SelectItem value="luxury">Luxury ($$$)</SelectItem>
                  <SelectItem value="ultra">Ultra Luxury ($$$$)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button className="w-full bg-[#FF5722] hover:bg-[#FF5722]/90">
                <Search className="mr-2 h-4 w-4" /> Search Hotels
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Popular Destinations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"></div>
      </div>
    </div>
  )
}
