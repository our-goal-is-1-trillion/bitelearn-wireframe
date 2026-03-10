import type { ReactNode } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export type QuizVariant = 
  | "choiceQuestion" 
  | "choiceQuestionBottomSheet" 
  | "choiceQuestionInline"
  | "oxQuestion"
  | "oxQuestionBottomSheet"
  | "oxQuestionInline"

type QuizLayoutWrapperProps = {
  children: ReactNode
  currentVariant: QuizVariant
  onVariantChange: (variant: QuizVariant) => void
  hideMockup?: boolean
}

export default function QuizLayoutWrapper({
  children,
  currentVariant,
  onVariantChange,
  hideMockup = false,
}: QuizLayoutWrapperProps) {
  if (hideMockup) {
    return <>{children}</>
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 py-10">
      {/* 화면 전체 프레임 외부 중앙 배치 */}
      
      {/* UX 테스터 패널 */}
      <div className="mb-4 flex w-[375px] items-center justify-between rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-3 shadow-sm">
        <span className="text-sm font-semibold text-indigo-900">
          🧪 UX 테스트 UI
        </span>
        <Select
          value={currentVariant}
          onValueChange={(val: QuizVariant) => onVariantChange(val)}
        >
          <SelectTrigger className="h-8 w-[160px] bg-white text-xs">
            <SelectValue placeholder="레이아웃 선택" />
          </SelectTrigger>
          <SelectContent>
            {currentVariant.startsWith("choice") ? (
              <>
                <SelectItem value="choiceQuestion">A안 (기본 화면)</SelectItem>
                <SelectItem value="choiceQuestionBottomSheet">B안 (바텀 시트)</SelectItem>
                <SelectItem value="choiceQuestionInline">C안 (스크롤)</SelectItem>
              </>
            ) : (
              <>
                <SelectItem value="oxQuestion">A안 (기본 화면)</SelectItem>
                <SelectItem value="oxQuestionBottomSheet">B안 (바텀 시트)</SelectItem>
                <SelectItem value="oxQuestionInline">C안 (스크롤)</SelectItem>
              </>
            )}
          </SelectContent>
        </Select>
      </div>

      {/* 모바일 와이어프레임 본체 (375x812) */}
      <div className="relative overflow-hidden rounded-[40px] border-[8px] border-slate-900 bg-white shadow-2xl">
        {children}
      </div>
    </div>
  )
}
