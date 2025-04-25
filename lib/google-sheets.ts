import { GoogleSpreadsheet } from "google-spreadsheet"
import { JWT } from "google-auth-library"

// Типы данных
export type Question = {
  number: number
  text: string
  options: string[]
}

export type UserAnswer = {
  questionNumber: number
  selectedOption: string
}

// 🔐 Авторизация в Google Sheets через сервисный аккаунт
export async function getAuthenticatedClient(sheetId: string) {
  try {
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    })

    const doc = new GoogleSpreadsheet(sheetId, serviceAccountAuth)
    await doc.loadInfo()

    return doc
  } catch (error) {
    console.error("Error authenticating with Google Sheets:", error)
    throw new Error("Не удалось подключиться к Google Sheets")
  }
}

// 📥 Получение вопросов из таблицы
export async function getQuestionsFromSheet(sheetId: string): Promise<Question[]> {
  try {
    const doc = await getAuthenticatedClient(sheetId)
    const sheet = doc.sheetsByIndex[0]
    const rows = await sheet.getRows()

    const questions: Question[] = []

    for (const row of rows) {
      const rowData = row.toObject()
      const text = rowData["Question"] || ""
      const options = [
        rowData["Option A"],
        rowData["Option B"],
        rowData["Option C"],
        rowData["Option D"]
      ].filter((option) => !!option)

      if (text && options.length > 0) {
        questions.push({
          number: questions.length + 1,
          text,
          options
        })
      }
    }

    return questions.sort((a, b) => a.number - b.number)
  } catch (error) {
    console.error("Error fetching questions from Google Sheets:", error)
    throw new Error("Не удалось получить вопросы из Google Sheets")
  }
}

// 📤 Сохранение ответов пользователя в таблицу
export async function saveUserAnswersToSheet(
  sheetId: string,
  userName: string,
  answers: UserAnswer[]
): Promise<void> {
  try {
    const doc = await getAuthenticatedClient(sheetId)
    const sheet = doc.sheetsByTitle["Лист2"] // <- укажи свой лист здесь

    await sheet.loadCells()

    const headerRow = await sheet.getRows({ limit: 1 })
    const nextColumnIndex = headerRow.length > 0
      ? Object.keys(headerRow[0].toObject()).length
      : 1

    sheet.getCell(0, nextColumnIndex).value = userName

    for (const answer of answers) {
      const cell = sheet.getCell(answer.questionNumber, nextColumnIndex)
      cell.value = answer.selectedOption
    }

    await sheet.saveUpdatedCells()
  } catch (error) {
    console.error("Error saving answers to Google Sheets:", error)
    throw new Error("Не удалось сохранить ответы в Google Sheets")
  }
}