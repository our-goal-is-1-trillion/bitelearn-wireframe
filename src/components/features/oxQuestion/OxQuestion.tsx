import QuizPlayer from "@/components/features/quiz/QuizPlayer"
import { MOCK_CHOICE_QUESTION_SET } from "@/data/mock/choiceQuestion"

type OxQuestionProps = {
  onComplete?: (total: number, correctCount: number) => void
  demoState?: React.ComponentProps<typeof QuizPlayer>["demoState"]
}

export default function OxQuestion({ onComplete, demoState }: OxQuestionProps) {
  const questions = MOCK_CHOICE_QUESTION_SET.questions.filter(
    (q) => q.type === "quiz" && q.choiceMode === "ox"
  )

  if (questions.length === 0) {
    return (
      <main className="relative mx-auto h-[812px] w-[375px] overflow-hidden bg-white flex items-center justify-center border border-slate-200">
        <p className="text-sm text-slate-400">OX 퀴즈 데이터가 없습니다.</p>
      </main>
    )
  }

  return (
    <QuizPlayer
      questions={questions}
      headerTitle="OX 퀴즈"
      onComplete={(total, correct) => onComplete?.(total, correct)}
      demoState={demoState}
    />
  )
}
