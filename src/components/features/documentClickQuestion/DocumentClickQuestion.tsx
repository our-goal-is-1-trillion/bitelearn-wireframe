import { useRef, useState } from "react"
import QuizHeader from "@/components/layout/QuizHeader"
import QuizFooter from "@/components/layout/QuizFooter"
import ChoiceQuestionIndicator, { type StepIndicatorInfo } from "./ChoiceQuestionIndicator"
import ChoiceQuestionImage from "./ChoiceQuestionImage"
import ChoiceQuestionPassage from "./ChoiceQuestionPassage"
import ChoiceQuestionChoices from "./ChoiceQuestionChoices"
import ChoiceQuestionResult from "./ChoiceQuestionResult"
import { MOCK_CHOICE_QUESTION_SET } from "@/data/mock/choiceQuestion"

type Phase = "passage" | "choices" | "checking" | "result"

type DocumentChoiceQuestionProps = {
  onComplete?: (total: number, correctCount: number) => void
}

function getQuizTypeLabel() {
  return "서류 정밀 검토"
}

export default function DocumentClickQuestion({ onComplete }: DocumentChoiceQuestionProps) {
  const quizQuestions = MOCK_CHOICE_QUESTION_SET.questions.filter(
    (q) => q.type === "quiz" && q.choiceMode === "document_select"
  )
  const quizSet = {
    ...MOCK_CHOICE_QUESTION_SET,
    questions: quizQuestions,
  }

  const [currentIndex, setCurrentIndex] = useState(0)
  const [phase, setPhase] = useState<Phase>("passage")
  const [selectedChoice, setSelectedChoice] = useState("")
  const [metrics, setMetrics] = useState<("none" | "correct" | "incorrect")[]>(
    Array(quizSet.questions.length).fill("none")
  )
  const screenRef = useRef<HTMLElement | null>(null)

  const currentQuestion = quizSet.questions[currentIndex]
  const passageModeForPassage =
    currentQuestion.passageMode === "document" ||
    currentQuestion.passageMode === "text" ||
    currentQuestion.passageMode === "story"
      ? currentQuestion.passageMode
      : "text"
  const isLastQuestion = currentIndex >= quizSet.questions.length - 1
  const isCorrect = selectedChoice !== "" && Number(selectedChoice) === currentQuestion.correctIndex
  const choiceMode = currentQuestion.choiceMode ?? "multiple"

  const handleSolve = () => setPhase("choices")

  const handleCheckAnswer = (selectedIndex?: number | React.MouseEvent) => {
    const isEvent = selectedIndex && typeof selectedIndex !== "number"
    const resolvedChoice =
      !isEvent && selectedIndex !== undefined ? String(selectedIndex) : selectedChoice
    if (resolvedChoice === "") return

    const correct = Number(resolvedChoice) === currentQuestion.correctIndex
    setSelectedChoice(resolvedChoice)
    
    setPhase("checking")
    
    setTimeout(() => {
      setMetrics((prev) => {
        const next = [...prev]
        next[currentIndex] = correct ? "correct" : "incorrect"
        return next
      })
      setPhase("result")
    }, 2400)
  }

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      const correctCount = metrics.filter((m) => m === "correct").length
      if (onComplete) {
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

  const renderPhaseContent = () => {
    switch (phase) {
      case "passage":
        return (
          <ChoiceQuestionPassage
            passage={currentQuestion.passage}
            flavorText={currentQuestion.flavorText}
            passageMode={passageModeForPassage}
            documentCard={currentQuestion.documentCard}
            choiceMode={choiceMode}
            selectedValue={selectedChoice}
            onSelectDocumentField={setSelectedChoice}
            correctIndex={currentQuestion.correctIndex}
            onSolve={handleSolve}
          />
        )
      case "choices":
      case "checking":
        if (choiceMode === "document_select") {
          return (
            <>
              <ChoiceQuestionPassage
                passage={currentQuestion.passage}
                flavorText={currentQuestion.flavorText}
                questionText={currentQuestion.question}
                questionNumber={currentIndex + 1}
                hidePassage
                hideFlavorText
                passageMode="document"
                documentCard={currentQuestion.documentCard}
                choiceMode={choiceMode}
                selectedValue={selectedChoice}
                onSelectDocumentField={setSelectedChoice}
                isChecking={phase === "checking"}
                correctIndex={currentQuestion.correctIndex}
                onSolve={() => {}}
                hideSolveButton
              />
              <QuizFooter
                disabled={selectedChoice === "" || phase === "checking"}
                previousDisabled={phase === "checking"}
                onClick={handleCheckAnswer}
                onPrevious={() => setPhase("passage")}
              >
                {phase === "checking" ? "서류 스캔 중..." : "정답 확인하기"}
              </QuizFooter>
            </>
          )
        }
        return null
      case "result":
        return (
          <ChoiceQuestionResult
            isCorrect={isCorrect}
            explanation={currentQuestion.explanation}
            documentCard={currentQuestion.documentCard}
            correctIndex={currentQuestion.correctIndex}
            selectedAnswerIndex={selectedChoice !== "" ? Number(selectedChoice) : undefined}
            characterImageUrl={
              isCorrect
                ? (currentQuestion.characterCorrectImageUrl || "/images/result/dog_perfect.png")
                : (currentQuestion.characterIncorrectImageUrl || "/images/result/dog_fail.png")
            }
            isLastQuestion={isLastQuestion}
            onNext={handleNextQuestion}
          />
        )
    }
  }

  return (
    <main
      ref={screenRef}
      className="relative mx-auto h-[812px] w-[375px] overflow-hidden bg-white text-slate-900"
    >
      <div className="relative flex h-full flex-col border border-slate-200 pt-14">
        <div className="absolute inset-x-0 top-0 z-20 bg-white">
          <QuizHeader title={getQuizTypeLabel()} showCloseButton={false} />
        </div>

        {phase !== "result" && (
          <div className="px-6 py-2">
            <ChoiceQuestionIndicator steps={indicatorSteps} />
          </div>
        )}

        {renderPhaseContent()}
      </div>
    </main>
  )
}
