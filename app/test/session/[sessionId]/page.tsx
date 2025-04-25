"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"

type Question = {
  id: number
  question_number: number
  question_text: string
  options: string[]
}

type TestSession = {
  userName: string
  questions: Question[]
  currentQuestionIndex: number
}

export default function TestSessionPage({ params }: { params: { sessionId: string } }) {
  const [session, setSession] = useState<TestSession | null>(null)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  // Загружаем данные сессии
  useEffect(() => {
    async function fetchSessionData() {
      try {
        const response = await fetch(`/api/test/session/${params.sessionId}`)

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Сессия не найдена или истекла")
          }
          throw new Error("Ошибка при загрузке данных сессии")
        }

        const sessionData = await response.json()
        setSession(sessionData)
      } catch (err: any) {
        console.error("Error fetching session:", err)
        setError(err.message || "Ошибка при загрузке теста")
      } finally {
        setIsLoading(false)
      }
    }

    fetchSessionData()
  }, [params.sessionId])

  const handleNextQuestion = async () => {
    if (!selectedOption || !session) return

    setIsSubmitting(true)

    try {
      const currentQuestion = session.questions[session.currentQuestionIndex]

      // Отправляем ответ
      const response = await fetch(`/api/test/answer/${params.sessionId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          questionId: currentQuestion.id,
          selectedOption,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Ошибка при сохранении ответа")
      }

      const { nextQuestionIndex, completed } = await response.json()

      if (completed) {
        // Если тест завершен, перенаправляем на страницу завершения
        router.push(`/test/complete?name=${encodeURIComponent(session.userName)}`)
      } else {
        // Обновляем индекс текущего вопроса
        setSession({
          ...session,
          currentQuestionIndex: nextQuestionIndex,
        })
        setSelectedOption(null)
      }
    } catch (err: any) {
      console.error("Error submitting answer:", err)
      setError(err.message || "Ошибка при сохранении ответа")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertDescription>{error || "Не удалось загрузить данные тестирования"}</AlertDescription>
        </Alert>
      </div>
    )
  }

  const currentQuestion = session.questions[session.currentQuestionIndex]

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary text-primary-foreground py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">Тестирование</h1>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm text-muted-foreground">
                Вопрос {session.currentQuestionIndex + 1} из {session.questions.length}
              </div>
              <div className="text-sm font-medium">{session.userName}</div>
            </div>
            <CardTitle>{currentQuestion.question_text}</CardTitle>
            <CardDescription>Выберите один вариант ответа</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup value={selectedOption || ""} onValueChange={setSelectedOption} className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 border rounded-md p-3 hover:bg-muted/50 transition-colors"
                >
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-sm text-muted-foreground">
              {session.currentQuestionIndex + 1} из {session.questions.length}
            </div>
            <Button onClick={handleNextQuestion} disabled={!selectedOption || isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Сохранение...
                </>
              ) : session.currentQuestionIndex === session.questions.length - 1 ? (
                "Завершить тест"
              ) : (
                "Следующий вопрос"
              )}
            </Button>
          </CardFooter>
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
