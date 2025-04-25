import { NextResponse } from "next/server"
import { getSettings, saveSettings, generateAccessToken } from "@/lib/settings"

export async function POST() {
  try {
    // Получаем текущие настройки
    const settings = getSettings()

    // Генерируем новый токен
    const newToken = generateAccessToken()

    // Обновляем настройки
    settings.accessToken = newToken
    saveSettings(settings)

    return NextResponse.json({ token: newToken })
  } catch (error) {
    console.error("Error generating token:", error)
    return NextResponse.json({ error: "Failed to generate token" }, { status: 500 })
  }
}
