"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Copy, Loader2, Plus, Trash2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

type AccessLink = {
  id: string
  name: string
  active: boolean
  createdAt: string
}

type Settings = {
  questionsSheetUrl: string
  responsesSheetUrl: string
  accessLinks: AccessLink[]
}

export default function SettingsPage() {
  const [questionsSheetUrl, setQuestionsSheetUrl] = useState("")
  const [responsesSheetUrl, setResponsesSheetUrl] = useState("")
  const [newLinkName, setNewLinkName] = useState("")
  const [accessLinks, setAccessLinks] = useState<AccessLink[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isCreatingLink, setIsCreatingLink] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  // Загрузка настроек
  useEffect(() => {
    async function loadSettings() {
      try {
        const response = await fetch("/api/settings")
        if (!response.ok) throw new Error("Не удалось загрузить настройки")

        const settings: Settings = await response.json()
        setQuestionsSheetUrl(settings.questionsSheetUrl)
        setResponsesSheetUrl(settings.responsesSheetUrl)
        setAccessLinks(settings.accessLinks)
      } catch (err: any) {
        setError(err.message || "Произошла ошибка при загрузке настроек")
      } finally {
        setIsLoading(false)
      }
    }

    loadSettings()
  }, [])

  // Сохранение настроек таблиц
  const saveSheetSettings = async () => {
    setIsSaving(true)
    setError(null)

    try {
      const response = await fetch("/api/settings/sheets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          questionsSheetUrl,
          responsesSheetUrl,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Не удалось сохранить настройки")
      }

      toast({
        title: "Настройки сохранены",
        description: "Настройки таблиц успешно обновлены",
      })
    } catch (err: any) {
      setError(err.message || "Произошла ошибка при сохранении настроек")
    } finally {
      setIsSaving(false)
    }
  }

  // Создание новой ссылки доступа
  const createAccessLink = async () => {
    if (!newLinkName.trim()) {
      setError("Введите название для ссылки доступа")
      return
    }

    setIsCreatingLink(true)
    setError(null)

    try {
      const response = await fetch("/api/settings/access-links", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newLinkName,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Не удалось создать ссылку доступа")
      }

      const newLink = await response.json()
      setAccessLinks([...accessLinks, newLink])
      setNewLinkName("")

      toast({
        title: "Ссылка создана",
        description: "Новая ссылка доступа успешно создана",
      })
    } catch (err: any) {
      setError(err.message || "Произошла ошибка при создании ссылки")
    } finally {
      setIsCreatingLink(false)
    }
  }

  // Деактивация ссылки доступа
  const deactivateLink = async (id: string) => {
    try {
      const response = await fetch(`/api/settings/access-links/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Не удалось деактивировать ссылку")
      }

      // Обновляем список ссылок
      setAccessLinks(accessLinks.map((link) => (link.id === id ? { ...link, active: false } : link)))

      toast({
        title: "Ссылка деактивирована",
        description: "Ссылка доступа успешно деактивирована",
      })
    } catch (err: any) {
      setError(err.message || "Произошла ошибка при деактивации ссылки")
    }
  }

  // Копирование ссылки в буфер обмена
  const copyLinkToClipboard = (id: string) => {
    const url = `${window.location.origin}/test/${id}`
    navigator.clipboard.writeText(url)

    toast({
      title: "Ссылка скопирована",
      description: "Ссылка доступа скопирована в буфер обмена",
    })
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Настройки</h1>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="sheets">
        <TabsList className="mb-6">
          <TabsTrigger value="sheets">Google Таблицы</TabsTrigger>
          <TabsTrigger value="access">Ссылки доступа</TabsTrigger>
        </TabsList>

        <TabsContent value="sheets">
          <Card>
            <CardHeader>
              <CardTitle>Настройки Google Таблиц</CardTitle>
              <CardDescription>Укажите URL-адреса Google Таблиц для вопросов и ответов</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="questions-sheet">Таблица с вопросами</Label>
                <Input
                  id="questions-sheet"
                  value={questionsSheetUrl}
                  onChange={(e) => setQuestionsSheetUrl(e.target.value)}
                  placeholder="https://docs.google.com/spreadsheets/d/..."
                />
                <p className="text-sm text-muted-foreground">
                  Формат таблицы: столбец A - номер вопроса, столбец B - текст вопроса, столбцы C, D, E и далее -
                  варианты ответов
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="responses-sheet">Таблица для ответов</Label>
                <Input
                  id="responses-sheet"
                  value={responsesSheetUrl}
                  onChange={(e) => setResponsesSheetUrl(e.target.value)}
                  placeholder="https://docs.google.com/spreadsheets/d/..."
                />
                <p className="text-sm text-muted-foreground">В эту таблицу будут записываться ответы пользователей</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={saveSheetSettings} disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Сохранение...
                  </>
                ) : (
                  "Сохранить настройки"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="access">
          <Card>
            <CardHeader>
              <CardTitle>Управление ссылками доступа</CardTitle>
              <CardDescription>Создавайте и управляйте ссылками для доступа к тестированию</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <div className="flex-1">
                  <Input
                    value={newLinkName}
                    onChange={(e) => setNewLinkName(e.target.value)}
                    placeholder="Название ссылки (например, 'Группа А')"
                  />
                </div>
                <Button onClick={createAccessLink} disabled={isCreatingLink}>
                  {isCreatingLink ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      Создать ссылку
                    </>
                  )}
                </Button>
              </div>

              {accessLinks.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Название</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead>Дата создания</TableHead>
                      <TableHead className="text-right">Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {accessLinks.map((link) => (
                      <TableRow key={link.id}>
                        <TableCell>{link.name}</TableCell>
                        <TableCell>
                          <Badge variant={link.active ? "default" : "secondary"}>
                            {link.active ? "Активна" : "Неактивна"}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(link.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => copyLinkToClipboard(link.id)}
                              disabled={!link.active}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => deactivateLink(link.id)}
                              disabled={!link.active}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8 bg-muted rounded-md">
                  <p className="text-muted-foreground">Нет созданных ссылок доступа</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
