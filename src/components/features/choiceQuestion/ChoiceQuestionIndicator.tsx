import { cn } from "@/lib/utils"

export type StepIndicatorInfo = {
  /** word: 단어장, learning: 내용학습, quiz: 문제풀이 */
  type: "word" | "learning" | "quiz"
  /** 현재 해결 상태 */
  status: "none" | "correct" | "incorrect"
  /** 현재 위치 여부 */
  isCurrent: boolean
}

type ChoiceQuestionIndicatorProps = {
  steps: StepIndicatorInfo[]
}

/** 
 * 퀴즈/학습 진행도를 표시하는 Dot 인디케이터 
 * 필수적인 시멘틱 컬러(정답/오답/학습)를 사용하여 직관적인 피드백을 제공합니다.
 */
export default function ChoiceQuestionIndicator({
  steps,
}: ChoiceQuestionIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-2.5 px-6 py-4">
      {steps.map((step, index) => {
        // 1. 기본 색상 결정 (타입 및 상태 기준)
        let bgColor = "bg-slate-200" // 미진행

        if (step.type === "word" || step.type === "learning") {
          bgColor = step.isCurrent ? "bg-indigo-600" : (step.isCurrent === false && step.status !== "none" ? "bg-indigo-400" : "bg-indigo-200") // 학습 단계
        } else if (step.type === "quiz") {
          if (step.status === "correct") {
            bgColor = "bg-emerald-500" // 정답: 녹색
          } else if (step.status === "incorrect") {
            bgColor = "bg-rose-500" // 오답: 빨간색
          } else if (step.isCurrent) {
            bgColor = "bg-slate-600" // 현재 풀고 있는 문제
          }
        }

        // 2. 현재 위치 강조 스타일 (Spring-like easing applied)
        const currentClass = step.isCurrent 
          ? "w-2.5 h-2.5 ring-4 ring-slate-100 shadow-sm opacity-100" 
          : "w-1.5 h-1.5 opacity-60"

        return (
          <div
            key={index}
            className={cn(
              "rounded-full transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
              bgColor,
              currentClass
            )}
          />
        )
      })}
    </div>
  )
}
