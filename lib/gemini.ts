// Google Gemini API 유틸리티 함수

const API_KEY = process.env.Gemini_API_Key
// 최신 Gemini 2.5 Flash 모델 사용
const GEMINI_MODEL = 'gemini-2.5-flash'
const API_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`

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

/**
 * Gemini AI를 사용하여 텍스트 생성
 * @param prompt 사용자 입력 프롬프트
 * @returns 생성된 텍스트
 */
export async function callGemini(prompt: string): Promise<string> {
  if (!API_KEY) {
    console.warn('Gemini_API_Key가 설정되지 않았습니다.')
    return '(Gemini API 키가 필요합니다)'
  }

  try {
    const request: GeminiRequest = {
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    }

    const response = await fetch(
      `${API_ENDPOINT}?key=${API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      }
    )

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`)
    }

    const data: GeminiResponse = await response.json()
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '응답을 생성할 수 없습니다.'

    return text
  } catch (error) {
    console.error('Gemini API 호출 실패:', error)
    return '오류가 발생했습니다.'
  }
}

/**
 * 매출 분석 프롬프트
 */
export async function analyzeSales(salesSummary: string): Promise<string> {
  const prompt = `
다음은 회사의 최근 매출 데이터입니다:
${salesSummary}

이 데이터를 분석하고 다음을 포함한 간단한 인사이트를 제공해주세요:
1. 주요 판매 제품
2. 최고 성과 지역
3. 개선 제안

한국어로 답변해주세요.
  `
  return callGemini(prompt)
}

/**
 * 업무 우선순위 제안
 */
export async function suggestTaskPriority(taskDescription: string): Promise<string> {
  const prompt = `
다음은 수행해야 할 업무입니다:
"${taskDescription}"

이 업무의 우선순위(높음/보통/낮음)를 판단하고 이유를 설명해주세요. 한국어로 답변해주세요.
  `
  return callGemini(prompt)
}
