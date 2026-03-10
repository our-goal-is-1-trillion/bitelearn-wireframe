import QuizPlayer from "@/components/features/quiz/QuizPlayer"
import { MOCK_CHOICE_QUESTION_SET } from "@/data/mock/choiceQuestion"

type DocumentClickQuestionProps = {
  onComplete?: (total: number, correctCount: number) => void
  demoState?: React.ComponentProps<typeof QuizPlayer>["demoState"]
}

export default function DocumentClickQuestion({ onComplete, demoState }: DocumentClickQuestionProps) {
  const questions = MOCK_CHOICE_QUESTION_SET.questions.filter(
    (q) => q.type === "quiz" && q.choiceMode === "document_select"
  )

  return (
    <QuizPlayer
      questions={questions}
      headerTitle="서류 오답 찾기"
      onComplete={(total, correct) => onComplete?.(total, correct)}
      demoState={demoState}
    />
  )
}
