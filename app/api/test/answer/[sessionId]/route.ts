import { NextResponse } from "next/server"
import { getSettings } from "@/lib/settings"
import { saveResponseToSheet } from "@/lib/google-sheets"

// Используем хранилище сессий из предыдущего файла
const sessions = new Map()

export async function POST(request: Request, { params }: { params: { sessionId: string } }) {
  try {
    const { sessionId } = params
    const session = sessions.get(sessionId)

    if (!session) {
      return NextResponse.json({ error: "Сессия не найдена" }, { status: 404 })
    }

    const { questionId, selectedOption } = await request.json()

    if (!questionId || !selectedOption) {
      return NextResponse.json({ error: "Отсутствуют обязательные параметры" }, { status: 400 })
    }

    // Находим вопрос по ID
    const question = session.questions.find((q: any) => q.id === questionId)
    if (!question) {
      return NextResponse.json({ error: "Вопрос не найден" }, { status: 404 })
    }

    // Получаем настройки приложения
    const settings = await getSettings()
    if (!settings.responsesSheetUrl) {
      return NextResponse.json({ error: "URL таблицы для ответов не настроен" }, { status: 500 })
    }

    // Сохраняем ответ в Google Sheets
    await saveResponseToSheet(settings.responsesSheetUrl, {
      user_name: session.userName,
      question_number: question.question_number,
      question_text: question.question_text,
      selected_option: selectedOption,
      timestamp: new Date().toISOString(),
    })

    // Сохраняем ответ в сессии
    session.answers.push({
      questionId,
      selectedOption,
      timestamp: new Date().toISOString(),
    })

    // Определяем следующий вопрос
    const nextQuestionIndex = session.currentQuestionIndex + 1
    let completed = false

    if (nextQuestionIndex >= session.questions.length) {
      // Если это был последний вопрос, отмечаем тест как завершенный
      session.completed = true
      session.completedTime = new Date().toISOString()
      completed = true
    } else {
      // Обновляем индекс текущего вопроса
      session.currentQuestionIndex = nextQuestionIndex
    }

    // Обновляем сессию в хранилище
    sessions.set(sessionId, session)

    return NextResponse.json({
      nextQuestionIndex,
      completed,
    })
  } catch (error: any) {
    console.error("Error saving answer:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
