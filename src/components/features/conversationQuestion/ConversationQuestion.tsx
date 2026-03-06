import QuizPlayer from "@/components/features/quiz/QuizPlayer"
import { MOCK_CHOICE_QUESTION_SET } from "@/data/mock/choiceQuestion"

type ConversationQuestionProps = {
  onComplete?: (total: number, correctCount: number) => void
}

export default function ConversationQuestion({ onComplete }: ConversationQuestionProps) {
  const questions = MOCK_CHOICE_QUESTION_SET.questions.filter(
    (q) => q.passageMode === "conversation"
  )

  const fallback = questions.length > 0
    ? questions
    : MOCK_CHOICE_QUESTION_SET.questions.slice(0, 1)

  return (
    <QuizPlayer
      questions={fallback}
      headerTitle="상황형 퀴즈"
      onComplete={(total, correct) => onComplete?.(total, correct)}
    />
  )
}
