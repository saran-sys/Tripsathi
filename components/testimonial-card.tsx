import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Star } from "lucide-react"

interface TestimonialCardProps {
  name: string
  location: string
  quote: string
  avatar: string
  rating: number
}

export function TestimonialCard({ name, location, quote, avatar, rating }: TestimonialCardProps) {
  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <img
          src={avatar || "/placeholder.svg"}
          alt={name}
          width={50}
          height={50}
          className="rounded-full h-12 w-12 object-cover"
        />
        <div>
          <h3 className="font-bold">{name}</h3>
          <p className="text-sm text-gray-500">{location}</p>
        </div>
      </CardHeader>
      <CardContent>
        <p className="italic text-gray-600">"{quote}"</p>
        <div className="flex mt-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`h-4 w-4 ${i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
