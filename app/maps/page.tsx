import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Download, MapPin, Navigation, Search, Wifi, WifiOff } from "lucide-react"
import { OfflineMapsList } from "@/components/offline-maps-list"

export default function MapsPage() {
  return (
    <div className="container mx-auto py-10 space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold">Maps</h1>
        <p className="text-gray-500">Navigate with confidence, even offline</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Interactive Map</CardTitle>
          <CardDescription>Search for locations and get directions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex space-x-2">
              <div className="relative flex-grow">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input placeholder="Search for a location" className="pl-8" />
              </div>
              <Button variant="outline">
                <MapPin className="h-4 w-4 mr-2" />
                Current Location
              </Button>
            </div>
            <div className="aspect-video bg-gray-100 rounded-md flex items-center justify-center">
              <div className="text-center">
                <Navigation className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Interactive map will be displayed here</p>
                <p className="text-sm text-gray-400">Powered by Tripsathi Maps</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="download" className="space-y-4">
        <TabsList>
          <TabsTrigger value="download">Download Maps</TabsTrigger>
          <TabsTrigger value="saved">Saved Maps</TabsTrigger>
        </TabsList>
        <TabsContent value="download" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Download Maps for Offline Use</CardTitle>
              <CardDescription>Save maps to use when you don't have an internet connection</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <div className="relative flex-grow">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                    <Input placeholder="Search for a city or region" className="pl-8" />
                  </div>
                  <Button className="bg-green-600 hover:bg-green-700">Search</Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="aspect-video bg-gray-100 rounded-md mb-3 relative">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/50 rounded-md"></div>
                        <div className="absolute bottom-2 left-2 text-white font-bold">Paris, France</div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-500">Size: 45 MB</p>
                        </div>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-1" /> Download
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="aspect-video bg-gray-100 rounded-md mb-3 relative">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/50 rounded-md"></div>
                        <div className="absolute bottom-2 left-2 text-white font-bold">Tokyo, Japan</div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-500">Size: 62 MB</p>
                        </div>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-1" /> Download
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="aspect-video bg-gray-100 rounded-md mb-3 relative">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/50 rounded-md"></div>
                        <div className="absolute bottom-2 left-2 text-white font-bold">Bali, Indonesia</div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-500">Size: 38 MB</p>
                        </div>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-1" /> Download
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="saved" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Offline Maps</CardTitle>
              <CardDescription>Maps you've downloaded for offline use</CardDescription>
            </CardHeader>
            <CardContent>
              <OfflineMapsList />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Offline Mode</CardTitle>
          <CardDescription>Use maps without an internet connection</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-amber-50 rounded-lg border border-amber-200">
              <div className="flex items-center">
                <WifiOff className="h-5 w-5 text-amber-500 mr-2" />
                <div>
                  <p className="font-medium">Offline Mode</p>
                  <p className="text-sm text-gray-500">You can still navigate using your downloaded maps</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Wifi className="h-4 w-4 mr-1" /> Go Online
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="offline-search">Find on offline map</Label>
                <div className="relative mt-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                  <Input id="offline-search" placeholder="Search in downloaded areas" className="pl-8" />
                </div>
              </div>
              <div className="flex items-end">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <Navigation className="h-4 w-4 mr-2" /> Get Directions Offline
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
