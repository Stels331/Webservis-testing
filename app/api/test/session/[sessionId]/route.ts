import { NextResponse } from "next/server"

// Используем хранилище сессий из предыдущего файла
// В реальном приложении это должно быть общее хранилище (Redis, база данных и т.д.)
const sessions = new Map()

export async function GET(request: Request, { params }: { params: { sessionId: string } }) {
  try {
    const { sessionId } = params
    const session = sessions.get(sessionId)

    if (!session) {
      return NextResponse.json({ error: "Сессия не найдена" }, { status: 404 })
    }

    // Возвращаем только необходимые данные для клиента
    return NextResponse.json({
      userName: session.userName,
      questions: session.questions,
      currentQuestionIndex: session.currentQuestionIndex,
    })
  } catch (error: any) {
    console.error("Error getting session:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
