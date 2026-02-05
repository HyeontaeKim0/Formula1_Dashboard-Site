import { NextResponse } from "next/server";
import { getNews } from "@/lib/api/newsParser/newsParser";

export async function GET() {
  try {
    const items = await getNews();
    return NextResponse.json(items);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}
