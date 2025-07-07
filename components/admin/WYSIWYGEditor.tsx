"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
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
} from "lucide-react"

interface WYSIWYGEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export default function WYSIWYGEditor({ value, onChange, placeholder }: WYSIWYGEditorProps) {
  const [previewMode, setPreviewMode] = useState(false)
  const [previewContent, setPreviewContent] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (previewMode) {
      // Convert markdown to HTML for preview
      const htmlContent = convertMarkdownToHTML(value)
      setPreviewContent(htmlContent)
    }
  }, [value, previewMode])

  const convertMarkdownToHTML = (markdown: string) => {
    return markdown
      .replace(/^### (.*$)/gim, "<h3>$1</h3>")
      .replace(/^## (.*$)/gim, "<h2>$1</h2>")
      .replace(/^# (.*$)/gim, "<h1>$1</h1>")
      .replace(/\*\*(.*)\*\*/gim, "<strong>$1</strong>")
      .replace(/\*(.*)\*/gim, "<em>$1</em>")
      .replace(/`(.*)`/gim, "<code>$1</code>")
      .replace(/```([\s\S]*?)```/gim, "<pre><code>$1</code></pre>")
      .replace(/\[([^\]]+)\]$$([^)]+)$$/gim, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      .replace(/!\[([^\]]*)\]$$([^)]+)$$/gim, '<img src="$2" alt="$1" />')
      .replace(/^\* (.*$)/gim, "<li>$1</li>")
      .replace(/^(\d+)\. (.*$)/gim, "<li>$1. $2</li>")
      .replace(/^> (.*$)/gim, "<blockquote>$1</blockquote>")
      .replace(/\n/gim, "<br />")
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

    // Set cursor position
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
      label: "Image",
      action: () => insertText("![", "](image-url)", "alt text"),
    },
    {
      icon: Type,
      label: "Code Block",
      action: () => insertAtCursor("\n```javascript\n// Your code here\n```\n"),
    },
  ]

  return (
    <div className="space-y-4">
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
        <div className="bg-gray-800/50 border border-gray-600/50 rounded-lg p-6 min-h-[400px] text-white">
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
          rows={20}
          className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-purple-500 font-mono text-sm leading-relaxed resize-none"
        />
      )}

      {/* Word Count */}
      <div className="flex justify-between text-sm text-gray-400">
        <span>{value.split(" ").filter((word) => word.length > 0).length} words</span>
        <span>{Math.ceil(value.split(" ").filter((word) => word.length > 0).length / 200)} min read</span>
      </div>
    </div>
  )
}
