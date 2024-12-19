import { NextResponse } from "next/server";

// To handle a POST request to /api
export async function POST(request: Request) {
  const formData = await request.formData();
  const res = await fetch("http://localhost:5000/api/auth/signup", {
    method: "POST",
    body: formData,
  });
  const data = await res.json();
  return NextResponse.json({ data: data }, { status: 200 });
}
