import { useRef, useState } from "react"
import QuizHeader from "@/components/layout/QuizHeader"
import ChoiceQuestionIndicator, { type StepIndicatorInfo } from "./ChoiceQuestionIndicator"
import ChoiceQuestionPassage from "./ChoiceQuestionPassage"
import ChoiceQuestionChoices from "./ChoiceQuestionChoices"
import ChoiceQuestionOXChoices from "./ChoiceQuestionOXChoices"
import ChoiceQuestionResult from "./ChoiceQuestionResult"
import { MOCK_CHOICE_QUESTION_SET } from "@/data/mock/choiceQuestion"

type Phase = "passage" | "choices" | "checking" | "result"

type DocumentChoiceQuestionProps = {
  onComplete?: (total: number, correctCount: number) => void
}

function getQuizTypeLabel() {
  return "서류 오답 찾기 퀴즈"
}

export default function DocumentChoiceQuestion({ onComplete }: DocumentChoiceQuestionProps) {
  const quizQuestions = MOCK_CHOICE_QUESTION_SET.questions.filter(
    (q) => q.type === "quiz" && q.passageMode === "document"
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
    setMetrics((prev) => {
      const next = [...prev]
      next[currentIndex] = correct ? "correct" : "incorrect"
      return next
    })
    setTimeout(() => setPhase("result"), 1400)
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

  const getDocumentFieldText = (index: number) => {
    const field = currentQuestion.documentCard?.fields?.[index]
    if (!field) return ""
    return `${field.label}: ${field.value}`
  }

  const correctAnswerText =
    choiceMode === "document_select"
      ? getDocumentFieldText(currentQuestion.correctIndex)
      : currentQuestion.choices[currentQuestion.correctIndex] ?? ""

  const selectedAnswerText =
    selectedChoice === ""
      ? ""
      : choiceMode === "document_select"
        ? getDocumentFieldText(Number(selectedChoice))
        : currentQuestion.choices[Number(selectedChoice)] ?? ""

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
            passageMode="document"
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
        if (choiceMode === "ox") {
          return (
            <ChoiceQuestionOXChoices
              questionNumber={currentIndex + 1}
              question={currentQuestion.question}
              correctIndex={currentQuestion.correctIndex}
              onCheckAnswer={handleCheckAnswer}
              isChecking={phase === "checking"}
              onPrevious={() => setPhase("passage")}
            />
          )
        }

        return (
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
        )
      case "result":
        return (
          <ChoiceQuestionResult
            isCorrect={isCorrect}
            correctAnswerText={correctAnswerText}
            selectedAnswerText={selectedAnswerText}
            explanation={currentQuestion.explanation}
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
