import type { ReactNode } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader className="flex flex-col items-center pb-2">
        {icon}
        <h3 className="text-xl font-bold mt-4">{title}</h3>
      </CardHeader>
      <CardContent className="text-center text-gray-500">
        <p>{description}</p>
      </CardContent>
    </Card>
  )
}
