import { NextResponse } from "next/server"
import { getSettings, saveSettings } from "@/lib/settings"

export async function GET() {
  try {
    const settings = getSettings()
    return NextResponse.json({ settings })
  } catch (error) {
    console.error("Error getting settings:", error)
    return NextResponse.json({ error: "Failed to get settings" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { questionsSheetId, resultsSheetId, accessToken } = body

    // Сохраняем настройки
    saveSettings({
      questionsSheetId,
      resultsSheetId,
      accessToken,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error saving settings:", error)
    return NextResponse.json({ error: "Failed to save settings" }, { status: 500 })
  }
}
