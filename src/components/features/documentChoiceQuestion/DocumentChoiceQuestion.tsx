import QuizPlayer from "@/components/features/quiz/QuizPlayer"
import { MOCK_CHOICE_QUESTION_SET } from "@/data/mock/choiceQuestion"

type DocumentChoiceQuestionProps = {
  onComplete?: (total: number, correctCount: number) => void
  demoState?: React.ComponentProps<typeof QuizPlayer>["demoState"]
}

export default function DocumentChoiceQuestion({ onComplete, demoState }: DocumentChoiceQuestionProps) {
  const questions = MOCK_CHOICE_QUESTION_SET.questions.filter(
    (q) => q.type === "quiz" && q.passageMode === "document" && q.choiceMode !== "document_select"
  )

  return (
    <QuizPlayer
      questions={questions}
      headerTitle="서류 정밀 검토"
      onComplete={(total, correct) => onComplete?.(total, correct)}
      demoState={demoState}
    />
  )
}
