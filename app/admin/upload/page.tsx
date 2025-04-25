"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { parseExcelFile, type Question } from "@/lib/utils"
import { createClientSupabaseClient } from "@/lib/supabase"
import { CheckCircle, FileSpreadsheet, Loader2 } from "lucide-react"

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [questions, setQuestions] = useState<Question[]>([])
  const supabase = createClientSupabaseClient()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setError(null)
      setSuccess(false)
    }
  }

  const handleUpload = async () => {
    if (!file) {
      setError("Пожалуйста, выберите файл")
      return
    }

    setIsUploading(true)
    setError(null)
    setSuccess(false)

    try {
      // Парсим Excel файл
      const parsedQuestions = await parseExcelFile(file)
      setQuestions(parsedQuestions)

      if (parsedQuestions.length === 0) {
        throw new Error("Файл не содержит вопросов или имеет неверный формат")
      }

      // Сначала удаляем все существующие вопросы
      await supabase.from("questions").delete().neq("id", 0)

      // Загружаем новые вопросы
      for (const question of parsedQuestions) {
        const { error } = await supabase.from("questions").insert({
          question_number: question.question_number,
          question_text: question.question_text,
          options: question.options,
        })

        if (error) throw error
      }

      setSuccess(true)
    } catch (err: any) {
      console.error("Error uploading questions:", err)
      setError(err.message || "Произошла ошибка при загрузке файла")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Загрузка вопросов</h1>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Загрузка Excel файла с вопросами</CardTitle>
          <CardDescription>
            Загрузите файл Excel с вопросами и вариантами ответов. Формат файла: столбец A - номер вопроса, столбец B -
            текст вопроса, столбцы C, D, E и далее - варианты ответов.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="excel-file">Excel файл</Label>
            <Input id="excel-file" type="file" accept=".xlsx,.xls" onChange={handleFileChange} disabled={isUploading} />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertTitle>Ошибка</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertTitle>Успешно</AlertTitle>
              <AlertDescription>Загружено {questions.length} вопросов</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={handleUpload} disabled={!file || isUploading}>
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Загрузка...
              </>
            ) : (
              <>
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                Загрузить вопросы
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      {questions.length > 0 && success && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Предпросмотр загруженных вопросов</h2>
          <div className="border rounded-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="p-2 text-left">№</th>
                  <th className="p-2 text-left">Вопрос</th>
                  <th className="p-2 text-left">Варианты ответов</th>
                </tr>
              </thead>
              <tbody>
                {questions.map((q, i) => (
                  <tr key={i} className="border-t">
                    <td className="p-2">{q.question_number}</td>
                    <td className="p-2">{q.question_text}</td>
                    <td className="p-2">
                      <ol className="list-decimal list-inside">
                        {q.options.map((opt, j) => (
                          <li key={j}>{opt}</li>
                        ))}
                      </ol>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
