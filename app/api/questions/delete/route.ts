import { createServerSupabaseClient } from "@/lib/supabase"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const id = url.searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "ID вопроса не указан" }, { status: 400 })
    }

    const supabase = createServerSupabaseClient()

    const { error } = await supabase.from("questions").delete().eq("id", id)

    if (error) {
      throw error
    }

    return NextResponse.redirect(new URL("/admin/questions", request.url))
  } catch (error: any) {
    console.error("Error deleting question:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
