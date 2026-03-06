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

type ChoiceQuestionProps = {
  onComplete?: (total: number, correctCount: number) => void
}

function getQuizTypeLabel(
  passageMode: "text" | "story" | "conversation" | "document" | undefined,
  choiceMode: "multiple" | "ox" | "document_select" | undefined
): string {
  const passageLabel = passageMode === "story" ? "상황 지문형" : "지문형"
  const choiceLabel = choiceMode === "ox" ? "OX 퀴즈" : "객관식 퀴즈"
  return `${choiceLabel} (${passageLabel} - Bottom Sheet)`
}

export default function ChoiceQuestionBottomSheet({ onComplete }: ChoiceQuestionProps) {
  const quizQuestions = MOCK_CHOICE_QUESTION_SET.questions.filter((q) => q.type === "quiz")
  const quizSet = {
    ...MOCK_CHOICE_QUESTION_SET,
    questions: quizQuestions.slice(0, 1),
  }

  const [currentIndex, setCurrentIndex] = useState(0)
  const [phase, setPhase] = useState<Phase>("passage")
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

  const handleSolve = () => {
    setPhase("choices")
  }

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
    setPhase("passage")
    setSelectedChoice("")
  }

  const indicatorSteps: StepIndicatorInfo[] = quizSet.questions.map((q, idx) => ({
    type: q.type || "quiz",
    status: metrics[idx],
    isCurrent: idx === currentIndex,
  }))

  return (
    <main ref={screenRef} className="relative mx-auto h-[812px] w-[375px] overflow-hidden bg-white text-slate-900">
      <div className="relative flex h-full flex-col border border-slate-200 pb-20 pt-14">
        {/* Header */}
        <div className="absolute inset-x-0 top-0 z-20 bg-white">
          <QuizHeader title={quizTypeLabel} showCloseButton onCloseClick={() => window.history.back()} />
        </div>

        {phase !== "result" && (
          <>
            <ChoiceQuestionIndicator steps={indicatorSteps} />
            <ChoiceQuestionImage src={currentQuestion.imageUrl} alt={currentQuestion.imageAlt} />
            
            {/* 
              바텀 시트 모드: 지문(Passage)은 항상 깔려 있음.
              onSolve 누를시 'choices' 페이즈로 전환되면서 바텀 시트가 덮어 올라옴 
            */}
            <ChoiceQuestionPassage
              passage={currentQuestion.passage}
              flavorText={currentQuestion.flavorText}
              passageMode={passageMode as "text" | "story"}
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
                  
                  {choiceMode === "ox" ? (
                    <ChoiceQuestionOXChoices
                      questionNumber={currentIndex + 1}
                      question={currentQuestion.question}
                      correctIndex={currentQuestion.correctIndex}
                      onCheckAnswer={handleCheckAnswer}
                      isChecking={phase === "checking"}
                      onPrevious={() => setPhase("passage")}
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
                      onPrevious={() => setPhase("passage")}
                    />
                  )}
                </div>
              </>
            )}
          </>
        )}

        {phase === "result" && (
          <ChoiceQuestionResult
            isCorrect={isCorrect}
            explanation={currentQuestion.explanation}
            characterImageUrl={isCorrect ? currentQuestion.characterCorrectImageUrl : currentQuestion.characterIncorrectImageUrl}
            isLastQuestion={isLastQuestion}
            onNext={handleNextQuestion}
          />
        )}
      </div>
    </main>
  )
}
