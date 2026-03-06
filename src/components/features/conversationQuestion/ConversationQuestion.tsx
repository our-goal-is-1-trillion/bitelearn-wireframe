import { useRef, useState } from "react"
import QuizHeader from "@/components/layout/QuizHeader"
import ChoiceQuestionIndicator, { type StepIndicatorInfo } from "../choiceQuestion/ChoiceQuestionIndicator"
import ChoiceQuestionImage from "../choiceQuestion/ChoiceQuestionImage"
import ConversationQuestionPassage from "./ConversationQuestionPassage"
import ChoiceQuestionChoices from "../choiceQuestion/ChoiceQuestionChoices"
import ChoiceQuestionOXChoices from "../choiceQuestion/ChoiceQuestionOXChoices"
import ChoiceQuestionResult from "../choiceQuestion/ChoiceQuestionResult"
import { MOCK_CHOICE_QUESTION_SET } from "@/data/mock/choiceQuestion"

type Phase = "passage" | "choices" | "checking" | "result"

type ConversationQuestionProps = {
  onComplete?: (total: number, correctCount: number) => void
}

/**
 * passageMode × choiceMode 조합으로 퀴즈 유형 레이블을 생성합니다.
 */
function getQuizTypeLabel(
  passageMode: "text" | "story" | "conversation" | "document" | undefined,
  choiceMode: "multiple" | "ox" | "document_select" | undefined
): string {
  const passageLabel = passageMode === "conversation" ? "대화 지문형" : "지문형"
  const choiceLabel = choiceMode === "ox" ? "OX 퀴즈" : "객관식 퀴즈"
  return `${choiceLabel} (${passageLabel})`
}

export default function ConversationQuestion({ onComplete }: ConversationQuestionProps) {
  // 대화형 지문 컴포넌트는 passageMode가 'conversation'인 문제만 필터링하여 보여줍니다.
  const quizQuestions = MOCK_CHOICE_QUESTION_SET.questions.filter((q) => q.passageMode === "conversation")
  const quizSet = {
    ...MOCK_CHOICE_QUESTION_SET,
    questions: quizQuestions.length > 0 ? quizQuestions : MOCK_CHOICE_QUESTION_SET.questions.slice(0, 1)
  }

  const [currentIndex, setCurrentIndex] = useState(0)
  const [phase, setPhase] = useState<Phase>("passage")
  const [selectedChoice, setSelectedChoice] = useState("")
  const [metrics, setMetrics] = useState<("none" | "correct" | "incorrect")[]>(
    Array(quizSet.questions.length).fill("none")
  )
  // 이미 대화를 다 본 문제 번호를 기억 → 뒤로 돌아올 때 애니메이션 스킵
  const [seenPassages, setSeenPassages] = useState<Set<number>>(new Set())
  const screenRef = useRef<HTMLElement | null>(null)

  const currentQuestion = quizSet.questions[currentIndex]
  const isLastQuestion = currentIndex >= quizSet.questions.length - 1
  const isCorrect = selectedChoice !== "" && Number(selectedChoice) === currentQuestion.correctIndex

  const passageMode = currentQuestion.passageMode ?? "conversation"
  const choiceMode = currentQuestion.choiceMode ?? "multiple"
  const quizTypeLabel = getQuizTypeLabel(passageMode, choiceMode)

  const handleSolve = () => {
    // 이 문제 대화를 다 봤다고 기록
    setSeenPassages((prev) => new Set(prev).add(currentIndex))
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

  const renderPhaseContent = () => {
    switch (phase) {
      case "passage":
        return (
          <ConversationQuestionPassage
            questionData={currentQuestion}
            onSolve={handleSolve}
            skipAnimation={seenPassages.has(currentIndex)}
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
            choiceMode={choiceMode}
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
            correctAnswerText={currentQuestion.choices[currentQuestion.correctIndex]}
            selectedAnswerText={selectedChoice !== "" ? currentQuestion.choices[Number(selectedChoice)] : ""}
            explanation={currentQuestion.explanation}
            characterImageUrl={isCorrect ? currentQuestion.characterCorrectImageUrl : currentQuestion.characterIncorrectImageUrl}
            isLastQuestion={isLastQuestion}
            onNext={handleNextQuestion}
          />
        )
    }
  }

  return (
    <main ref={screenRef} className="relative mx-auto h-[812px] w-[375px] overflow-hidden bg-white text-slate-900">
      <div className="relative flex h-full flex-col border border-slate-200 pt-14">
        <div className="absolute inset-x-0 top-0 z-20 bg-white">
          <QuizHeader title={quizTypeLabel} showCloseButton onCloseClick={() => window.history.back()} />
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
