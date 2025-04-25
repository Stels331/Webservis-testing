"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Copy, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"


export default function AdminPage() {
  const [questionsSheetId, setQuestionsSheetId] = useState("")
  const [resultsSheetId, setResultsSheetId] = useState("")
  const [accessToken, setAccessToken] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [success, setSuccess] = useState(false)
  const { toast } = useToast()
  const [origin, setOrigin] = useState("")

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin)
    }
  }, [])


  // Загружаем настройки при монтировании компонента
  useEffect(() => {
    async function loadSettings() {
      try {
        const response = await fetch("/api/settings")
        const data = await response.json()

        if (data.settings) {
          setQuestionsSheetId(data.settings.questionsSheetId || "")
          setResultsSheetId(data.settings.resultsSheetId || "")
          setAccessToken(data.settings.accessToken || "")
        }
      } catch (error) {
        console.error("Error loading settings:", error)
      }
    }

    loadSettings()
  }, [])

  // Функция для сохранения настроек
  const handleSaveSettings = async () => {
    setIsSaving(true)
    setSuccess(false)

    try {
      const response = await fetch("/api/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          questionsSheetId,
          resultsSheetId,
          accessToken,
        }),
      })

      if (!response.ok) {
        throw new Error("Ошибка при сохранении настроек")
      }

      setSuccess(true)
      toast({
        title: "Настройки сохранены",
        description: "Настройки успешно сохранены",
      })
    } catch (error) {
      console.error("Error saving settings:", error)
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Не удалось сохранить настройки",
      })
    } finally {
      setIsSaving(false)
    }
  }

  // Функция для генерации нового токена доступа
  const handleGenerateToken = async () => {
    setIsGenerating(true)

    try {
      const response = await fetch("/api/settings/token", {
        method: "POST",
      })

      if (!response.ok) {
        throw new Error("Ошибка при генерации токена")
      }

      const data = await response.json()
      setAccessToken(data.token)

      toast({
        title: "Токен сгенерирован",
        description: "Новый токен доступа успешно сгенерирован",
      })
    } catch (error) {
      console.error("Error generating token:", error)
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Не удалось сгенерировать токен",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  // Функция для копирования ссылки в буфер обмена
  const handleCopyLink = () => {
    const testUrl = `${window.location.origin}/test?token=${accessToken}`
    navigator.clipboard.writeText(testUrl)
    toast({
      title: "Ссылка скопирована",
      description: "Ссылка для тестирования скопирована в буфер обмена",
    })
  }

  // Функция для создания новой таблицы результатов
  const handleCreateResultsSheet = async () => {
    try {
      const response = await fetch("/api/sheets/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: `Результаты тестирования ${new Date().toLocaleDateString()}`,
        }),
      })

      if (!response.ok) {
        throw new Error("Ошибка при создании таблицы")
      }

      const data = await response.json()
      setResultsSheetId(data.sheetId)

      toast({
        title: "Таблица создана",
        description: "Новая таблица результатов успешно создана",
      })
    } catch (error) {
      console.error("Error creating results sheet:", error)
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Не удалось создать таблицу результатов",
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Панель администратора</h1>

      <Tabs defaultValue="settings">
        <TabsList className="mb-4">
          <TabsTrigger value="settings">Настройки</TabsTrigger>
          <TabsTrigger value="access">Доступ</TabsTrigger>
        </TabsList>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Настройки Google Sheets</CardTitle>
              <CardDescription>Укажите идентификаторы Google таблиц для вопросов и результатов</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="questions-sheet">ID таблицы с вопросами</Label>
                <Input
                  id="questions-sheet"
                  value={questionsSheetId}
                  onChange={(e) => setQuestionsSheetId(e.target.value)}
                  placeholder="Например: 1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"
                />
                <p className="text-sm text-muted-foreground">ID таблицы можно найти в URL между /d/ и /edit</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="results-sheet">ID таблицы для результатов</Label>
                <div className="flex gap-2">
                  <Input
                    id="results-sheet"
                    value={resultsSheetId}
                    onChange={(e) => setResultsSheetId(e.target.value)}
                    placeholder="Например: 1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"
                  />
                  <Button variant="outline" onClick={handleCreateResultsSheet}>
                    Создать новую
                  </Button>
                </div>
              </div>

              {success && (
                <Alert className="bg-green-50 border-green-200">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertTitle>Успешно</AlertTitle>
                  <AlertDescription>Настройки успешно сохранены</AlertDescription>
                </Alert>
              )}
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings} disabled={isSaving}>
                {isSaving ? "Сохранение..." : "Сохранить настройки"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="access">
          <Card>
            <CardHeader>
              <CardTitle>Настройки доступа</CardTitle>
              <CardDescription>Управление доступом пользователей к тестированию</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="access-token">Токен доступа</Label>
                <div className="flex gap-2">
                  <Input
                    id="access-token"
                    value={accessToken}
                    onChange={(e) => setAccessToken(e.target.value)}
                    placeholder="Токен доступа"
                  />
                  <Button variant="outline" onClick={handleGenerateToken} disabled={isGenerating}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    {isGenerating ? "Генерация..." : "Сгенерировать"}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Ссылка для тестирования</Label>
                <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
                  <span className="text-sm truncate flex-1">
                    {origin && `${origin}/test?token=${accessToken}`}
                  </span>
                  <Button variant="ghost" size="sm" onClick={handleCopyLink}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Скопируйте эту ссылку и отправьте её пользователям для прохождения тестирования
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings} disabled={isSaving}>
                {isSaving ? "Сохранение..." : "Сохранить настройки"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
