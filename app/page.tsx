import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
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
            <CardTitle>Добро пожаловать</CardTitle>
            <CardDescription>Веб-сервис для проведения тестирования</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Для прохождения тестирования вам необходимо получить ссылку доступа от администратора.
            </p>
            <p className="text-muted-foreground">
              Если вы администратор, войдите в панель управления для настройки тестирования и создания ссылок доступа.
            </p>
          </CardContent>
          <CardFooter className="flex gap-4">
            <Link href="/admin" className="w-full">
              <Button className="w-full">Панель администратора</Button>
            </Link>
            <Link href="/test" className="w-full">
              <Button variant="outline" className="w-full">
                Пройти тестирование
              </Button>
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
