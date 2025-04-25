import fs from "fs"
import path from "path"

// Тип для настроек приложения
export type AppSettings = {
  questionsSheetId: string
  resultsSheetId: string
  accessToken: string
  questionsSheetUrl: string
  responsesSheetUrl: string
  accessLinks: Array<{
    id: string
    name: string
    active: boolean
    createdAt: string
  }>
}

const SETTINGS_FILE = path.join(process.cwd(), "settings.json")

// Функция для получения настроек
export function getSettings(): AppSettings {
  try {
    if (fs.existsSync(SETTINGS_FILE)) {
      const data = fs.readFileSync(SETTINGS_FILE, "utf8")
      return JSON.parse(data)
    }
  } catch (error) {
    console.error("Error reading settings file:", error)
  }

  // Возвращаем настройки по умолчанию, если файл не существует или произошла ошибка
  return {
    questionsSheetId: "",
    resultsSheetId: "",
    accessToken: generateAccessToken(),
    questionsSheetUrl: "",
    responsesSheetUrl: "",
    accessLinks: [],
  }
}

// Функция для сохранения настроек
export function saveSettings(settings: AppSettings): void {
  try {
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 2))
  } catch (error) {
    console.error("Error writing settings file:", error)
    throw new Error("Не удалось сохранить настройки")
  }
}

// Функция для генерации случайного токена доступа
export function generateAccessToken(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

// Функция для проверки токена доступа
export function validateAccessToken(token: string): boolean {
  const settings = getSettings()
  return settings.accessToken === token
}

// Добавляем недостающие функции для работы с URL таблиц
export function updateQuestionsSheetUrl(url: string): void {
  const settings = getSettings()
  settings.questionsSheetUrl = url

  // Извлекаем ID из URL, если возможно
  const sheetId = extractSheetIdFromUrl(url)
  if (sheetId) {
    settings.questionsSheetId = sheetId
  }

  saveSettings(settings)
}

export function updateResponsesSheetUrl(url: string): void {
  const settings = getSettings()
  settings.responsesSheetUrl = url

  // Извлекаем ID из URL, если возможно
  const sheetId = extractSheetIdFromUrl(url)
  if (sheetId) {
    settings.resultsSheetId = sheetId
  }

  saveSettings(settings)
}

// Вспомогательная функция для извлечения ID таблицы из URL
function extractSheetIdFromUrl(url: string): string | null {
  try {
    const match = url.match(/\/d\/([a-zA-Z0-9-_]+)/)
    return match ? match[1] : null
  } catch (error) {
    return null
  }
}

// Добавляем функции для работы с ссылками доступа
export function createAccessLink(name: string): string {
  const settings = getSettings()
  const id = generateAccessToken()

  settings.accessLinks.push({
    id,
    name,
    active: true,
    createdAt: new Date().toISOString(),
  })

  saveSettings(settings)
  return id
}

export function validateAccessLink(id: string): boolean {
  const settings = getSettings()
  const link = settings.accessLinks.find((link) => link.id === id)
  return link ? link.active : false
}

export function deactivateAccessLink(id: string): void {
  const settings = getSettings()
  const linkIndex = settings.accessLinks.findIndex((link) => link.id === id)

  if (linkIndex !== -1) {
    settings.accessLinks[linkIndex].active = false
    saveSettings(settings)
  }
}
