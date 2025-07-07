import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, Home } from "lucide-react"
import Link from "next/link"

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20" />

      <Card className="bg-gray-900/80 backdrop-blur-xl border-gray-700/50 glow-effect max-w-md relative z-10">
        <CardContent className="p-12 text-center">
          <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="h-10 w-10 text-red-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-gray-400 mb-8">
            You don't have the necessary permissions to access this area. Please contact an administrator if you believe
            this is an error.
          </p>
          <Link href="/">
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
              <Home className="h-4 w-4 mr-2" />
              Go Home
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
