import { Card, CardContent } from "@/components/ui/card"
import { Cloud, CloudRain, Droplets, Sun, Wind } from "lucide-react"

interface WeatherWidgetProps {
  location: string
  temperature: string
  condition: string
  humidity: string
  wind: string
}

export function WeatherWidget({ location, temperature, condition, humidity, wind }: WeatherWidgetProps) {
  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "sunny":
        return <Sun className="h-8 w-8 text-yellow-500" />
      case "partly cloudy":
        return <Cloud className="h-8 w-8 text-gray-400" />
      case "rainy":
        return <CloudRain className="h-8 w-8 text-blue-400" />
      default:
        return <Cloud className="h-8 w-8 text-gray-400" />
    }
  }

  return (
    <Card className="mb-4 bg-gradient-to-br from-blue-50 to-white">
      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-bold">{location}</h3>
            <p className="text-sm text-gray-500">{condition}</p>
          </div>
          <div className="flex items-center">
            {getWeatherIcon(condition)}
            <span className="text-2xl font-bold ml-2">{temperature}</span>
          </div>
        </div>
        <div className="flex justify-between mt-4 text-sm">
          <div className="flex items-center">
            <Droplets className="h-4 w-4 mr-1 text-blue-500" />
            <span>{humidity}</span>
          </div>
          <div className="flex items-center">
            <Wind className="h-4 w-4 mr-1 text-blue-500" />
            <span>{wind}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
