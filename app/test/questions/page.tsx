"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"
import type { Question, UserAnswer } from "@/lib/google-sheets"

export default function TestQuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([])
  const router = useRouter()
  const searchParams = useSearchParams()
  const userName = searchParams.get("name") || "Пользователь"
  const token = searchParams.get("token")

  useEffect(() => {
    async function fetchQuestions() {
      if (!token) {
        setError("Отсутствует токен доступа")
        setIsLoading(false)
        return
      }

      try {
        const response = await fetch(`/api/questions?token=${token}`)

        if (!response.ok) {
          throw new Error("Ошибка при загрузке вопросов")
        }

        const data = await response.json()

        if (!data.questions || data.questions.length === 0) {
          throw new Error("Вопросы не найдены")
        }

        setQuestions(data.questions)
      } catch (error: any) {
        console.error("Error fetching questions:", error)
        setError(error.message || "Ошибка при загрузке вопросов")
      } finally {
        setIsLoading(false)
      }
    }

    fetchQuestions()
  }, [token])

  const handleNextQuestion = () => {
    if (!selectedOption) return

    // Сохраняем ответ пользователя
    const currentQuestion = questions[currentQuestionIndex]
    const answer: UserAnswer = {
      questionNumber: currentQuestion.number,
      selectedOption,
    }

    setUserAnswers([...userAnswers, answer])

    // Если это был последний вопрос, завершаем тест
    if (currentQuestionIndex === questions.length - 1) {
      handleCompleteTest([...userAnswers, answer])
    } else {
      // Переходим к следующему вопросу
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedOption(null)
    }
  }

  const handleCompleteTest = async (answers: UserAnswer[]) => {
    setIsSubmitting(true)

    try {
      // Отправляем ответы на сервер
      const response = await fetch("/api/answers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName,
          answers,
          token,
        }),
      })

      if (!response.ok) {
        throw new Error("Ошибка при сохранении ответов")
      }

      // Перенаправляем на страницу завершения
      router.push(`/test/complete?name=${encodeURIComponent(userName)}`)
    } catch (error: any) {
      console.error("Error completing test:", error)
      setError(error.message || "Ошибка при завершении тестирования")
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

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]

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
                Вопрос {currentQuestionIndex + 1} из {questions.length}
              </div>
              <div className="text-sm font-medium">{userName}</div>
            </div>
            <CardTitle>{currentQuestion.text}</CardTitle>
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
              {currentQuestionIndex + 1} из {questions.length}
            </div>
            <Button onClick={handleNextQuestion} disabled={!selectedOption || isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Сохранение...
                </>
              ) : currentQuestionIndex === questions.length - 1 ? (
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
