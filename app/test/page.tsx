"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"

export default function TestStartPage() {
  const [userName, setUserName] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isValidating, setIsValidating] = useState(true)
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  // Проверяем токен при загрузке страницы
  useEffect(() => {
    async function validateToken() {
      if (!token) {
        setError("Отсутствует токен доступа. Пожалуйста, используйте ссылку, предоставленную администратором.")
        setIsValidating(false)
        return
      }

      try {
        // Проверяем доступность вопросов с этим токеном
        const response = await fetch(`/api/questions?token=${token}`)

        if (!response.ok) {
          if (response.status === 401) {
            setError("Недействительный токен доступа. Пожалуйста, используйте корректную ссылку.")
          } else {
            const data = await response.json()
            setError(data.error || "Ошибка при проверке доступа к тестированию")
          }
        }
      } catch (error) {
        console.error("Error validating token:", error)
        setError("Ошибка при проверке доступа к тестированию")
      } finally {
        setIsValidating(false)
      }
    }

    validateToken()
  }, [token])

  const handleStartTest = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!userName.trim()) {
      setError("Пожалуйста, введите ваше имя")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Перенаправляем на страницу тестирования с именем пользователя и токеном
      router.push(`/test/questions?name=${encodeURIComponent(userName)}&token=${token}`)
    } catch (err: any) {
      console.error("Error starting test:", err)
      setError(err.message || "Ошибка при начале тестирования")
      setIsLoading(false)
    }
  }

  if (isValidating) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
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
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Загрузка..." : "Начать тестирование"}
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
