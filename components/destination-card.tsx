import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

interface DestinationCardProps {
  image: string
  title: string
  description: string
  price: string
}

export default function DestinationCard({ image, title, description, price }: DestinationCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="aspect-[4/3] w-full overflow-hidden">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          width={300}
          height={400}
          className="h-full w-full object-cover transition-all hover:scale-105"
        />
      </div>
      <CardHeader className="p-4">
        <h3 className="text-xl font-bold">{title}</h3>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-gray-500">{description}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4">
        <p className="font-bold text-[#FF5722]">{price}</p>
        <Button asChild variant="ghost" size="sm">
          <Link href={`/destinations/${title.toLowerCase().replace(/\s+/g, "-")}`}>
            Explore <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
