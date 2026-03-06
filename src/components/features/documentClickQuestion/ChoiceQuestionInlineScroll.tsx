import { useRef, useState } from "react"
import QuizHeader from "@/components/layout/QuizHeader"
import ChoiceQuestionIndicator, { type StepIndicatorInfo } from "./ChoiceQuestionIndicator"
import ChoiceQuestionImage from "./ChoiceQuestionImage"
import ChoiceQuestionPassage from "./ChoiceQuestionPassage"
import ChoiceQuestionChoices from "./ChoiceQuestionChoices"
import ChoiceQuestionOXChoices from "./ChoiceQuestionOXChoices"
import ChoiceQuestionResult from "./ChoiceQuestionResult"
import { MOCK_CHOICE_QUESTION_SET } from "@/data/mock/choiceQuestion"

type Phase = "passage" | "choices" | "checking" | "result"

type ChoiceQuestionInlineScrollProps = {
  onComplete?: (total: number, correctCount: number) => void
}

function getQuizTypeLabel(
  passageMode: "text" | "story" | "conversation" | "document" | undefined,
  choiceMode: "multiple" | "ox" | "document_select" | undefined
): string {
  const passageLabel = passageMode === "story" ? "상황 지문형" : "지문형"
  const choiceLabel = choiceMode === "ox" ? "OX 퀴즈" : "객관식 퀴즈"
  return `${choiceLabel} (${passageLabel} - Inline Scroll)`
}

export default function ChoiceQuestionInlineScroll({ onComplete }: ChoiceQuestionInlineScrollProps) {
  const quizQuestions = MOCK_CHOICE_QUESTION_SET.questions.filter((q) => q.type === "quiz")
  const quizSet = {
    ...MOCK_CHOICE_QUESTION_SET,
    questions: quizQuestions.slice(0, 1),
  }

  const [currentIndex, setCurrentIndex] = useState(0)
  const [phase, setPhase] = useState<Phase>("choices") // 스크롤 버전은 처음부터 choices가 보임
  const [selectedChoice, setSelectedChoice] = useState("")
  const [metrics, setMetrics] = useState<("none" | "correct" | "incorrect")[]>(
    Array(quizSet.questions.length).fill("none")
  )
  const screenRef = useRef<HTMLElement | null>(null)

  const currentQuestion = quizSet.questions[currentIndex]
  const isLastQuestion = currentIndex >= quizSet.questions.length - 1
  const isCorrect = selectedChoice !== "" && Number(selectedChoice) === currentQuestion.correctIndex

  const passageMode = currentQuestion.passageMode ?? "text"
  const choiceMode = currentQuestion.choiceMode ?? "multiple"
  const quizTypeLabel = getQuizTypeLabel(passageMode, choiceMode)

  const handleCheckAnswer = (selectedIndex?: number | React.MouseEvent) => {
    const isEvent = selectedIndex && typeof selectedIndex !== "number";
    const resolvedChoice =
      !isEvent && selectedIndex !== undefined ? String(selectedIndex) : selectedChoice
    if (resolvedChoice === "") return

    const correct = Number(resolvedChoice) === currentQuestion.correctIndex
    setSelectedChoice(resolvedChoice)
    setPhase("checking")
    setMetrics((prev) => {
      const next = [...prev]
      next[currentIndex] = correct ? "correct" : "incorrect"
      return next
    })
    setTimeout(() => setPhase("result"), 1400)
  }

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      if (onComplete) {
        const correctCount = metrics.filter((m) => m === "correct").length
        onComplete(quizSet.questions.length, correctCount)
      }
      return
    }

    setCurrentIndex((prev) => prev + 1)
    setPhase("choices")
    setSelectedChoice("")
  }

  const indicatorSteps: StepIndicatorInfo[] = quizSet.questions.map((q, idx) => ({
    type: q.type || "quiz",
    status: metrics[idx],
    isCurrent: idx === currentIndex,
  }))

  return (
    <main ref={screenRef} className="relative mx-auto h-[812px] w-[375px] overflow-hidden bg-slate-50 text-slate-900 border border-slate-200">
      <div className="flex h-full flex-col pb-20 pt-14 text-sm relative">
        {/* Header (고정) */}
        <div className="absolute inset-x-0 top-0 z-20 bg-white">
          <QuizHeader title={quizTypeLabel} showCloseButton onCloseClick={() => window.history.back()} />
        </div>

        {phase !== "result" && (
          <div className="flex-1 overflow-y-auto">
            {/* 진행도 바 */}
            <ChoiceQuestionIndicator steps={indicatorSteps} />
            {/* 문제 이미지 */}
            <ChoiceQuestionImage src={currentQuestion.imageUrl} alt={currentQuestion.imageAlt} />

            {/* 인라인 스크롤 모드: 지문 영역과 선택지 영역이 스크롤 안에서 연달아 표시됨 */}
            {/* 지문 영역 (스크롤 버전 전용 커스텀 스타일링 필요 시 대비) */}
            <div className="bg-white border-b border-slate-100 shadow-sm mb-6">
              <ChoiceQuestionPassage
                passage={currentQuestion.passage}
                flavorText={currentQuestion.flavorText}
                passageMode={passageMode as "text" | "story"}
                onSolve={() => {}} // 인라인이므로 풀기 버튼의 스크린 전환 역할 비활성화 가능하지만 하위호환 유지
                hideSolveButton={true} // 스크롤형에서는 onSolve 버튼 숨김을 위한 prop (ChoiceQuestionPassage 수정 필요)
              />
            </div>

            {/* 선택지 영역 */}
            <div className="bg-white py-6">
              {choiceMode === "ox" ? (
                <ChoiceQuestionOXChoices
                  questionNumber={currentIndex + 1}
                  question={currentQuestion.question}
                  correctIndex={currentQuestion.correctIndex}
                  onCheckAnswer={handleCheckAnswer}
                  isChecking={phase === "checking"}
                />
              ) : (
                <ChoiceQuestionChoices
                  questionNumber={currentIndex + 1}
                  question={currentQuestion.question}
                  choices={currentQuestion.choices}
                  choiceMode={choiceMode as "multiple" | "document_select"}
                  selectedValue={selectedChoice}
                  onSelectChoice={setSelectedChoice}
                  onCheckAnswer={handleCheckAnswer}
                  isChecking={phase === "checking"}
                  correctIndex={currentQuestion.correctIndex}
                />
              )}
            </div>
          </div>
        )}

        {phase === "result" && (
          <div className="absolute inset-x-0 bottom-0 top-14 bg-white z-30">
            <ChoiceQuestionResult
              isCorrect={isCorrect}
              explanation={currentQuestion.explanation}
              documentCard={currentQuestion.documentCard}
              correctIndex={currentQuestion.correctIndex}
              selectedAnswerIndex={selectedChoice !== "" ? Number(selectedChoice) : undefined}
              characterImageUrl={isCorrect ? currentQuestion.characterCorrectImageUrl : currentQuestion.characterIncorrectImageUrl}
              isLastQuestion={isLastQuestion}
              onNext={handleNextQuestion}
            />
          </div>
        )}
      </div>
    </main>
  )
}
