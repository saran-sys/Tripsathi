import { Button } from "@/components/ui/button"
import { Leaf, Star } from "lucide-react"
import Link from "next/link"

export function RecommendedPackages() {
  const packages = [
    {
      id: 1,
      title: "Bali Eco Retreat",
      description: "5 days of sustainable luxury in Ubud's rainforest.",
      price: "$899",
      image: "/placeholder.svg?height=80&width=120",
      eco: true,
      rating: 4.8,
    },
    {
      id: 2,
      title: "Paris Cultural Tour",
      description: "3 days exploring museums, cuisine, and architecture.",
      price: "$699",
      image: "/placeholder.svg?height=80&width=120",
      eco: false,
      rating: 4.6,
    },
    {
      id: 3,
      title: "Tokyo City Explorer",
      description: "4 days discovering Tokyo's blend of tradition and innovation.",
      price: "$799",
      image: "/placeholder.svg?height=80&width=120",
      eco: true,
      rating: 4.7,
    },
  ]

  return (
    <div className="space-y-4">
      {packages.map((pkg) => (
        <div
          key={pkg.id}
          className="flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-4 p-3 rounded-lg border hover:bg-gray-50 transition-colors"
        >
          <div className="sm:w-1/4">
            <img
              src={pkg.image || "/placeholder.svg"}
              alt={pkg.title}
              className="rounded-md object-cover w-full h-24"
            />
          </div>
          <div className="sm:w-3/4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="font-bold">{pkg.title}</h3>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span className="ml-1 text-sm">{pkg.rating}</span>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-1">{pkg.description}</p>
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center">
                <span className="font-bold text-[#FF5722]">{pkg.price}</span>
                {pkg.eco && (
                  <span className="ml-2 inline-flex items-center rounded-full bg-[#FF5722]/10 px-2.5 py-0.5 text-xs font-medium text-[#FF5722]">
                    <Leaf className="h-3 w-3 mr-1" /> Eco-friendly
                  </span>
                )}
              </div>
              <Button asChild size="sm" variant="outline">
                <Link href={`/packages/${pkg.id}`}>View Details</Link>
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
