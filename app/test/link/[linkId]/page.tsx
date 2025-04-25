"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"

export default function TestStartPage({ params }: { params: { linkId: string } }) {
  const [userName, setUserName] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isStarting, setIsStarting] = useState(false)
  const [isValidLink, setIsValidLink] = useState(false)
  const router = useRouter()

  // Проверяем валидность ссылки доступа
  useEffect(() => {
    async function validateLink() {
      try {
        const response = await fetch(`/api/validate-link?id=${params.linkId}`)
        const data = await response.json()

        if (!response.ok || !data.valid) {
          setError("Недействительная ссылка доступа")
          setIsValidLink(false)
        } else {
          setIsValidLink(true)
        }
      } catch (err) {
        setError("Ошибка при проверке ссылки доступа")
        setIsValidLink(false)
      } finally {
        setIsLoading(false)
      }
    }

    validateLink()
  }, [params.linkId])

  const handleStartTest = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!userName.trim()) {
      setError("Пожалуйста, введите ваше имя")
      return
    }

    setIsStarting(true)
    setError(null)

    try {
      // Создаем сессию тестирования
      const response = await fetch("/api/test/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName,
          linkId: params.linkId,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Не удалось начать тестирование")
      }

      const { sessionId } = await response.json()

      // Перенаправляем на страницу тестирования
      router.push(`/test/session/${sessionId}`)
    } catch (err: any) {
      console.error("Error starting test:", err)
      setError(err.message || "Ошибка при начале тестирования")
    } finally {
      setIsStarting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!isValidLink) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertDescription>
            {error || "Недействительная ссылка доступа. Пожалуйста, убедитесь, что вы используете правильную ссылку."}
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary text-primary-foreground py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">Веб-сервис тестирования</h1>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Начать тестирование</CardTitle>
            <CardDescription>Пожалуйста, введите ваше имя, чтобы начать тестирование</CardDescription>
          </CardHeader>
          <form onSubmit={handleStartTest}>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <div className="space-y-2">
                <Label htmlFor="user-name">Ваше имя</Label>
                <Input
                  id="user-name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Введите ваше имя"
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isStarting}>
                {isStarting ? "Загрузка..." : "Начать тестирование"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </main>

      <footer className="bg-muted py-4">
        <div className="container mx-auto px-4 text-center text-sm">
          &copy; {new Date().getFullYear()} Веб-сервис тестирования
        </div>
      </footer>
    </div>
  )
}
