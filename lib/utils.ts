import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import * as XLSX from "xlsx"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type Question = {
  question_number: number
  question_text: string
  options: string[]
}

export async function parseExcelFile(file: File): Promise<Question[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer)
        const workbook = XLSX.read(data, { type: "array" })

        // Получаем первый лист
        const firstSheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[firstSheetName]

        // Преобразуем в JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][]

        // Пропускаем заголовок, если он есть
        const startRow = jsonData[0][0] === "Номер вопроса" ? 1 : 0

        // Преобразуем данные в формат вопросов
        const questions: Question[] = []

        for (let i = startRow; i < jsonData.length; i++) {
          const row = jsonData[i]
          if (!row[0] || !row[1]) continue // Пропускаем пустые строки

          const questionNumber = Number(row[0])
          const questionText = row[1]

          // Собираем варианты ответов (начиная с индекса 2)
          const options: string[] = []
          for (let j = 2; j < row.length; j++) {
            if (row[j]) options.push(row[j])
          }

          if (options.length > 0) {
            questions.push({
              question_number: questionNumber,
              question_text: questionText,
              options,
            })
          }
        }

        resolve(questions)
      } catch (error) {
        reject(error)
      }
    }

    reader.onerror = () => {
      reject(new Error("Ошибка чтения файла"))
    }

    reader.readAsArrayBuffer(file)
  })
}

export function exportToExcel(data: any[], fileName: string) {
  const worksheet = XLSX.utils.json_to_sheet(data)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, "Results")
  XLSX.writeFile(workbook, fileName)
}
