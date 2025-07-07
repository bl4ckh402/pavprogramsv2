"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, TrendingUp, Code, Users, Award } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)

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
        ".experience-card",
        { opacity: 0, x: -100, scale: 0.8 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.3,
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 70%",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const experiences = [
    {
      company: "EQUATOR CAPITAL (EQAM)",
      role: "DeFi Analyst / Blockchain Developer",
      period: "January 2023 – Present",
      location: "Remote",
      type: "Full-time",
      achievements: [
        "Analyzed and optimized trading strategies across 7 blockchains, tracking PnL to identify profitable trends",
        "Published crypto market insights on Twitter every 6 hours, building thought leadership",
        "Developed Dune Analytics dashboards for DeFi protocol performance analysis",
        "Streamlined trading with custom Telegram PnL bots, reducing errors by 100%",
        "Integrated AI agents to enhance support for 9 traders and 4 researchers",
        "Identified undervalued opportunities through bot-driven data analysis",
      ],
      skills: ["DeFi Analysis", "Trading Bots", "Dune Analytics", "AI Integration", "Multi-chain Analysis"],
      icon: TrendingUp,
      color: "from-green-500 to-emerald-600",
    },
    {
      company: "2NGENI LABS",
      role: "Blockchain Developer",
      period: "August 2023 – December 2023",
      location: "Remote",
      type: "Contract",
      achievements: [
        "Built smart contracts and DApps on Ethereum, Base, and Solana",
        "Partnered with team to produce high-quality DApps for 30+ global clients",
        "Diagnosed and fixed on-chain bugs ensuring robust DApp performance",
        "Utilized Chainlink oracles for off-chain data integration",
        "Coached 4 junior developers, accelerating onboarding by 30%",
        "Attended blockchain hackathons and connected with industry founders",
      ],
      skills: ["Smart Contracts", "DApp Development", "Chainlink", "Team Leadership", "Debugging"],
      icon: Code,
      color: "from-blue-500 to-cyan-600",
    },
    {
      company: "CODE3 CAMP",
      role: "Blockchain/DeFi Tutor",
      period: "March 2023 – August 2023",
      location: "Remote",
      type: "Part-time",
      achievements: [
        "Introduced 41 beginners to blockchain development and DeFi analysis",
        "Taught troubleshooting of on-chain issues and DeFi protocols like Uniswap and AAVE",
        "Supported learners in mastering DeFi and blockchain skills",
        "Built comprehensive curriculum for blockchain education",
        "Fostered practical skills development in emerging technologies",
      ],
      skills: ["Education", "DeFi Protocols", "Mentoring", "Curriculum Development", "Technical Training"],
      icon: Users,
      color: "from-purple-500 to-violet-600",
    },
    {
      company: "NILE CAPITAL",
      role: "Junior Blockchain Developer",
      period: "February 2022 – March 2023",
      location: "Remote",
      type: "Full-time",
      achievements: [
        "Programmed smart contracts on BSC, Ethereum, and Solana",
        "Deployed tokens and meme coins across multiple blockchains",
        "Investigated and resolved deployment issues ensuring 100% successful launches",
        "Developed bots for automated trading and on-chain monitoring",
        "Researched yield farming, staking, and bridging protocols",
      ],
      skills: ["Solidity", "Multi-chain Development", "Token Deployment", "Bot Development", "Protocol Research"],
      icon: Award,
      color: "from-orange-500 to-red-600",
    },
  ]

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="section-padding bg-gradient-to-b from-black via-gray-900 to-black"
    >
      <div className="container-custom">
        <h2 ref={titleRef} className="text-4xl md:text-6xl font-bold text-center mb-20 font-playfair">
          Professional <span className="gradient-text">Journey</span>
        </h2>

        <div ref={timelineRef} className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-pink-500 to-purple-500 hidden md:block" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={index} className="experience-card relative">
                {/* Timeline dot */}
                <div className="absolute left-6 w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full hidden md:block glow-effect" />

                <Card className="bg-gray-900/80 backdrop-blur-xl border-gray-700/50 hover:glow-effect transition-all duration-500 md:ml-20 hover:border-purple-500/50">
                  <CardContent className="p-8 bg-gray-900/30">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                      <div className="flex items-start space-x-4 mb-4 lg:mb-0">
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${exp.color} glow-effect`}>
                          <exp.icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold font-playfair text-white mb-2">{exp.role}</h3>
                          <h4 className="text-xl text-purple-300 mb-2">{exp.company}</h4>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {exp.period}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {exp.location}
                            </div>
                            <Badge variant="secondary" className="bg-purple-600/20 text-purple-300">
                              {exp.type}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h5 className="text-lg font-semibold mb-4 text-white">Key Achievements:</h5>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start space-x-3 text-gray-300">
                            <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mt-2 flex-shrink-0" />
                            <span className="leading-relaxed">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h5 className="text-lg font-semibold mb-3 text-white">Technologies & Skills:</h5>
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill) => (
                          <Badge
                            key={skill}
                            variant="secondary"
                            className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-purple-300 border-purple-500/30 hover:glow-effect transition-all duration-300"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-center mb-12 font-playfair">
            <span className="gradient-text">Education</span>
          </h3>
          <Card className="bg-gray-900/80 backdrop-blur-xl border-gray-700/50 max-w-4xl mx-auto hover:glow-effect transition-all duration-500 hover:border-purple-500/50">
            <CardContent className="p-8 bg-gray-900/30">
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-600 glow-effect">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold font-playfair text-white mb-2">BSc Computer Science</h4>
                  <p className="text-xl text-purple-300 mb-4">Catholic University of Eastern Africa, Nairobi, Kenya</p>
                  <p className="text-gray-300 leading-relaxed">
                    Developed foundational skills in software engineering, data analysis, and programming languages
                    including C, C++, R, PHP, and SQL.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Awards Section */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-center mb-12 font-playfair">
            Awards & <span className="gradient-text">Recognition</span>
          </h3>
          <Card className="bg-gray-900/80 backdrop-blur-xl border-gray-700/50 max-w-4xl mx-auto hover:glow-effect transition-all duration-500 hover:border-purple-500/50">
            <CardContent className="p-8 bg-gray-900/30">
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-600 glow-effect">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold font-playfair text-white mb-2">Cypherium Kenya Hackathon Winner</h4>
                  <p className="text-gray-300 leading-relaxed">
                    Won the Cypherium hackathon in Kenya by developing an innovative solution on the Cypherium
                    blockchain, demonstrating expertise in emerging blockchain technologies and product development.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
