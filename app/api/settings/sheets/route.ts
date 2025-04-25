import { NextResponse } from "next/server"
import { updateQuestionsSheetUrl, updateResponsesSheetUrl } from "@/lib/settings"
import { checkSheetAccess } from "@/lib/google-sheets"

export async function POST(request: Request) {
  try {
    const { questionsSheetUrl, responsesSheetUrl } = await request.json()

    // Проверяем доступ к таблицам
    if (questionsSheetUrl) {
      const hasAccess = await checkSheetAccess(questionsSheetUrl)
      if (!hasAccess) {
        return NextResponse.json(
          { error: "Нет доступа к таблице с вопросами. Убедитесь, что сервисный аккаунт имеет доступ к таблице." },
          { status: 400 },
        )
      }
      await updateQuestionsSheetUrl(questionsSheetUrl)
    }

    if (responsesSheetUrl) {
      const hasAccess = await checkSheetAccess(responsesSheetUrl)
      if (!hasAccess) {
        return NextResponse.json(
          { error: "Нет доступа к таблице для ответов. Убедитесь, что сервисный аккаунт имеет доступ к таблице." },
          { status: 400 },
        )
      }
      await updateResponsesSheetUrl(responsesSheetUrl)
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Error updating sheet settings:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
