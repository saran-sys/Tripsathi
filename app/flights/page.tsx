import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeftRight, Calendar, Plane, Search, Users } from "lucide-react"
import { FlightSearchResults } from "@/components/flight-search-results"

export default function FlightsPage() {
  return (
    <div className="container mx-auto py-10 space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold">Flight Booking</h1>
        <p className="text-gray-500">Search and book flights to your favorite destinations</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <Tabs defaultValue="roundtrip" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="roundtrip">Round Trip</TabsTrigger>
              <TabsTrigger value="oneway">One Way</TabsTrigger>
              <TabsTrigger value="multicity">Multi-City</TabsTrigger>
            </TabsList>
            <TabsContent value="roundtrip" className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="from">From</Label>
                  <div className="relative">
                    <Plane className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                    <Input id="from" placeholder="City or Airport" className="pl-8" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="to">To</Label>
                  <div className="relative">
                    <Plane className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                    <Input id="to" placeholder="City or Airport" className="pl-8" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="departure">Departure</Label>
                  <div className="relative">
                    <Calendar className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                    <Input id="departure" type="date" className="pl-8" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="return">Return</Label>
                  <div className="relative">
                    <Calendar className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                    <Input id="return" type="date" className="pl-8" />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="passengers">Passengers</Label>
                  <div className="relative">
                    <Users className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                    <Select>
                      <SelectTrigger id="passengers" className="pl-8">
                        <SelectValue placeholder="1 Adult" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Adult</SelectItem>
                        <SelectItem value="2">2 Adults</SelectItem>
                        <SelectItem value="3">3 Adults</SelectItem>
                        <SelectItem value="4">4 Adults</SelectItem>
                        <SelectItem value="family">2 Adults, 2 Children</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="class">Class</Label>
                  <Select>
                    <SelectTrigger id="class">
                      <SelectValue placeholder="Economy" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="economy">Economy</SelectItem>
                      <SelectItem value="premium">Premium Economy</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="first">First Class</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <Search className="mr-2 h-4 w-4" /> Search Flights
                  </Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="oneway" className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="from-oneway">From</Label>
                  <div className="relative">
                    <Plane className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                    <Input id="from-oneway" placeholder="City or Airport" className="pl-8" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="to-oneway">To</Label>
                  <div className="relative">
                    <Plane className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                    <Input id="to-oneway" placeholder="City or Airport" className="pl-8" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="departure-oneway">Departure</Label>
                  <div className="relative">
                    <Calendar className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                    <Input id="departure-oneway" type="date" className="pl-8" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="passengers-oneway">Passengers</Label>
                  <div className="relative">
                    <Users className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                    <Select>
                      <SelectTrigger id="passengers-oneway" className="pl-8">
                        <SelectValue placeholder="1 Adult" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Adult</SelectItem>
                        <SelectItem value="2">2 Adults</SelectItem>
                        <SelectItem value="3">3 Adults</SelectItem>
                        <SelectItem value="4">4 Adults</SelectItem>
                        <SelectItem value="family">2 Adults, 2 Children</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="class-oneway">Class</Label>
                  <Select>
                    <SelectTrigger id="class-oneway">
                      <SelectValue placeholder="Economy" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="economy">Economy</SelectItem>
                      <SelectItem value="premium">Premium Economy</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="first">First Class</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <Search className="mr-2 h-4 w-4" /> Search Flights
                  </Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="multicity" className="pt-4">
              <p className="text-sm text-gray-500 mb-4">Add up to 5 flights to create your itinerary</p>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg">
                  <div className="space-y-2">
                    <Label htmlFor="from-multi-1">From</Label>
                    <div className="relative">
                      <Plane className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                      <Input id="from-multi-1" placeholder="City or Airport" className="pl-8" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="to-multi-1">To</Label>
                    <div className="relative">
                      <Plane className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                      <Input id="to-multi-1" placeholder="City or Airport" className="pl-8" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="departure-multi-1">Departure</Label>
                    <div className="relative">
                      <Calendar className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                      <Input id="departure-multi-1" type="date" className="pl-8" />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg">
                  <div className="space-y-2">
                    <Label htmlFor="from-multi-2">From</Label>
                    <div className="relative">
                      <Plane className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                      <Input id="from-multi-2" placeholder="City or Airport" className="pl-8" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="to-multi-2">To</Label>
                    <div className="relative">
                      <Plane className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                      <Input id="to-multi-2" placeholder="City or Airport" className="pl-8" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="departure-multi-2">Departure</Label>
                    <div className="relative">
                      <Calendar className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                      <Input id="departure-multi-2" type="date" className="pl-8" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between mt-4">
                <Button variant="outline">+ Add Another Flight</Button>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Search className="mr-2 h-4 w-4" /> Search Flights
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Popular Flight Deals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="overflow-hidden">
            <div className="h-40 bg-gradient-to-r from-blue-500 to-purple-500 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-center">
                  <h3 className="text-xl font-bold">New York to London</h3>
                  <div className="flex items-center justify-center mt-2">
                    <Plane className="h-5 w-5 mr-2" />
                    <ArrowLeftRight className="h-4 w-4" />
                    <Plane className="h-5 w-5 ml-2 transform rotate-180" />
                  </div>
                </div>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Round Trip, Economy</p>
                  <p className="text-lg font-bold text-green-600">$499</p>
                </div>
                <Button size="sm">View Deal</Button>
              </div>
            </CardContent>
          </Card>
          <Card className="overflow-hidden">
            <div className="h-40 bg-gradient-to-r from-green-500 to-teal-500 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-center">
                  <h3 className="text-xl font-bold">Los Angeles to Tokyo</h3>
                  <div className="flex items-center justify-center mt-2">
                    <Plane className="h-5 w-5 mr-2" />
                    <ArrowLeftRight className="h-4 w-4" />
                    <Plane className="h-5 w-5 ml-2 transform rotate-180" />
                  </div>
                </div>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Round Trip, Economy</p>
                  <p className="text-lg font-bold text-green-600">$799</p>
                </div>
                <Button size="sm">View Deal</Button>
              </div>
            </CardContent>
          </Card>
          <Card className="overflow-hidden">
            <div className="h-40 bg-gradient-to-r from-yellow-500 to-red-500 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-center">
                  <h3 className="text-xl font-bold">Singapore to Bali</h3>
                  <div className="flex items-center justify-center mt-2">
                    <Plane className="h-5 w-5 mr-2" />
                    <ArrowLeftRight className="h-4 w-4" />
                    <Plane className="h-5 w-5 ml-2 transform rotate-180" />
                  </div>
                </div>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Round Trip, Economy</p>
                  <p className="text-lg font-bold text-green-600">$299</p>
                </div>
                <Button size="sm">View Deal</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <FlightSearchResults />
    </div>
  )
}
