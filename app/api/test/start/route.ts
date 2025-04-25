import { NextResponse } from "next/server"
import { validateAccessLink, getSettings } from "@/lib/settings"
import { getQuestionsFromSheet } from "@/lib/google-sheets"
import { randomUUID } from "crypto"

// Хранилище сессий (в реальном приложении лучше использовать Redis или другое хранилище)
const sessions = new Map()

export async function POST(request: Request) {
  try {
    const { userName, linkId } = await request.json()

    if (!userName || !linkId) {
      return NextResponse.json({ error: "Отсутствуют обязательные параметры" }, { status: 400 })
    }

    // Проверяем валидность ссылки доступа
    const isValid = await validateAccessLink(linkId)
    if (!isValid) {
      return NextResponse.json({ error: "Недействительная ссылка доступа" }, { status: 403 })
    }

    // Получаем настройки приложения
    const settings = await getSettings()
    if (!settings.questionsSheetUrl) {
      return NextResponse.json({ error: "URL таблицы с вопросами не настроен" }, { status: 500 })
    }

    // Получаем вопросы из Google Sheets
    const questions = await getQuestionsFromSheet(settings.questionsSheetUrl)
    if (!questions || questions.length === 0) {
      return NextResponse.json({ error: "Не удалось получить вопросы из таблицы" }, { status: 500 })
    }

    // Создаем новую сессию
    const sessionId = randomUUID()
    sessions.set(sessionId, {
      userName,
      linkId,
      questions,
      currentQuestionIndex: 0,
      answers: [],
      startTime: new Date().toISOString(),
      completed: false,
    })

    return NextResponse.json({ sessionId })
  } catch (error: any) {
    console.error("Error starting test:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
