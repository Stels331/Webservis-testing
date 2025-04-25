"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

export default function TestCompletePage() {
  const searchParams = useSearchParams()
  const userName = searchParams.get("name") || "Пользователь"

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary text-primary-foreground py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">Веб-сервис тестирования</h1>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <CardTitle className="text-2xl">Тестирование завершено!</CardTitle>
            <CardDescription className="text-lg">Спасибо, {userName}, за прохождение теста</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Ваши ответы были успешно сохранены в Google таблице.</p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link href="/">
            </Link>
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
