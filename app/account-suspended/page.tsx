import React from "react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Account Suspended - Payment Required",
  description: "Your account has been suspended. Complete payment to restore access or contact support.",
}

export default function AccountSuspendedPage() {
  return (
    <section className="min-h-screen flex items-center justify-center section-padding bg-gradient-to-b from-gray-900 to-black">
      <div className="container-custom text-center">
        <h1 className="text-5xl md:text-7xl font-bold font-playfair mb-6">
          Account
          <span className="gradient-text block leading-tight">Suspended</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          It looks like your account is currently suspended due to an outstanding payment or entitlement issue.
          Complete your payment to restore full access to private content and admin features. If you believe
          this is a mistake, please contact support and include your account email so we can help resolve it
          quickly.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="mailto:pavkiptoo@gmail.com?subject=Account%20Suspension%20Help"
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full transition-all duration-300"
          >
            Proceed to Payment
          </Link>

          <a
            href="mailto:pavkiptoo@gmail.com?subject=Account%20Suspension%20Help"
            className="inline-flex items-center px-8 py-3 border border-white/30 text-white rounded-full hover:bg-white/10 transition-all duration-300"
          >
            Contact Support
          </a>
        </div>
      </div>
    </section>
  )
}
