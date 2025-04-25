"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { createClientSupabaseClient } from "@/lib/supabase"
import { exportToExcel } from "@/lib/utils"
import { Download, Loader2 } from "lucide-react"

type ResultData = {
  user_name: string
  completed: boolean
  completed_at: string | null
  created_at: string
  question_count: number
  answer_count: number
}

export default function ResultsPage() {
  const [results, setResults] = useState<ResultData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [detailedResults, setDetailedResults] = useState<any[]>([])
  const [isExporting, setIsExporting] = useState(false)

  useEffect(() => {
    async function fetchResults() {
      try {
        const supabase = createClientSupabaseClient()

        // Получаем все сессии тестирования
        const { data: sessions, error: sessionsError } = await supabase
          .from("test_sessions")
          .select("*")
          .order("created_at", { ascending: false })

        if (sessionsError) throw sessionsError

        // Для каждой сессии получаем количество вопросов и ответов
        const resultsWithCounts = await Promise.all(
          sessions.map(async (session) => {
            // Получаем количество ответов для этого пользователя
            const { count: answerCount, error: answerError } = await supabase
              .from("user_responses")
              .select("*", { count: "exact", head: true })
              .eq("user_name", session.user_name)

            if (answerError) throw answerError

            // Получаем общее количество вопросов
            const { count: questionCount, error: questionError } = await supabase
              .from("questions")
              .select("*", { count: "exact", head: true })

            if (questionError) throw questionError

            return {
              ...session,
              question_count: questionCount || 0,
              answer_count: answerCount || 0,
            }
          }),
        )

        setResults(resultsWithCounts)
      } catch (err: any) {
        console.error("Error fetching results:", err)
        setError(err.message || "Ошибка при загрузке результатов")
      } finally {
        setIsLoading(false)
      }
    }

    fetchResults()
  }, [])

  const fetchDetailedResults = async () => {
    setIsExporting(true)
    try {
      const supabase = createClientSupabaseClient()

      // Получаем все вопросы
      const { data: questions, error: questionsError } = await supabase
        .from("questions")
        .select("*")
        .order("question_number", { ascending: true })

      if (questionsError) throw questionsError

      // Получаем все ответы пользователей
      const { data: responses, error: responsesError } = await supabase.from("user_responses").select("*")

      if (responsesError) throw responsesError

      // Создаем детальный отчет
      const detailedData = []

      for (const response of responses) {
        const question = questions.find((q) => q.id === response.question_id)
        if (question) {
          detailedData.push({
            "Имя пользователя": response.user_name,
            "Номер вопроса": question.question_number,
            Вопрос: question.question_text,
            "Выбранный ответ": response.selected_option,
            "Дата ответа": new Date(response.created_at).toLocaleString(),
          })
        }
      }

      setDetailedResults(detailedData)

      // Экспортируем в Excel
      exportToExcel(detailedData, `результаты_тестирования_${new Date().toISOString().split("T")[0]}.xlsx`)
    } catch (err: any) {
      console.error("Error exporting results:", err)
      setError(err.message || "Ошибка при экспорте результатов")
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Результаты тестирования</h1>
        <Button onClick={fetchDetailedResults} disabled={isExporting || results.length === 0}>
          {isExporting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Экспорт...
            </>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              Экспорт в Excel
            </>
          )}
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">{error}</div>
      ) : results.length === 0 ? (
        <div className="text-center py-12 bg-muted rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Нет результатов тестирования</h2>
          <p className="text-muted-foreground">Результаты появятся здесь, когда пользователи пройдут тестирование</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {results.map((result, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{result.user_name}</CardTitle>
                <CardDescription>{new Date(result.created_at).toLocaleString()}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Статус:</span>
                    <span className={result.completed ? "text-green-600 font-medium" : "text-amber-600 font-medium"}>
                      {result.completed ? "Завершен" : "Не завершен"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Ответов:</span>
                    <span>
                      {result.answer_count} из {result.question_count}
                    </span>
                  </div>
                  {result.completed_at && (
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Завершен:</span>
                      <span>{new Date(result.completed_at).toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" size="sm">
                  Подробнее
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
