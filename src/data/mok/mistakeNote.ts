export type MistakeItem = {
  id: string
  categoryId: string
  chapterTitle: string
  question: string
  wrongAt: string
}

export const MISTAKE_ITEMS: MistakeItem[] = [
  {
    id: "m-1",
    categoryId: "investment",
    chapterTitle: "ISA & 연금저축 절세 투자",
    question: "ISA 계좌의 비과세 한도를 고르는 기준으로 가장 적절한 것은?",
    wrongAt: "2026-03-06T14:20:00+09:00",
  },
  {
    id: "m-2",
    categoryId: "real-estate",
    chapterTitle: "계약: 도장 찍기 전 방어선",
    question: "계약서 특약에 반드시 포함해야 할 문구는?",
    wrongAt: "2026-03-06T09:42:00+09:00",
  },
  {
    id: "m-3",
    categoryId: "finance",
    chapterTitle: "실업급여 & 고용보험",
    question: "실업급여 수급 조건 중 피보험 단위기간 요건은?",
    wrongAt: "2026-03-05T22:10:00+09:00",
  },
  {
    id: "m-4",
    categoryId: "career",
    chapterTitle: "절세 공제 항목 총정리",
    question: "연말정산 공제 항목으로 볼 수 없는 것은?",
    wrongAt: "2026-03-05T08:15:00+09:00",
  },
  {
    id: "m-5",
    categoryId: "real-estate",
    chapterTitle: "등기부등본 완전 해독",
    question: "등기부등본에서 근저당권 확인 시 먼저 볼 항목은?",
    wrongAt: "2026-03-04T17:30:00+09:00",
  },
]
