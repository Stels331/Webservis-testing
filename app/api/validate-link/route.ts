import { NextResponse } from "next/server"
import { validateAccessLink } from "@/lib/settings"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ valid: false }, { status: 400 })
    }

    const isValid = await validateAccessLink(id)
    return NextResponse.json({ valid: isValid })
  } catch (error: any) {
    console.error("Error validating access link:", error)
    return NextResponse.json({ valid: false, error: error.message }, { status: 500 })
  }
}
