import { NextResponse } from "next/server"
import { createResultsSheet } from "@/lib/google-sheets"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title } = body

    // Создаем новую таблицу результатов
    const sheetId = await createResultsSheet(title || `Результаты тестирования ${new Date().toISOString()}`)

    return NextResponse.json({ sheetId })
  } catch (error) {
    console.error("Error creating results sheet:", error)
    return NextResponse.json({ error: "Failed to create results sheet" }, { status: 500 })
  }
}
