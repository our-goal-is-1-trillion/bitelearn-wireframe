import QuizPlayer from "@/components/features/quiz/QuizPlayer"
import { MOCK_CHOICE_QUESTION_SET } from "@/data/mock/choiceQuestion"

type ChoiceQuestionProps = {
  onComplete?: (total: number, correctCount: number) => void
}

export default function ChoiceQuestion({ onComplete }: ChoiceQuestionProps) {
  const questions = MOCK_CHOICE_QUESTION_SET.questions.filter(
    (q) => q.type === "quiz" && q.passageMode !== "document" && q.choiceMode !== "document_select"
  )

  return (
    <QuizPlayer
      questions={questions}
      headerTitle="지문형 퀴즈"
      onComplete={(total, correct) => onComplete?.(total, correct)}
    />
  )
}
