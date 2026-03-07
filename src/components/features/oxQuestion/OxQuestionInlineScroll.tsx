import { useRef, useState } from "react"
import QuizHeader from "@/components/layout/QuizHeader"
import ChoiceQuestionIndicator, { type StepIndicatorInfo } from "@/components/features/choiceQuestion/ChoiceQuestionIndicator"
import ChoiceQuestionPassage from "@/components/features/choiceQuestion/ChoiceQuestionPassage"
import ChoiceQuestionOXChoices from "@/components/features/choiceQuestion/ChoiceQuestionOXChoices"
import ChoiceQuestionResult from "@/components/features/choiceQuestion/ChoiceQuestionResult"
import { MOCK_CHOICE_QUESTION_SET } from "@/data/mock/choiceQuestion"

type Phase = "passage" | "choices" | "checking" | "result"

type OxQuestionInlineScrollProps = {
  onComplete?: (total: number, correctCount: number) => void
}

export default function OxQuestionInlineScroll({ onComplete }: OxQuestionInlineScrollProps) {
  const oxQuestions = MOCK_CHOICE_QUESTION_SET.questions.filter(
    (q) => q.type === "quiz" && q.choiceMode === "ox"
  )
  const quizSet = {
    ...MOCK_CHOICE_QUESTION_SET,
    title: "OX 퀴즈 (지문형 - Inline Scroll)",
    questions: oxQuestions,
  }

  const [currentIndex, setCurrentIndex] = useState(0)
  const [phase, setPhase] = useState<Phase>("choices") // 스크롤 버전은 처음부터 choices가 보임
  const [selectedChoice, setSelectedChoice] = useState("")
  const [metrics, setMetrics] = useState<("none" | "correct" | "incorrect")[]>(
    Array(quizSet.questions.length).fill("none")
  )
  const screenRef = useRef<HTMLElement | null>(null)

  if (quizSet.questions.length === 0) {
    return (
      <main className="relative mx-auto h-[812px] w-[375px] overflow-hidden bg-white text-slate-900 flex items-center justify-center">
        <p className="text-slate-500">OX 퀴즈 데이터가 없습니다.</p>
        <button className="absolute top-4 left-4 p-2" onClick={() => window.history.back()}>←</button>
      </main>
    )
  }

  const currentQuestion = quizSet.questions[currentIndex]
  const isLastQuestion = currentIndex >= quizSet.questions.length - 1
  const isCorrect =
    selectedChoice !== "" && Number(selectedChoice) === currentQuestion.correctIndex

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
    setTimeout(() => setPhase("result"), 1200)
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
    type: (q.type || "quiz") as "word" | "learning" | "quiz",
    status: metrics[idx] as "none" | "correct" | "incorrect",
    isCurrent: idx === currentIndex,
  }))

  return (
    <main ref={screenRef} className="relative mx-auto h-[812px] w-[375px] overflow-hidden bg-slate-50 text-slate-900 border border-slate-200">
      <div className="flex h-full flex-col pb-20 pt-14 text-sm relative">
        {/* Header (고정) */}
        <div className="absolute inset-x-0 top-0 z-20 bg-white">
          <QuizHeader
            title="OX 퀴즈 (지문형 - Inline Scroll)"
            showCloseButton
            onCloseClick={() => window.history.back()}
          />
        </div>

        <div className="z-10 bg-white pb-2 relative border-b border-slate-100">
          <ChoiceQuestionIndicator steps={indicatorSteps} />
        </div>

        {phase !== "result" && (
          <div className="flex-1 overflow-y-auto">

            {/* 인라인 스크롤 모드: 지문 영역과 선택지 영역이 스크롤 안에서 연달아 표시됨 */}
            {/* 지문 영역 */}
            <div className="bg-white border-b border-slate-100 shadow-sm mb-6">
              <ChoiceQuestionPassage
                passage={currentQuestion.passage}
                flavorText={currentQuestion.flavorText}
                passageMode="text"
                onSolve={() => {}} // 인라인이므로 풀기 버튼의 스크린 전환 역할 비활성화 가능
                hideSolveButton={true} // 스크롤형에서는 onSolve 버튼 숨김을 위한 prop
              />
            </div>

            {/* 선택지 영역 */}
            <div className="bg-white py-6">
              <ChoiceQuestionOXChoices
                questionNumber={currentIndex + 1}
                question={currentQuestion.question}
                correctIndex={currentQuestion.correctIndex}
                onCheckAnswer={handleCheckAnswer}
                isChecking={phase === "checking"}
              />
            </div>
          </div>
        )}

        {phase === "result" && (
          <div className="flex min-h-0 flex-1 flex-col bg-white">
            <ChoiceQuestionResult
              isCorrect={isCorrect}
              correctAnswerText={currentQuestion.choices[currentQuestion.correctIndex]}
              selectedAnswerText={
                selectedChoice !== ""
                  ? currentQuestion.choices[Number(selectedChoice)]
                  : ""
              }
              explanation={currentQuestion.explanation}
              characterImageUrl={
                isCorrect
                  ? currentQuestion.characterCorrectImageUrl
                  : currentQuestion.characterIncorrectImageUrl
              }
              isLastQuestion={isLastQuestion}
              onNext={handleNextQuestion}
            />
          </div>
        )}
      </div>
    </main>
  )
}
