import { NextResponse } from "next/server"
import { deactivateAccessLink } from "@/lib/settings"

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    await deactivateAccessLink(id)
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Error deactivating access link:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
