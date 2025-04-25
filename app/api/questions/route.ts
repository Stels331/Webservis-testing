import { NextResponse } from "next/server"
import { getQuestionsFromSheet } from "@/lib/google-sheets"
import { getSettings, validateAccessToken } from "@/lib/settings"

export async function GET(request: Request) {
  try {
    // Получаем токен из запроса
    const url = new URL(request.url)
    const token = url.searchParams.get("token")

    // Проверяем токен
    if (!token || !validateAccessToken(token)) {
      return NextResponse.json({ error: "Invalid access token" }, { status: 401 })
    }

    // Получаем настройки
    const settings = getSettings()

    // Проверяем наличие ID таблицы с вопросами
    if (!settings.questionsSheetId) {
      return NextResponse.json({ error: "Questions sheet ID not configured" }, { status: 400 })
    }

    // Получаем вопросы из таблицы
    const questions = await getQuestionsFromSheet(settings.questionsSheetId)

    return NextResponse.json({ questions })
  } catch (error) {
    console.error("Error getting questions:", error)
    return NextResponse.json({ error: "Failed to get questions" }, { status: 500 })
  }
}
