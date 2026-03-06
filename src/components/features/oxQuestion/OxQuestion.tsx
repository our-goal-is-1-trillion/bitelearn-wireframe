import { useState } from "react"
import QuizHeader from "@/components/layout/QuizHeader"
import ChoiceQuestionIndicator from "@/components/features/choiceQuestion/ChoiceQuestionIndicator"
import ChoiceQuestionImage from "@/components/features/choiceQuestion/ChoiceQuestionImage"
import ChoiceQuestionPassage from "@/components/features/choiceQuestion/ChoiceQuestionPassage"
import ChoiceQuestionOXChoices from "@/components/features/choiceQuestion/ChoiceQuestionOXChoices"
import ChoiceQuestionResult from "@/components/features/choiceQuestion/ChoiceQuestionResult"
import { MOCK_CHOICE_QUESTION_SET } from "@/data/mock/choiceQuestion"

type Phase = "passage" | "choices" | "checking" | "result"

type OxQuestionProps = {
  onComplete?: (total: number, correctCount: number) => void
}

/**
 * 지문형 OX 퀴즈 페이지.
 * Mock 데이터 중 choiceMode: "ox" 인 문제만 사용한다.
 */
export default function OxQuestion({ onComplete }: OxQuestionProps) {
  const oxQuestions = MOCK_CHOICE_QUESTION_SET.questions.filter(
    (q) => q.type === "quiz" && q.choiceMode === "ox"
  )
  const quizSet = {
    ...MOCK_CHOICE_QUESTION_SET,
    title: "OX 퀴즈 (지문형)",
    questions: oxQuestions,
  }

  const [currentIndex, setCurrentIndex] = useState(0)
  const [phase, setPhase] = useState<Phase>("passage")
  const [selectedChoice, setSelectedChoice] = useState("")
  const [metrics, setMetrics] = useState<("none" | "correct" | "incorrect")[]>(
    Array(quizSet.questions.length).fill("none")
  )

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

  const handleCheckAnswer = (selectedIndex: number) => {
    const correct = selectedIndex === currentQuestion.correctIndex
    setSelectedChoice(String(selectedIndex))
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

  const indicatorSteps = quizSet.questions.map((q, idx) => ({
    type: (q.type || "quiz") as "word" | "learning" | "quiz",
    status: metrics[idx] as "none" | "correct" | "incorrect",
    isCurrent: idx === currentIndex,
  }))

  const renderPhaseContent = () => {
    switch (phase) {
      case "passage":
        return (
          <ChoiceQuestionPassage
            passage={currentQuestion.passage}
            flavorText={currentQuestion.flavorText}
            passageMode="text"
            onSolve={handleSolve}
          />
        )
      case "choices":
      case "checking":
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
      case "result":
        return (
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
        )
    }
  }

  return (
    <main className="relative mx-auto h-[812px] w-[375px] overflow-hidden bg-white text-slate-900">
      <div className="relative flex h-full flex-col border border-slate-200 pt-14">
        <div className="absolute inset-x-0 top-0 z-20 bg-white">
          <QuizHeader
            title="OX 퀴즈 (지문형)"
            showCloseButton
            onCloseClick={() => window.history.back()}
          />
        </div>

        {phase !== "result" && (
          <>
            <ChoiceQuestionIndicator steps={indicatorSteps} />
            <ChoiceQuestionImage src={currentQuestion.imageUrl} alt={currentQuestion.imageAlt} />
          </>
        )}

        {renderPhaseContent()}
      </div>
    </main>
  )
}
