import { useMemo } from "react"
import WordCardsPlayer from "@/components/features/quiz/WordCardsPlayer"
import type { ChoiceQuestionSet } from "@/data/mock/choiceQuestion"

type WordLearningProps = {
  wordSet: ChoiceQuestionSet
  onBack: () => void
}

export default function WordLearning({ wordSet, onBack }: WordLearningProps) {
  const words = useMemo(
    () => wordSet.questions.filter((q) => q.type === "word"),
    [wordSet]
  )

  return (
    <WordCardsPlayer
      words={words}
      onComplete={onBack}
      onBack={onBack}
    />
  )
}
