"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Loader2, RefreshCw } from "lucide-react"

type Question = {
  id: number
  question_number: number
  question_text: string
  options: string[]
}

export default function PreviewPage() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Загрузка вопросов
  const loadQuestions = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/questions")

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Не удалось загрузить вопросы")
      }

      const data = await response.json()
      setQuestions(data.questions)
    } catch (err: any) {
      console.error("Error loading questions:", err)
      setError(err.message || "Произошла ошибка при загрузке вопросов")
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }

  // Загружаем вопросы при первой загрузке страницы
  useEffect(() => {
    loadQuestions()
  }, [])

  // Обновление вопросов
  const handleRefresh = () => {
    setIsRefreshing(true)
    loadQuestions()
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Предпросмотр вопросов</h1>
        <Button onClick={handleRefresh} disabled={isLoading || isRefreshing}>
          {isRefreshing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Обновление...
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              Обновить
            </>
          )}
        </Button>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {isLoading && !isRefreshing ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : questions.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Нет доступных вопросов</CardTitle>
            <CardDescription>Вопросы не найдены. Проверьте настройки Google Таблицы с вопросами.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <Button variant="outline" onClick={() => (window.location.href = "/admin/settings")}>
                Перейти к настройкам
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">№</TableHead>
                <TableHead>Вопрос</TableHead>
                <TableHead>Варианты ответов</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {questions.map((question) => (
                <TableRow key={question.id}>
                  <TableCell className="font-medium">{question.question_number}</TableCell>
                  <TableCell>{question.question_text}</TableCell>
                  <TableCell>
                    <ol className="list-decimal list-inside">
                      {question.options.map((option, index) => (
                        <li key={index}>{option}</li>
                      ))}
                    </ol>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
