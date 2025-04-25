import { NextResponse } from "next/server"
import { saveUserAnswersToSheet } from "@/lib/google-sheets"
import { getSettings, validateAccessToken } from "@/lib/settings"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userName, answers, token } = body

    // Проверяем токен
    if (!token || !validateAccessToken(token)) {
      return NextResponse.json({ error: "Invalid access token" }, { status: 401 })
    }

    // Проверяем наличие имени пользователя и ответов
    if (!userName || !answers || !Array.isArray(answers)) {
      return NextResponse.json({ error: "Invalid request data" }, { status: 400 })
    }

    // Получаем настройки
    const settings = getSettings()

    // Проверяем наличие ID таблицы результатов
    if (!settings.resultsSheetId) {
      return NextResponse.json({ error: "Results sheet ID not configured" }, { status: 400 })
    }

    // Сохраняем ответы пользователя
    await saveUserAnswersToSheet(settings.resultsSheetId, userName, answers)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error saving answers:", error)
    return NextResponse.json({ error: "Failed to save answers" }, { status: 500 })
  }
}
