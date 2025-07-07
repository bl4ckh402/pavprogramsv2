"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

gsap.registerPlugin(ScrollTrigger)

export default function Skills3D() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
          },
        },
      )

      gsap.fromTo(
        ".skill-category",
        { opacity: 0, y: 50, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 70%",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const skillCategories = [
    {
      title: "Blockchain Development",
      skills: ["Solidity", "Smart Contracts", "DApp Development", "Multi-chain", "Web3.js", "Ethers.js"],
      color: "from-purple-500 to-violet-600",
    },
    {
      title: "DeFi & Trading",
      skills: [
        "On-chain Analysis",
        "Trading Strategies",
        "Yield Farming",
        "Liquidity Mining",
        "DEX Integration",
        "PnL Optimization",
      ],
      color: "from-blue-500 to-cyan-600",
    },
    {
      title: "Data & Analytics",
      skills: ["Dune Analytics", "Blockchain Explorers", "Market Analysis", "Data Visualization", "SQL", "Python"],
      color: "from-green-500 to-emerald-600",
    },
    {
      title: "Automation & AI",
      skills: ["Trading Bots", "Telegram Bots", "AI Agents", "Chainlink Oracles", "API Integration", "Bot Development"],
      color: "from-pink-500 to-rose-600",
    },
    {
      title: "Blockchain Networks",
      skills: ["Ethereum", "Solana", "Base", "BSC", "Polygon", "Arbitrum", "Optimism"],
      color: "from-orange-500 to-red-600",
    },
    {
      title: "Tools & Platforms",
      skills: ["Uniswap", "AAVE", "PancakeSwap", "Bybit", "Binance", "MetaMask", "Hardhat", "Truffle"],
      color: "from-indigo-500 to-purple-600",
    },
  ]

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden"
    >
      {/* CSS-based background effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(139,92,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(236,72,153,0.1),transparent_50%)]" />
      </div>

      {/* Floating skill bubbles */}
      <div className="absolute inset-0 overflow-hidden">
        {["SOLIDITY", "DEFI", "DUNE", "BOTS", "AI", "WEB3"].map((skill, i) => (
          <div
            key={skill}
            className="absolute text-xs font-bold text-purple-400/30 animate-float"
            style={{
              left: `${20 + i * 15}%`,
              top: `${20 + i * 10}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: `${8 + i}s`,
            }}
          >
            {skill}
          </div>
        ))}
      </div>

      <div className="container-custom relative z-10">
        <h2 ref={titleRef} className="text-4xl md:text-6xl font-bold text-center mb-20 font-playfair">
          Technical <span className="gradient-text">Expertise</span>
        </h2>

        <div ref={skillsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <Card
              key={index}
              className="skill-category bg-gray-900/80 backdrop-blur-xl border-gray-700/50 hover:glow-effect transition-all duration-500 group hover:border-purple-500/50"
            >
              <CardContent className="p-6 bg-gray-900/30">
                <div className={`w-full h-2 bg-gradient-to-r ${category.color} rounded-full mb-6 glow-effect`} />
                <h3 className="text-xl font-bold mb-4 font-playfair group-hover:gradient-text transition-all duration-300">
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="bg-white/5 text-gray-300 border-white/20 hover:bg-white/10 hover:text-white transition-all duration-300"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { number: "7+", label: "Blockchains Analyzed", color: "from-purple-500 to-violet-600" },
            { number: "30+", label: "DApps Built", color: "from-blue-500 to-cyan-600" },
            { number: "41+", label: "Students Taught", color: "from-green-500 to-emerald-600" },
            { number: "100%", label: "Success Rate", color: "from-pink-500 to-rose-600" },
          ].map((stat, index) => (
            <Card
              key={index}
              className="bg-gray-900/80 backdrop-blur-xl border-gray-700/50 text-center hover:glow-effect transition-all duration-500 hover:border-purple-500/50"
            >
              <CardContent className="p-6">
                <div className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                  {stat.number}
                </div>
                <p className="text-gray-300">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
