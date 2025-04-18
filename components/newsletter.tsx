import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Newsletter() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-[#FF5722]/5">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Stay Updated</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Subscribe to our newsletter for travel tips, exclusive deals, and destination inspiration.
            </p>
          </div>
          <div className="w-full max-w-md space-y-2">
            <form className="flex space-x-2">
              <Input className="max-w-lg flex-1" placeholder="Enter your email" type="email" required />
              <Button type="submit" className="bg-[#FF5722] hover:bg-[#FF5722]/90">
                Subscribe
              </Button>
            </form>
            <p className="text-xs text-gray-500">By subscribing, you agree to our terms and privacy policy.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
