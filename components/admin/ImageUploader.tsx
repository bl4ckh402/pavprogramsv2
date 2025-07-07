"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Upload, X, Star, ImageIcon, Move } from "lucide-react"
import Image from "next/image"

interface ProjectImage {
  id?: string
  image_url: string
  alt_text: string
  caption: string
  display_order: number
  is_featured: boolean
}

interface ImageUploaderProps {
  images: ProjectImage[]
  onChange: (images: ProjectImage[]) => void
  maxImages?: number
}

export default function ImageUploader({ images, onChange, maxImages = 20 }: ImageUploaderProps) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const remainingSlots = maxImages - images.length
      const filesToProcess = acceptedFiles.slice(0, remainingSlots)

      filesToProcess.forEach((file) => {
        const reader = new FileReader()
        reader.onload = () => {
          const newImage: ProjectImage = {
            image_url: reader.result as string,
            alt_text: file.name.replace(/\.[^/.]+$/, ""),
            caption: "",
            display_order: images.length,
            is_featured: images.length === 0, // First image is featured by default
          }
          onChange([...images, newImage])
        }
        reader.readAsDataURL(file)
      })
    },
    [images, onChange, maxImages],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
    },
    maxFiles: maxImages - images.length,
    disabled: images.length >= maxImages,
  })

  const updateImage = (index: number, updates: Partial<ProjectImage>) => {
    const updatedImages = images.map((img, i) => (i === index ? { ...img, ...updates } : img))
    onChange(updatedImages)
  }

  const removeImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index).map((img, i) => ({ ...img, display_order: i }))
    onChange(updatedImages)
  }

  const setFeatured = (index: number) => {
    const updatedImages = images.map((img, i) => ({
      ...img,
      is_featured: i === index,
    }))
    onChange(updatedImages)
  }

  const handleDragStart = (index: number) => {
    setDraggedIndex(index)
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    if (draggedIndex === null || draggedIndex === index) return

    const newImages = [...images]
    const draggedImage = newImages[draggedIndex]
    newImages.splice(draggedIndex, 1)
    newImages.splice(index, 0, draggedImage)

    // Update display orders
    const reorderedImages = newImages.map((img, i) => ({
      ...img,
      display_order: i,
    }))

    onChange(reorderedImages)
    setDraggedIndex(index)
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
  }

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      {images.length < maxImages && (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ${
            isDragActive
              ? "border-purple-500 bg-purple-500/10"
              : "border-gray-600/50 hover:border-purple-500/50 bg-gray-800/30"
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-white font-medium mb-2">
            {isDragActive ? "Drop images here..." : "Drag & drop images here"}
          </p>
          <p className="text-gray-400 text-sm mb-4">
            or click to select files ({images.length}/{maxImages} images)
          </p>
          <Badge variant="secondary" className="bg-purple-600/20 text-purple-300">
            Supports: JPG, PNG, GIF, WebP
          </Badge>
        </div>
      )}

      {/* Images Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <Card
              key={index}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              className={`bg-gray-900/80 backdrop-blur-xl border-gray-700/50 hover:glow-effect transition-all duration-300 cursor-move ${
                draggedIndex === index ? "opacity-50" : ""
              } ${image.is_featured ? "ring-2 ring-yellow-500" : ""}`}
            >
              <CardContent className="p-4">
                <div className="relative mb-4 group">
                  <Image
                    src={image.image_url || "/placeholder.svg"}
                    alt={image.alt_text}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover rounded-lg"
                  />

                  {/* Overlay Controls */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setFeatured(index)}
                        className={`border-white/30 ${
                          image.is_featured
                            ? "bg-yellow-500 text-black border-yellow-500"
                            : "text-white hover:bg-white/10"
                        }`}
                      >
                        <Star className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => removeImage(index)}
                        className="bg-red-600/80 hover:bg-red-600"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Featured Badge */}
                  {image.is_featured && (
                    <Badge className="absolute top-2 left-2 bg-yellow-500 text-black">
                      <Star className="h-3 w-3 mr-1" />
                      Featured
                    </Badge>
                  )}

                  {/* Order Badge */}
                  <Badge className="absolute top-2 right-2 bg-gray-900/80 text-white">
                    <Move className="h-3 w-3 mr-1" />
                    {index + 1}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <Input
                    placeholder="Alt text"
                    value={image.alt_text}
                    onChange={(e) => updateImage(index, { alt_text: e.target.value })}
                    className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 text-sm"
                  />
                  <Input
                    placeholder="Caption (optional)"
                    value={image.caption}
                    onChange={(e) => updateImage(index, { caption: e.target.value })}
                    className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 text-sm"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Instructions */}
      {images.length > 0 && (
        <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-4">
          <h4 className="text-white font-medium mb-2 flex items-center">
            <ImageIcon className="h-4 w-4 mr-2" />
            Image Management Tips
          </h4>
          <ul className="text-gray-400 text-sm space-y-1">
            <li>• Drag and drop to reorder images</li>
            <li>• Click the star to set a featured image</li>
            <li>• Featured image appears first in carousels</li>
            <li>• Add descriptive alt text for accessibility</li>
            <li>• Captions are displayed in image galleries</li>
          </ul>
        </div>
      )}
    </div>
  )
}
