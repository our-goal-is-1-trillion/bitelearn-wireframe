import QuizFooter from "@/components/layout/QuizFooter"
import QuestionPassage from "@/components/common/QuestionPassage"

type ChoiceQuestionPassageProps = {
  /** 지문 텍스트 */
  passage: string
  /** 지문 아래 플레이버 텍스트 */
  flavorText: string
  /**
   * 지문 표시 모드
   * - "text"  : 일반 텍스트 카드 (기본값)
   * - "story" : 대화형 버블 (추후 확장 예정)
   */
  passageMode?: "text" | "story"
  /** "문제 풀기" 버튼 클릭 핸들러 */
  onSolve: () => void
  /** 스크롤형 인라인 퀴즈 등에서 "문제 풀기" 버튼을 안 보이게 할 때 사용 */
  hideSolveButton?: boolean
}

/**
 * 객관식 퀴즈의 지문(문제) 화면.
 * 지문 카드와 플레이버 텍스트를 표시하고,
 * 하단 "문제 풀기" 버튼으로 보기 화면으로 전환한다.
 */
export default function ChoiceQuestionPassage({
  passage,
  flavorText,
  passageMode = "text",
  onSolve,
  hideSolveButton = false,
}: ChoiceQuestionPassageProps) {
  return (
    <>
      {/* 스크롤 가능한 콘텐츠 영역 */}
      <section className="flex-1 overflow-y-auto px-6 py-4" data-mode={passageMode}>
        <QuestionPassage
          passage={passage}
          flavorText={flavorText}
        />
      </section>

      {/* Footer — "문제 풀기" CTA (숨김 처리되지 않았을 때만 렌더링) */}
      {!hideSolveButton && (
        <QuizFooter onClick={onSolve}>
          문제 풀기
        </QuizFooter>
      )}
    </>
  )
}
