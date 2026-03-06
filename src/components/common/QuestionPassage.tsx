import type { ReactNode } from "react"

type QuestionPassageProps = {
  /** 질문 텍스트 (옵션) */
  questionText?: string
  /** 질문 번호 (옵션) e.g., 1 -> "Q1." */
  questionNumber?: number
  /** 메인 지문 텍스트 */
  passage?: string
  /** 지문 아래 플레이버 텍스트 (강조 문구) */
  flavorText?: string
  /** 추가적인 자식 요소 (문서 카드 등) */
  children?: ReactNode
  /** 지문 숨김 여부 */
  hidePassage?: boolean
  /** 플레이버 텍스트 숨김 여부 */
  hideFlavorText?: boolean
  /** 커스텀 클래스 */
  className?: string
}

/**
 * 모든 퀴즈 타입에서 공통으로 사용되는 지문(Passage) 컴포넌트.
 * 프리미엄한 디자인(Rounded-24, Shadow, Dot Indicator)을 일관되게 적용합니다.
 */
export default function QuestionPassage({
  questionText,
  questionNumber,
  passage,
  flavorText,
  children,
  hidePassage = false,
  hideFlavorText = false,
  className = "",
}: QuestionPassageProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      {/* 질문 영역 */}
      {questionText && (
        <h2 className="mb-6 text-lg font-bold text-slate-900 tracking-tight leading-tight px-1">
          <span className="text-slate-400 mr-2">
            {questionNumber ? `Q${questionNumber}.` : ""}
          </span>
          {questionText}
        </h2>
      )}

      {/* 메인 지문 카드 */}
      {!hidePassage && passage && (
        <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm mb-6 transition-all">
          <p className="text-sm leading-relaxed text-slate-600 font-medium whitespace-pre-line">
            {passage}
          </p>
        </div>
      )}

      {/* 플레이버 텍스트 (강한 강조) */}
      {!hideFlavorText && flavorText && (
        <div className="mb-6 flex items-start gap-2 px-1">
          <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-slate-900 mt-2" />
          <p className="text-sm font-bold text-slate-900 leading-relaxed whitespace-pre-line">
            {flavorText}
          </p>
        </div>
      )}

      {/* 추가 콘텐츠 (e.g., 문서 카드, 테이블 등) */}
      {children}
    </div>
  )
}
