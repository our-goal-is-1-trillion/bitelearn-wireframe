import { useRef, useState } from "react"
import QuizHeader from "@/components/layout/QuizHeader"
import ChoiceQuestionIndicator, { type StepIndicatorInfo } from "@/components/features/choiceQuestion/ChoiceQuestionIndicator"
import ChoiceQuestionPassage from "@/components/features/choiceQuestion/ChoiceQuestionPassage"
import ChoiceQuestionOXChoices from "@/components/features/choiceQuestion/ChoiceQuestionOXChoices"
import ChoiceQuestionResult from "@/components/features/choiceQuestion/ChoiceQuestionResult"
import { MOCK_CHOICE_QUESTION_SET } from "@/data/mock/choiceQuestion"

type Phase = "passage" | "choices" | "checking" | "result"

type OxQuestionBottomSheetProps = {
  onComplete?: (total: number, correctCount: number) => void
}

export default function OxQuestionBottomSheet({ onComplete }: OxQuestionBottomSheetProps) {
  const oxQuestions = MOCK_CHOICE_QUESTION_SET.questions.filter(
    (q) => q.type === "quiz" && q.choiceMode === "ox"
  )
  const quizSet = {
    ...MOCK_CHOICE_QUESTION_SET,
    title: "OX 퀴즈 (지문형 - Bottom Sheet)",
    questions: oxQuestions,
  }

  const [currentIndex, setCurrentIndex] = useState(0)
  const [phase, setPhase] = useState<Phase>("passage")
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

  const handleSolve = () => setPhase("choices")

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
    setPhase("passage")
    setSelectedChoice("")
  }

  const indicatorSteps: StepIndicatorInfo[] = quizSet.questions.map((q, idx) => ({
    type: (q.type || "quiz") as "word" | "learning" | "quiz",
    status: metrics[idx] as "none" | "correct" | "incorrect",
    isCurrent: idx === currentIndex,
  }))

  return (
    <main ref={screenRef} className="relative mx-auto h-[812px] w-[375px] overflow-hidden bg-white text-slate-900">
      <div className="relative flex h-full flex-col border border-slate-200 pb-20 pt-14">
        {/* Header */}
        <div className="absolute inset-x-0 top-0 z-20 bg-white">
          <QuizHeader
            title="OX 퀴즈 (지문형 - Bottom Sheet)"
            showCloseButton
            onCloseClick={() => window.history.back()}
          />
        </div>

        <ChoiceQuestionIndicator steps={indicatorSteps} />

        {phase !== "result" && (
          <>
            {/* 바텀 시트 모드: 지문(Passage)은 항상 깔려 있음. */}
            <ChoiceQuestionPassage
              passage={currentQuestion.passage}
              flavorText={currentQuestion.flavorText}
              passageMode="text"
              onSolve={handleSolve}
            />

            {/* 바텀 시트 (선택지 & 정답 확인) */}
            {(phase === "choices" || phase === "checking") && (
              <>
                {/* 딤 배경 */}
                <div 
                  className="absolute inset-0 z-30 bg-black/40 animate-in fade-in duration-300"
                  onClick={() => setPhase("passage")} // 배경 탭 시 시트 닫기
                />
                
                {/* 바텀 시트 컨테이너 */}
                <div className="absolute inset-x-0 bottom-0 top-1/4 z-40 flex flex-col rounded-t-3xl bg-white shadow-2xl animate-in slide-in-from-bottom duration-300">
                  {/* 시트 핸들러 (디자인 요소) */}
                  <div className="flex h-6 w-full shrink-0 items-center justify-center pt-3 pb-1">
                    <div className="h-1.5 w-12 rounded-full bg-slate-300" />
                  </div>
                  
                  <ChoiceQuestionOXChoices
                    questionNumber={currentIndex + 1}
                    question={currentQuestion.question}
                    correctIndex={currentQuestion.correctIndex}
                    onCheckAnswer={handleCheckAnswer}
                    isChecking={phase === "checking"}
                    onPrevious={() => setPhase("passage")}
                  />
                </div>
              </>
            )}
          </>
        )}

        {phase === "result" && (
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
        )}
      </div>
    </main>
  )
}
