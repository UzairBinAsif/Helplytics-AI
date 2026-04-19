"use client"

import { useState, useRef, useEffect } from "react"
import { Bot, User, Send, Loader2, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

type Message = {
  role: 'user' | 'assistant'
  content: string
}

export function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hi there! I'm HelpHub's AI assistant. How can I help you today?" }
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, loading])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    const userMessage: Message = { role: 'user', content: input.trim() }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput("")
    setLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage.content,
          history: messages,
        }),
      })

      const data = await response.json()
      
      if (!response.ok) throw new Error(data.error || 'Failed to fetch')

      setMessages([...newMessages, { role: 'assistant', content: data.text }])
    } catch (error) {
      console.error(error)
      setMessages([...newMessages, { role: 'assistant', content: "Sorry, I encountered an error while trying to respond." }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] h-[600px] overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-3 bg-[#FDFCF8]">
        <div className="w-10 h-10 rounded-full bg-[#e6f4ea] flex items-center justify-center shrink-0">
          <Bot className="w-5 h-5 text-[#115e59]" />
        </div>
        <div>
          <h2 className="font-bold text-[#1a2f24] text-lg">HelpHub AI Agent</h2>
          <p className="text-sm text-[#4b5563]">Ask me anything about HelpHub, requests, or get general advice.</p>
        </div>
      </div>
      
      <ScrollArea className="flex-1 p-6">
        <div className="flex flex-col gap-6 pb-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-4 text-sm ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-[#e6f4ea] flex items-center justify-center shrink-0 mt-1">
                  <Bot className="w-4 h-4 text-[#115e59]" />
                </div>
              )}
              
              <div
                className={`p-4 rounded-2xl max-w-[80%] leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-[#10B981] text-white rounded-tr-sm shadow-sm'
                    : 'bg-[#FDFCF8] border border-gray-100 text-[#4b5563] rounded-tl-sm shadow-sm'
                }`}
              >
                {msg.content}
              </div>

              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-[#1a2f24] flex items-center justify-center shrink-0 mt-1">
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="flex gap-4 text-sm justify-start">
              <div className="w-8 h-8 rounded-full bg-[#e6f4ea] flex items-center justify-center shrink-0 mt-1">
                <Bot className="w-4 h-4 text-[#115e59]" />
              </div>
              <div className="p-4 rounded-2xl bg-[#FDFCF8] border border-gray-100 text-[#4b5563] rounded-tl-sm flex items-center gap-2 shadow-sm">
                <Loader2 className="w-4 h-4 animate-spin text-[#10B981]" />
                <span>Thinking...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-gray-100 bg-white">
        <form onSubmit={onSubmit} className="flex gap-3">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message to AI..."
            className="rounded-full bg-[#FDFCF8] border-gray-200 px-6 h-12 focus-visible:ring-[#10B981]"
            disabled={loading}
          />
          <Button type="submit" disabled={!input.trim() || loading} className="rounded-full w-12 h-12 shrink-0 bg-[#10B981] hover:bg-[#059669] shadow-sm">
            <Send className="w-5 h-5 text-white" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </div>
    </div>
  )
}
