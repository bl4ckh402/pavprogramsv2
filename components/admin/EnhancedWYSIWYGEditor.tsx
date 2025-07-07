"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import {
  Bold,
  Italic,
  Code,
  Link,
  ImageIcon,
  List,
  ListOrdered,
  Quote,
  Heading1,
  Heading2,
  Heading3,
  Eye,
  Edit,
  Type,
  Upload,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Underline,
  Strikethrough,
} from "lucide-react"

interface EnhancedWYSIWYGEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export default function EnhancedWYSIWYGEditor({ value, onChange, placeholder }: EnhancedWYSIWYGEditorProps) {
  const [previewMode, setPreviewMode] = useState(false)
  const [previewContent, setPreviewContent] = useState("")
  const [showImageDialog, setShowImageDialog] = useState(false)
  const [imageUrl, setImageUrl] = useState("")
  const [imageAlt, setImageAlt] = useState("")
  const [imageCaption, setImageCaption] = useState("")
  const [imageAlignment, setImageAlignment] = useState("center")
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (previewMode) {
      const htmlContent = convertMarkdownToHTML(value)
      setPreviewContent(htmlContent)
    }
  }, [value, previewMode])

  const convertMarkdownToHTML = (markdown: string) => {
    return (
      markdown
        // Headers
        .replace(/^### (.*$)/gim, "<h3 class='text-2xl font-bold mb-4 mt-6'>$1</h3>")
        .replace(/^## (.*$)/gim, "<h2 class='text-3xl font-bold mb-6 mt-8'>$1</h2>")
        .replace(/^# (.*$)/gim, "<h1 class='text-4xl font-bold mb-8 mt-10'>$1</h1>")

        // Text formatting
        .replace(/\*\*\*(.*?)\*\*\*/gim, "<strong><em>$1</em></strong>")
        .replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>")
        .replace(/\*(.*?)\*/gim, "<em>$1</em>")
        .replace(/__(.*?)__/gim, "<u>$1</u>")
        .replace(/~~(.*?)~~/gim, "<del>$1</del>")

        // Code
        .replace(
          /```([\s\S]*?)```/gim,
          "<pre class='bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4'><code>$1</code></pre>",
        )
        .replace(/`(.*?)`/gim, "<code class='bg-gray-800 px-2 py-1 rounded text-sm'>$1</code>")

        // Links
        .replace(
          /\[([^\]]+)\]$$([^)]+)$$/gim,
          '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-purple-400 hover:text-purple-300 underline">$1</a>',
        )

        // Images with alignment and captions
        .replace(
          /!\[([^\]]*)\]$$([^)]+)$$(?:\{([^}]+)\})?(?:\[([^\]]+)\])?/gim,
          (match, alt, src, alignment, caption) => {
            const alignClass =
              alignment === "left" ? "float-left mr-4" : alignment === "right" ? "float-right ml-4" : "mx-auto block"
            const captionHtml = caption
              ? `<figcaption class="text-sm text-gray-400 mt-2 text-center italic">${caption}</figcaption>`
              : ""
            return `<figure class="my-6 ${alignment === "center" ? "text-center" : ""}">
                  <img src="${src}" alt="${alt}" class="rounded-lg max-w-full h-auto ${alignClass}" />
                  ${captionHtml}
                </figure>`
          },
        )

        // Lists
        .replace(/^\* (.*$)/gim, "<li class='mb-1'>$1</li>")
        .replace(/^(\d+)\. (.*$)/gim, "<li class='mb-1'>$1. $2</li>")

        // Blockquotes
        .replace(
          /^> (.*$)/gim,
          "<blockquote class='border-l-4 border-purple-500 pl-4 italic text-gray-300 my-4'>$1</blockquote>",
        )

        // Line breaks
        .replace(/\n/gim, "<br />")
    )
  }

  const insertText = (before: string, after = "", placeholder = "") => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)
    const textToInsert = selectedText || placeholder
    const newText = value.substring(0, start) + before + textToInsert + after + value.substring(end)

    onChange(newText)

    setTimeout(() => {
      textarea.focus()
      const newCursorPos = start + before.length + textToInsert.length
      textarea.setSelectionRange(newCursorPos, newCursorPos)
    }, 0)
  }

  const insertAtCursor = (text: string) => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const newText = value.substring(0, start) + text + value.substring(start)
    onChange(newText)

    setTimeout(() => {
      textarea.focus()
      const newCursorPos = start + text.length
      textarea.setSelectionRange(newCursorPos, newCursorPos)
    }, 0)
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      setImageUrl(reader.result as string)
      setShowImageDialog(true)
    }
    reader.readAsDataURL(file)
  }

  const insertImage = () => {
    if (!imageUrl) return

    const alignmentTag = imageAlignment !== "center" ? `{${imageAlignment}}` : ""
    const captionTag = imageCaption ? `[${imageCaption}]` : ""
    const imageMarkdown = `![${imageAlt}](${imageUrl})${alignmentTag}${captionTag}\n\n`

    insertAtCursor(imageMarkdown)

    // Reset dialog
    setShowImageDialog(false)
    setImageUrl("")
    setImageAlt("")
    setImageCaption("")
    setImageAlignment("center")
  }

  const toolbarButtons = [
    {
      icon: Heading1,
      label: "Heading 1",
      action: () => insertText("# ", "", "Heading 1"),
    },
    {
      icon: Heading2,
      label: "Heading 2",
      action: () => insertText("## ", "", "Heading 2"),
    },
    {
      icon: Heading3,
      label: "Heading 3",
      action: () => insertText("### ", "", "Heading 3"),
    },
    {
      icon: Bold,
      label: "Bold",
      action: () => insertText("**", "**", "bold text"),
    },
    {
      icon: Italic,
      label: "Italic",
      action: () => insertText("*", "*", "italic text"),
    },
    {
      icon: Underline,
      label: "Underline",
      action: () => insertText("__", "__", "underlined text"),
    },
    {
      icon: Strikethrough,
      label: "Strikethrough",
      action: () => insertText("~~", "~~", "strikethrough text"),
    },
    {
      icon: Code,
      label: "Inline Code",
      action: () => insertText("`", "`", "code"),
    },
    {
      icon: Quote,
      label: "Quote",
      action: () => insertText("> ", "", "quote"),
    },
    {
      icon: List,
      label: "Bullet List",
      action: () => insertText("* ", "", "list item"),
    },
    {
      icon: ListOrdered,
      label: "Numbered List",
      action: () => insertText("1. ", "", "list item"),
    },
    {
      icon: Link,
      label: "Link",
      action: () => insertText("[", "](url)", "link text"),
    },
    {
      icon: ImageIcon,
      label: "Insert Image",
      action: () => setShowImageDialog(true),
    },
    {
      icon: Upload,
      label: "Upload Image",
      action: () => fileInputRef.current?.click(),
    },
    {
      icon: Type,
      label: "Code Block",
      action: () => insertAtCursor("\n```javascript\n// Your code here\n```\n"),
    },
  ]

  return (
    <div className="space-y-4">
      {/* Hidden file input */}
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />

      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 flex-wrap">
          {toolbarButtons.map((button, index) => (
            <Button
              key={index}
              type="button"
              variant="outline"
              size="sm"
              onClick={button.action}
              className="border-gray-600/50 text-gray-300 hover:bg-gray-800/50 hover:text-white p-2 bg-transparent"
              title={button.label}
            >
              <button.icon className="h-4 w-4" />
            </Button>
          ))}
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setPreviewMode(!previewMode)}
          className="border-gray-600/50 text-gray-300 hover:bg-gray-800/50 hover:text-white"
        >
          {previewMode ? <Edit className="h-4 w-4 mr-1" /> : <Eye className="h-4 w-4 mr-1" />}
          {previewMode ? "Edit" : "Preview"}
        </Button>
      </div>

      {/* Editor/Preview */}
      {previewMode ? (
        <div className="bg-gray-800/50 border border-gray-600/50 rounded-lg p-6 min-h-[500px] text-white">
          <div className="prose prose-invert prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: previewContent }} />
          </div>
        </div>
      ) : (
        <Textarea
          ref={textareaRef}
          placeholder={placeholder || "Write your content here... (Markdown supported)"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={25}
          className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-purple-500 font-mono text-sm leading-relaxed resize-none"
        />
      )}

      {/* Image Dialog */}
      {showImageDialog && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <Card className="bg-gray-900/95 backdrop-blur-xl border-gray-700/50 w-full max-w-md">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-white mb-4">Insert Image</h3>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Image URL</label>
                  <Input
                    placeholder="https://example.com/image.jpg"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Alt Text</label>
                  <Input
                    placeholder="Describe the image"
                    value={imageAlt}
                    onChange={(e) => setImageAlt(e.target.value)}
                    className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Caption (optional)</label>
                  <Input
                    placeholder="Image caption"
                    value={imageCaption}
                    onChange={(e) => setImageCaption(e.target.value)}
                    className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Alignment</label>
                  <div className="flex space-x-2">
                    {[
                      { value: "left", icon: AlignLeft, label: "Left" },
                      { value: "center", icon: AlignCenter, label: "Center" },
                      { value: "right", icon: AlignRight, label: "Right" },
                    ].map((align) => (
                      <Button
                        key={align.value}
                        type="button"
                        variant={imageAlignment === align.value ? "default" : "outline"}
                        size="sm"
                        onClick={() => setImageAlignment(align.value)}
                        className={
                          imageAlignment === align.value
                            ? "bg-purple-600 text-white"
                            : "border-gray-600/50 text-gray-300 hover:bg-gray-800/50"
                        }
                      >
                        <align.icon className="h-4 w-4 mr-1" />
                        {align.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <Button
                  onClick={insertImage}
                  disabled={!imageUrl || !imageAlt}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white flex-1"
                >
                  Insert Image
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowImageDialog(false)}
                  className="border-gray-600/50 text-gray-300 hover:bg-gray-800/50"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Word Count and Reading Time */}
      <div className="flex justify-between text-sm text-gray-400">
        <span>{value.split(" ").filter((word) => word.length > 0).length} words</span>
        <span>{Math.ceil(value.split(" ").filter((word) => word.length > 0).length / 200)} min read</span>
      </div>

      {/* Markdown Guide */}
      <details className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-4">
        <summary className="text-white font-medium cursor-pointer">Markdown Guide</summary>
        <div className="mt-4 text-sm text-gray-400 space-y-2">
          <div>
            <code># Heading 1</code> - Large heading
          </div>
          <div>
            <code>## Heading 2</code> - Medium heading
          </div>
          <div>
            <code>**bold**</code> - Bold text
          </div>
          <div>
            <code>*italic*</code> - Italic text
          </div>
          <div>
            <code>__underline__</code> - Underlined text
          </div>
          <div>
            <code>~~strikethrough~~</code> - Strikethrough text
          </div>
          <div>
            <code>`code`</code> - Inline code
          </div>
          <div>
            <code>![alt](url){"{alignment}"}[caption]</code> - Image with alignment and caption
          </div>
          <div>
            <code>[link text](url)</code> - Link
          </div>
          <div>
            <code>* item</code> - Bullet list
          </div>
          <div>
            <code>1. item</code> - Numbered list
          </div>
          <div>
            <code>&gt; quote</code> - Blockquote
          </div>
        </div>
      </details>
    </div>
  )
}
