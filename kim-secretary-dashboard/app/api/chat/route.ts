import { NextRequest, NextResponse } from 'next/server'

const API_KEY = process.env.Gemini_API_Key
const API_ENDPOINT = 'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent'

interface GeminiRequest {
  contents: Array<{
    role: string
    parts: Array<{
      text: string
    }>
  }>
}

interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string
      }>
    }
  }>
}

export async function POST(request: NextRequest) {
  try {
    if (!API_KEY) {
      return NextResponse.json(
        { error: 'Gemini API 키가 설정되지 않았습니다.' },
        { status: 500 }
      )
    }

    const { message } = await request.json()

    if (!message) {
      return NextResponse.json(
        { error: '메시지가 필요합니다.' },
        { status: 400 }
      )
    }

    const requestBody: GeminiRequest = {
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: message,
            },
          ],
        },
      ],
    }

    const response = await fetch(`${API_ENDPOINT}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('Gemini API error:', errorData)
      return NextResponse.json(
        { error: `Gemini API 오류: ${response.statusText}` },
        { status: response.status }
      )
    }

    const data: GeminiResponse = await response.json()
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || '응답을 생성할 수 없습니다.'

    return NextResponse.json({ reply })
  } catch (error) {
    console.error('API 오류:', error)
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
