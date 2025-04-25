import { createServerSupabaseClient } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Trash2 } from "lucide-react"

export default async function QuestionsPage() {
  const supabase = createServerSupabaseClient()

  const { data: questions, error } = await supabase
    .from("questions")
    .select("*")
    .order("question_number", { ascending: true })

  if (error) {
    console.error("Error fetching questions:", error)
    return <div>Ошибка загрузки вопросов</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Вопросы</h1>
        <Link href="/admin/upload">
          <Button>Загрузить новые вопросы</Button>
        </Link>
      </div>

      {questions.length === 0 ? (
        <div className="text-center py-12 bg-muted rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Нет загруженных вопросов</h2>
          <p className="text-muted-foreground mb-4">Загрузите Excel файл с вопросами, чтобы начать тестирование</p>
          <Link href="/admin/upload">
            <Button>Загрузить вопросы</Button>
          </Link>
        </div>
      ) : (
        <div className="border rounded-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="p-3 text-left">№</th>
                <th className="p-3 text-left">Вопрос</th>
                <th className="p-3 text-left">Варианты ответов</th>
                <th className="p-3 text-center">Действия</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((question) => (
                <tr key={question.id} className="border-t">
                  <td className="p-3">{question.question_number}</td>
                  <td className="p-3">{question.question_text}</td>
                  <td className="p-3">
                    <ol className="list-decimal list-inside">
                      {question.options.map((option: string, index: number) => (
                        <li key={index}>{option}</li>
                      ))}
                    </ol>
                  </td>
                  <td className="p-3 text-center">
                    <form action={`/api/questions/delete?id=${question.id}`} method="POST">
                      <Button variant="ghost" size="icon" type="submit">
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
