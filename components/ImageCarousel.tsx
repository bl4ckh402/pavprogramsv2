"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react"

interface ProjectImage {
  id: string
  image_url: string
  alt_text: string
  caption: string
  display_order: number
  is_featured: boolean
}

interface ImageCarouselProps {
  images: ProjectImage[]
  className?: string
}

export default function ImageCarousel({ images, className = "" }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Sort images by display order
  const sortedImages = [...images].sort((a, b) => a.display_order - b.display_order)

  useEffect(() => {
    if (!isAutoPlaying || sortedImages.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sortedImages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, sortedImages.length])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + sortedImages.length) % sortedImages.length)
    setIsAutoPlaying(false)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % sortedImages.length)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  if (!sortedImages.length) {
    return (
      <Card className={`bg-gray-900/80 backdrop-blur-xl border-gray-700/50 ${className}`}>
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-gray-700 rounded-lg mx-auto mb-4 flex items-center justify-center">
            <Maximize2 className="h-8 w-8 text-gray-400" />
          </div>
          <p className="text-gray-400">No images available</p>
        </CardContent>
      </Card>
    )
  }

  const currentImage = sortedImages[currentIndex]

  return (
    <>
      <Card className={`bg-gray-900/80 backdrop-blur-xl border-gray-700/50 overflow-hidden group ${className}`}>
        <CardContent className="p-0 relative">
          {/* Main Image */}
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={currentImage.image_url || "/placeholder.svg"}
              alt={currentImage.alt_text}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Navigation Arrows */}
            {sortedImages.length > 1 && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 border-white/20 text-white hover:bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 border-white/20 text-white hover:bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}

            {/* Fullscreen Button */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsFullscreen(true)}
              className="absolute top-4 right-4 bg-black/50 border-white/20 text-white hover:bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <Maximize2 className="h-4 w-4" />
            </Button>

            {/* Image Counter */}
            {sortedImages.length > 1 && (
              <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {currentIndex + 1} / {sortedImages.length}
              </div>
            )}
          </div>

          {/* Caption */}
          {currentImage.caption && (
            <div className="p-4 bg-gray-900/50">
              <p className="text-gray-300 text-sm">{currentImage.caption}</p>
            </div>
          )}

          {/* Thumbnail Navigation */}
          {sortedImages.length > 1 && (
            <div className="p-4 bg-gray-900/30">
              <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
                {sortedImages.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => goToSlide(index)}
                    className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      index === currentIndex
                        ? "border-purple-500 ring-2 ring-purple-500/50"
                        : "border-gray-600 hover:border-gray-400"
                    }`}
                  >
                    <Image
                      src={image.image_url || "/placeholder.svg"}
                      alt={image.alt_text}
                      width={64}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="relative max-w-7xl max-h-full">
            <Image
              src={currentImage.image_url || "/placeholder.svg"}
              alt={currentImage.alt_text}
              width={1200}
              height={800}
              className="max-w-full max-h-full object-contain"
            />

            {/* Close Button */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsFullscreen(false)}
              className="absolute top-4 right-4 bg-black/50 border-white/20 text-white hover:bg-black/70"
            >
              <X className="h-4 w-4" />
            </Button>

            {/* Navigation in Fullscreen */}
            {sortedImages.length > 1 && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 border-white/20 text-white hover:bg-black/70"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 border-white/20 text-white hover:bg-black/70"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}

            {/* Caption in Fullscreen */}
            {currentImage.caption && (
              <div className="absolute bottom-4 left-4 right-4 bg-black/70 text-white p-4 rounded-lg">
                <p>{currentImage.caption}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
