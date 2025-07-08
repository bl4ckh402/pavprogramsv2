"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Mail, Calendar, Award } from "lucide-react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [particles, setParticles] = useState<
    Array<{
      left: string;
      top: string;
      animationDelay: string;
      animationDuration: string;
    }>
  >([]);

  useEffect(() => {
    setIsClient(true);

    // Generate particles
    const newParticles = Array.from({ length: 20 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 3}s`,
      animationDuration: `${2 + Math.random() * 3}s`,
    }));

    setParticles(newParticles);
  }, []);

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
        }
      );

      gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 70%",
          },
        }
      );

      gsap.fromTo(
        ".stat-card",
        { opacity: 0, y: 50, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 70%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="bg-gradient-to-b from-gray-900/50 to-black flex justify-center items-center"
    >
      <div className="container-custom">
        <h2
          ref={titleRef}
          className="text-4xl md:text-6xl font-bold text-center mb-20 font-playfair"
        >
          About <span className="gradient-text">Kimutai</span>
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-center w-full mb-20">
          <div ref={contentRef} className="flex flex-1 justify-center flex-col space-y-6">
            <h3 className="text-3xl font-bold mb-8 font-playfair gradient-text">
              DeFi Analyst & Blockchain Developer from Nairobi
            </h3>

            <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
              <p>
                I'm a passionate DeFi analyst and blockchain developer with a
                proven track record of optimizing trading strategies across 7+
                blockchains. Based in Nairobi, Kenya, I specialize in distilling
                complex blockchain data into actionable market insights.
              </p>

              <p>
                My expertise spans on-chain analysis, tokenomics evaluation, and
                protocol assessment across Ethereum, Base, Solana, and more.
                I've successfully delivered 30+ high-quality DApps for global
                clients while maintaining a 100% success rate in deployments.
              </p>

              <p>
                Beyond development, I'm passionate about education and community
                building. I've taught 41+ beginners blockchain development and
                DeFi analysis, and regularly share crypto market insights on
                Twitter to build thought leadership in the space.
              </p>

              <p>
                When I'm not analyzing markets or building DApps, you'll find me
                at blockchain hackathons, connecting with founders, and staying
                ahead of emerging trends in the rapidly evolving DeFi landscape.
              </p>
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin className="h-5 w-5 text-purple-400" />
                <span>Nairobi, Kenya</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Mail className="h-5 w-5 text-purple-400" />
                <span>pavkiptoo@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Calendar className="h-5 w-5 text-purple-400" />
                <span>Available for new opportunities</span>
              </div>
            </div>
          </div>

          <div className="flex relative flex-1 justify-center items-center">
            <Image
              src={"/Pav.jpg"}
              alt="Kimutai"
              width={300}
              height={300}
              className="rounded-full shadow-lg z-10"
            />
          </div>
        </div>

        <div
          ref={statsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {[
            {
              number: "3+",
              label: "Years Experience",
              description: "In blockchain development",
              color: "from-purple-500 to-violet-600",
            },
            {
              number: "7+",
              label: "Blockchains",
              description: "Analyzed and optimized",
              color: "from-blue-500 to-cyan-600",
            },
            {
              number: "41+",
              label: "Students Taught",
              description: "Blockchain fundamentals",
              color: "from-green-500 to-emerald-600",
            },
            {
              number: "30+",
              label: "DApps Built",
              description: "For global clients",
              color: "from-pink-500 to-rose-600",
            },
          ].map((stat, index) => (
            <Card
              key={index}
              className="stat-card bg-gray-900/80 backdrop-blur-xl border-gray-700/50 hover:glow-effect transition-all duration-500 text-center hover:border-purple-500/50"
            >
              <CardContent className="p-6 bg-gray-900/30">
                <div
                  className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-3`}
                >
                  {stat.number}
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  {stat.label}
                </h4>
                <p className="text-gray-400 text-sm">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
