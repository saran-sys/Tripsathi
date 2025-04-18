import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Leaf, Star } from "lucide-react"
import Link from "next/link"

interface PackageCardProps {
  image: string
  title: string
  description: string
  price: string
  rating: number
  eco?: boolean
}

export function PackageCard({ image, title, description, price, rating, eco = false }: PackageCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="aspect-[4/3] w-full overflow-hidden relative">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          width={300}
          height={400}
          className="h-full w-full object-cover transition-all hover:scale-105"
        />
        {eco && (
          <div className="absolute top-2 right-2 bg-[#FF5722] text-white p-1 rounded-md flex items-center">
            <Leaf className="h-4 w-4 mr-1" />
            <span className="text-xs font-medium">Eco-friendly</span>
          </div>
        )}
      </div>
      <CardHeader className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold">{title}</h3>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <span className="ml-1 text-sm font-medium">{rating}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-gray-500">{description}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4">
        <p className="font-bold text-[#FF5722]">{price}</p>
        <Button asChild variant="ghost" size="sm">
          <Link href={`/packages/${title.toLowerCase().replace(/\s+/g, "-")}`}>
            View Details <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
