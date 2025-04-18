import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, Plane, Hotel, Car, Package } from "lucide-react"
import Link from "next/link"
import { UpcomingTrip } from "@/components/upcoming-trip"
import { WeatherWidget } from "@/components/weather-widget"
import { NotificationList } from "@/components/notification-list"
import { RecommendedPackages } from "@/components/recommended-packages"

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button>
            <CalendarDays className="mr-2 h-4 w-4" />
            Plan New Trip
          </Button>
        </div>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="bookings">My Bookings</TabsTrigger>
          <TabsTrigger value="itineraries">Itineraries</TabsTrigger>
          <TabsTrigger value="saved">Saved</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Trips</CardTitle>
                <Plane className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">Next trip in 5 days</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Bookings</CardTitle>
                <Hotel className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">4 flights, 3 hotels, 1 car</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Saved Itineraries</CardTitle>
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7</div>
                <p className="text-xs text-muted-foreground">3 shared with friends</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Reward Points</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5,240</div>
                <p className="text-xs text-muted-foreground">+120 from last booking</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Upcoming Trips</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <UpcomingTrip
                  destination="Bali, Indonesia"
                  dates="May 15 - May 25, 2023"
                  image="/placeholder.svg?height=100&width=200"
                  flightInfo="AirAsia • May 15, 10:30 AM"
                  hotelInfo="Ubud Bali Resort • 10 nights"
                />
                <UpcomingTrip
                  destination="Paris, France"
                  dates="June 10 - June 17, 2023"
                  image="/placeholder.svg?height=100&width=200"
                  flightInfo="Air France • June 10, 2:15 PM"
                  hotelInfo="Le Grand Paris • 7 nights"
                />
                <UpcomingTrip
                  destination="Tokyo, Japan"
                  dates="July 3 - July 12, 2023"
                  image="/placeholder.svg?height=100&width=200"
                  flightInfo="Japan Airlines • July 3, 11:45 PM"
                  hotelInfo="Shibuya Hotel • 9 nights"
                />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Weather Updates</CardTitle>
                <CardDescription>Current weather at your destinations</CardDescription>
              </CardHeader>
              <CardContent>
                <WeatherWidget
                  location="Bali, Indonesia"
                  temperature="29°C"
                  condition="Sunny"
                  humidity="75%"
                  wind="10 km/h"
                />
                <WeatherWidget
                  location="Paris, France"
                  temperature="18°C"
                  condition="Partly Cloudy"
                  humidity="65%"
                  wind="15 km/h"
                />
                <WeatherWidget
                  location="Tokyo, Japan"
                  temperature="24°C"
                  condition="Rainy"
                  humidity="80%"
                  wind="8 km/h"
                />
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Stay updated with your travel plans</CardDescription>
              </CardHeader>
              <CardContent>
                <NotificationList />
              </CardContent>
            </Card>
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Recommended for You</CardTitle>
                <CardDescription>Based on your travel preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <RecommendedPackages />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="bookings" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle>Flights</CardTitle>
                  <CardDescription>Manage your flight bookings</CardDescription>
                </div>
                <Plane className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4</div>
                <Button variant="link" className="px-0">
                  <Link href="/bookings/flights">View all flights</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle>Hotels</CardTitle>
                  <CardDescription>Manage your hotel bookings</CardDescription>
                </div>
                <Hotel className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <Button variant="link" className="px-0">
                  <Link href="/bookings/hotels">View all hotels</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle>Cabs</CardTitle>
                  <CardDescription>Manage your cab bookings</CardDescription>
                </div>
                <Car className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1</div>
                <Button variant="link" className="px-0">
                  <Link href="/bookings/cabs">View all cabs</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle>Packages</CardTitle>
                  <CardDescription>Manage your package bookings</CardDescription>
                </div>
                <Package className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <Button variant="link" className="px-0">
                  <Link href="/bookings/packages">View all packages</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="itineraries" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Itineraries</CardTitle>
              <CardDescription>Manage and customize your travel plans</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Your itineraries will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="saved" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Saved Items</CardTitle>
              <CardDescription>View your saved destinations, hotels, and more</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Your saved items will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
