import { NextResponse } from "next/server"
import { createAccessLink, getSettings } from "@/lib/settings"

export async function POST(request: Request) {
  try {
    const { name } = await request.json()

    if (!name || name.trim() === "") {
      return NextResponse.json({ error: "Название ссылки не может быть пустым" }, { status: 400 })
    }

    const id = await createAccessLink(name)
    const settings = await getSettings()
    const newLink = settings.accessLinks.find((link) => link.id === id)

    return NextResponse.json(newLink)
  } catch (error: any) {
    console.error("Error creating access link:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
