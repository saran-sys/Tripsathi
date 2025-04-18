import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, Globe, Hotel, Map, MapPin, Plane, Shield, Zap } from "lucide-react"
import DestinationCard from "@/components/destination-card"
import FeatureCard from "@/components/feature-card"
import { PackageCard } from "@/components/package-card"
import { TestimonialCard } from "@/components/testimonial-card"
import { Newsletter } from "@/components/newsletter"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-green-50 to-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Discover the World with Tripsathi
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl">
                  Your all-in-one travel companion for booking flights, hotels, cabs, and creating personalized
                  itineraries. Experience sustainable travel with offline maps and real-time updates.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
                  <Link href="/dashboard">
                    Plan Your Trip <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/packages">Explore Packages</Link>
                </Button>
              </div>
            </div>
            <div className="relative lg:ml-auto">
              <img
                src="https://i.pinimg.com/736x/0c/1f/52/0c1f52e1412625e652a414914e32ea35.jpg"
                alt="Travel Destinations"
                width={550}
                height={550}
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Book Your Perfect Trip</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Search and book flights, hotels, cabs, and tour packages all in one place.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-4">
            <div className="grid gap-1">
              <Button variant="outline" className="justify-start h-12">
                <Plane className="mr-2 h-4 w-4" />
                Flights
              </Button>
            </div>
            <div className="grid gap-1">
              <Button variant="outline" className="justify-start h-12">
                <Hotel className="mr-2 h-4 w-4" />
                Hotels
              </Button>
            </div>
            <div className="grid gap-1">
              <Button variant="outline" className="justify-start h-12">
                <MapPin className="mr-2 h-4 w-4" />
                Cabs
              </Button>
            </div>
            <div className="grid gap-1">
              <Button variant="outline" className="justify-start h-12">
                <Calendar className="mr-2 h-4 w-4" />
                Packages
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Key Features</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Everything you need for a seamless travel experience.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
            <FeatureCard
              icon={<Calendar className="h-10 w-10 text-green-600" />}
              title="Custom Itineraries"
              description="Create personalized travel plans tailored to your preferences and schedule."
            />
            <FeatureCard
              icon={<Map className="h-10 w-10 text-green-600" />}
              title="Offline Maps"
              description="Access maps and directions even without internet connectivity."
            />
            <FeatureCard
              icon={<Zap className="h-10 w-10 text-green-600" />}
              title="Real-time Updates"
              description="Get instant notifications about flight delays, weather changes, and more."
            />
            <FeatureCard
              icon={<Globe className="h-10 w-10 text-green-600" />}
              title="Sustainable Travel"
              description="Discover eco-friendly destinations and reduce your carbon footprint."
            />
            <FeatureCard
              icon={<Shield className="h-10 w-10 text-green-600" />}
              title="Secure Bookings"
              description="Book with confidence with our secure payment system and guarantees."
            />
            <FeatureCard
              icon={<Plane className="h-10 w-10 text-green-600" />}
              title="All-in-One Booking"
              description="Book flights, hotels, cabs, and packages in a single platform."
            />
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Popular Destinations</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Explore trending destinations loved by travelers worldwide.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            <DestinationCard
              image="/placeholder.svg?height=400&width=300"
              title="Bali, Indonesia"
              description="Tropical paradise with beautiful beaches and rich culture."
              price="$899"
            />
            <DestinationCard
              image="/placeholder.svg?height=400&width=300"
              title="Santorini, Greece"
              description="Stunning white buildings and breathtaking ocean views."
              price="$1,299"
            />
            <DestinationCard
              image="/placeholder.svg?height=400&width=300"
              title="Kyoto, Japan"
              description="Ancient temples and beautiful cherry blossoms."
              price="$1,099"
            />
            <DestinationCard
              image="/placeholder.svg?height=400&width=300"
              title="Machu Picchu, Peru"
              description="Ancient Incan citadel set against a mountain backdrop."
              price="$1,499"
            />
            <DestinationCard
              image="/placeholder.svg?height=400&width=300"
              title="Serengeti, Tanzania"
              description="Witness the great migration and abundant wildlife."
              price="$2,199"
            />
            <DestinationCard
              image="/placeholder.svg?height=400&width=300"
              title="Amalfi Coast, Italy"
              description="Dramatic coastline with colorful cliffside villages."
              price="$1,399"
            />
          </div>
          <div className="flex justify-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/destinations">View All Destinations</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Popular Packages */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Featured Packages</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Curated travel packages for unforgettable experiences.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            <PackageCard
              image="/placeholder.svg?height=400&width=300"
              title="European Adventure"
              description="14 days exploring the best of Europe including Paris, Rome, and Barcelona."
              price="$2,899"
              rating={4.8}
              eco={true}
            />
            <PackageCard
              image="/placeholder.svg?height=400&width=300"
              title="Southeast Asia Explorer"
              description="10 days discovering Thailand, Vietnam, and Cambodia."
              price="$1,799"
              rating={4.7}
              eco={true}
            />
            <PackageCard
              image="/placeholder.svg?height=400&width=300"
              title="African Safari"
              description="7 days wildlife safari in Kenya and Tanzania."
              price="$3,299"
              rating={4.9}
              eco={true}
            />
          </div>
          <div className="flex justify-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/packages">View All Packages</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What Our Travelers Say</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Hear from travelers who have experienced our services.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            <TestimonialCard
              name="Sarah Johnson"
              location="New York, USA"
              quote="Tripsathi made planning my family vacation so easy! The offline maps were a lifesaver when we lost signal in the mountains."
              avatar="/placeholder.svg?height=100&width=100"
              rating={5}
            />
            <TestimonialCard
              name="David Chen"
              location="Sydney, Australia"
              quote="I loved the sustainable travel options. Found an eco-friendly resort I wouldn't have discovered otherwise."
              avatar="/placeholder.svg?height=100&width=100"
              rating={4}
            />
            <TestimonialCard
              name="Maria Garcia"
              location="Madrid, Spain"
              quote="The real-time notifications saved our trip when our flight was delayed. We were able to adjust our plans immediately."
              avatar="/placeholder.svg?height=100&width=100"
              rating={5}
            />
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter />
    </div>
  )
}
