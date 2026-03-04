import { useRef, useState } from "react"
import QuizHeader from "@/components/layout/QuizHeader"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import ChoiceQuestionProgressBar, { type StepIndicatorInfo } from "./ChoiceQuestionProgressBar"
import ChoiceQuestionImage from "./ChoiceQuestionImage"
import ChoiceQuestionPassage from "./ChoiceQuestionPassage"
import ChoiceQuestionChoices from "./ChoiceQuestionChoices"
import ChoiceQuestionResult from "./ChoiceQuestionResult"
import { MOCK_CHOICE_QUESTION_SET } from "@/data/mock/choiceQuestion"

type Phase = "passage" | "choices" | "checking" | "result"

type ChoiceQuestionProps = {
  onComplete?: () => void
}

export default function ChoiceQuestion({ onComplete }: ChoiceQuestionProps) {
  const quizSet = MOCK_CHOICE_QUESTION_SET
  const [currentIndex, setCurrentIndex] = useState(0)
  const [phase, setPhase] = useState<Phase>("passage")
  const [selectedChoice, setSelectedChoice] = useState("")
  const [isChoiceSheetOpen, setIsChoiceSheetOpen] = useState(false)
  const [metrics, setMetrics] = useState<("none" | "correct" | "incorrect")[]>(
    Array(quizSet.questions.length).fill("none")
  )
  const screenRef = useRef<HTMLElement | null>(null)

  const currentQuestion = quizSet.questions[currentIndex]
  const isLastQuestion = currentIndex >= quizSet.questions.length - 1
  const isCorrect = selectedChoice !== "" && Number(selectedChoice) === currentQuestion.correctIndex

  const handleSolve = () => {
    setPhase("choices")
    setIsChoiceSheetOpen(true)
  }

  const handleCheckAnswer = () => {
    setPhase("checking")
    setMetrics((prev) => {
      const next = [...prev]
      next[currentIndex] = isCorrect ? "correct" : "incorrect"
      return next
    })

    setTimeout(() => {
      setIsChoiceSheetOpen(false)
      setPhase("result")
    }, 1400)
  }

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      if (onComplete) onComplete()
      return
    }

    setCurrentIndex((prev) => prev + 1)
    setPhase("passage")
    setSelectedChoice("")
  }

  const handleCloseChoiceSheet = () => {
    if (phase === "checking") return
    setIsChoiceSheetOpen(false)
    setPhase("passage")
  }

  const indicatorSteps: StepIndicatorInfo[] = quizSet.questions.map((q, idx) => ({
    type: q.type || "quiz",
    status: metrics[idx],
    isCurrent: idx === currentIndex,
  }))

  const renderMainContent = () => {
    switch (phase) {
      case "result":
        return (
          <ChoiceQuestionResult
            isCorrect={isCorrect}
            correctAnswerText={currentQuestion.choices[currentQuestion.correctIndex]}
            selectedAnswerText={selectedChoice !== "" ? currentQuestion.choices[Number(selectedChoice)] : ""}
            explanation={currentQuestion.explanation}
            characterImageUrl={isCorrect ? currentQuestion.characterCorrectImageUrl : currentQuestion.characterIncorrectImageUrl}
            isLastQuestion={isLastQuestion}
            onNext={handleNextQuestion}
          />
        )
      case "passage":
      case "choices":
      case "checking":
      default:
        return (
          <ChoiceQuestionPassage
            passage={currentQuestion.passage}
            flavorText={currentQuestion.flavorText}
            onSolve={handleSolve}
          />
        )
    }
  }

  return (
    <main ref={screenRef} className="relative mx-auto h-[812px] w-[375px] overflow-hidden bg-white text-slate-900">
      <div
        className={cn(
          "relative flex h-full flex-col border border-slate-200 pb-20 pt-14",
          isChoiceSheetOpen ? "overflow-hidden" : ""
        )}
      >
        <div className="absolute inset-x-0 top-0 z-20 bg-white">
          <QuizHeader title={quizSet.title} showCloseButton onCloseClick={() => window.history.back()} />
        </div>

        {phase !== "result" && (
          <>
            <ChoiceQuestionProgressBar steps={indicatorSteps} />
            <ChoiceQuestionImage src={currentQuestion.imageUrl} alt={currentQuestion.imageAlt} />
          </>
        )}

        {renderMainContent()}
      </div>

      <Sheet
        open={isChoiceSheetOpen}
        onOpenChange={(open) => {
          if (!open) {
            handleCloseChoiceSheet()
          }
        }}
      >
        <SheetContent
          side="bottom"
          container={screenRef.current}
          showCloseButton={false}
          overlayClassName="!absolute inset-0"
          className="!absolute inset-x-0 bottom-0 w-full rounded-t-2xl border-slate-200 p-0"
          onOpenAutoFocus={(event) => event.preventDefault()}
          onCloseAutoFocus={(event) => event.preventDefault()}
          onInteractOutside={(event) => {
            if (phase === "checking") {
              event.preventDefault()
            }
          }}
        >
          <div className="relative flex max-h-[85vh] flex-col pt-6">
            <ChoiceQuestionChoices
              questionNumber={currentQuestion.questionNumber}
              question={currentQuestion.question}
              choices={currentQuestion.choices}
              selectedValue={selectedChoice}
              onSelectChoice={setSelectedChoice}
              onCheckAnswer={handleCheckAnswer}
              isChecking={phase === "checking"}
              correctIndex={currentQuestion.correctIndex}
              onPrevious={handleCloseChoiceSheet}
            />
          </div>
        </SheetContent>
      </Sheet>
    </main>
  )
}
