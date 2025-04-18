import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar, Plus, Share2, Download, Edit, Trash2 } from "lucide-react"
import { ItineraryTimeline } from "@/components/itinerary-timeline"

export default function ItineraryPage() {
  return (
    <div className="container mx-auto py-10 space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold">Itinerary Planner</h1>
        <p className="text-gray-500">Create and manage your travel plans</p>
      </div>

      <Tabs defaultValue="create" className="space-y-4">
        <TabsList>
          <TabsTrigger value="create">Create New</TabsTrigger>
          <TabsTrigger value="saved">Saved Itineraries</TabsTrigger>
          <TabsTrigger value="shared">Shared With Me</TabsTrigger>
        </TabsList>
        <TabsContent value="create" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Create New Itinerary</CardTitle>
              <CardDescription>Plan your perfect trip day by day</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="itinerary-name">Itinerary Name</Label>
                    <Input id="itinerary-name" placeholder="e.g., Summer Europe Trip" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="destination">Main Destination</Label>
                    <Input id="destination" placeholder="e.g., Paris, France" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start-date">Start Date</Label>
                    <div className="relative">
                      <Calendar className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                      <Input id="start-date" type="date" className="pl-8" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-date">End Date</Label>
                    <div className="relative">
                      <Calendar className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                      <Input id="end-date" type="date" className="pl-8" />
                    </div>
                  </div>
                </div>
                <Button className="bg-[#FF5722] hover:bg-[#FF5722]/90">
                  <Plus className="h-4 w-4 mr-2" /> Create Itinerary
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sample Itinerary</CardTitle>
              <CardDescription>Paris, France - 5 days trip</CardDescription>
            </CardHeader>
            <CardContent>
              <ItineraryTimeline />
              <div className="flex justify-end space-x-2 mt-6">
                <Button variant="outline">
                  <Share2 className="h-4 w-4 mr-2" /> Share
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" /> Export
                </Button>
                <Button className="bg-[#FF5722] hover:bg-[#FF5722]/90">
                  <Edit className="h-4 w-4 mr-2" /> Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="saved" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Saved Itineraries</CardTitle>
              <CardDescription>Access and manage your travel plans</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-bold">
                            {i === 1 ? "Summer in Bali" : i === 2 ? "Tokyo Adventure" : "European Tour"}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {i === 1 ? "Bali, Indonesia" : i === 2 ? "Tokyo, Japan" : "Multiple Cities, Europe"}
                          </p>
                          <div className="flex items-center mt-1">
                            <Calendar className="h-4 w-4 text-gray-500 mr-1" />
                            <p className="text-xs text-gray-500">
                              {i === 1
                                ? "May 15 - May 25, 2023"
                                : i === 2
                                  ? "July 3 - July 12, 2023"
                                  : "June 10 - June 24, 2023"}
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Share2 className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-500 border-red-200 hover:bg-red-50">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="shared" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Shared Itineraries</CardTitle>
              <CardDescription>Itineraries shared with you by friends and family</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold">Thailand Trip</h3>
                        <p className="text-sm text-gray-500">Bangkok & Phuket, Thailand</p>
                        <div className="flex items-center mt-1">
                          <Calendar className="h-4 w-4 text-gray-500 mr-1" />
                          <p className="text-xs text-gray-500">August 5 - August 15, 2023</p>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Shared by: Alex Johnson</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                        <Button size="sm" className="bg-[#FF5722] hover:bg-[#FF5722]/90">
                          Copy to My Itineraries
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
