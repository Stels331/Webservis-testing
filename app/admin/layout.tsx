import type React from "react"
import { AdminNav } from "@/components/admin-nav"
import { Button } from "@/components/ui/button"
import LogoutButton from "@/components/logout-button";
import Link from "next/link"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary text-primary-foreground py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Панель администратора</h1>
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="secondary" size="sm">
                На главную
              </Button>
            </Link>
            <LogoutButton />
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <AdminNav />
        {children}
      </main>

      <footer className="bg-muted py-4">
        <div className="container mx-auto px-4 text-center text-sm">
          &copy; {new Date().getFullYear()} Веб-сервис тестирования
        </div>
      </footer>
    </div>
  )
}
