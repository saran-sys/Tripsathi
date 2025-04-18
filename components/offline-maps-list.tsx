import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Trash2, MapPin, RefreshCw } from "lucide-react"

export function OfflineMapsList() {
  const offlineMaps = [
    {
      id: 1,
      name: "New York City",
      country: "United States",
      size: "78 MB",
      lastUpdated: "2 days ago",
      progress: 100,
    },
    {
      id: 2,
      name: "London",
      country: "United Kingdom",
      size: "65 MB",
      lastUpdated: "1 week ago",
      progress: 100,
    },
    {
      id: 3,
      name: "Barcelona",
      country: "Spain",
      size: "42 MB",
      lastUpdated: "3 weeks ago",
      progress: 100,
    },
    {
      id: 4,
      name: "Rome",
      country: "Italy",
      size: "56 MB",
      lastUpdated: "Just now",
      progress: 45,
      downloading: true,
    },
  ]

  return (
    <div className="space-y-4">
      {offlineMaps.map((map) => (
        <Card key={map.id} className="overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-start space-x-4">
                <div className="bg-gray-100 rounded-md p-2">
                  <MapPin className="h-6 w-6 text-gray-500" />
                </div>
                <div>
                  <h3 className="font-bold">{map.name}</h3>
                  <p className="text-sm text-gray-500">{map.country}</p>
                  <div className="flex items-center mt-1">
                    <p className="text-xs text-gray-500">
                      {map.size} • Last updated {map.lastUpdated}
                    </p>
                  </div>
                  {map.downloading && (
                    <div className="mt-2 w-full max-w-[200px]">
                      <Progress value={map.progress} className="h-2" />
                      <p className="text-xs text-gray-500 mt-1">Downloading... {map.progress}%</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex space-x-2">
                {!map.downloading && (
                  <>
                    <Button size="sm" variant="outline">
                      <RefreshCw className="h-4 w-4 mr-1" /> Update
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-500 border-red-200 hover:bg-red-50">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </>
                )}
                {map.downloading && (
                  <Button size="sm" variant="outline" className="text-red-500 border-red-200 hover:bg-red-50">
                    Cancel
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
