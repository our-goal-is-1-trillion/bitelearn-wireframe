import { useState, useMemo } from "react"
import QuizPlayer from "@/components/features/quiz/QuizPlayer"
import WordCardsPlayer from "@/components/features/quiz/WordCardsPlayer"
import { MOCK_CHOICE_QUESTION_SET } from "@/data/mock/choiceQuestion"
import type { StepIndicatorInfo } from "@/components/features/choiceQuestion/ChoiceQuestionIndicator"
import ChapterIntroScreen from "./ChapterIntroScreen"
import ChapterDoneScreen from "./ChapterDoneScreen"

// ─── Types ──────────────────────────────────────────────────
type ChapterPhase = "intro" | "words" | "quiz" | "done"

type ChapterPlayerProps = {
  onComplete: (total: number, correct: number) => void
  onBack: () => void
}

// ─── Constants ──────────────────────────────────────────────
const WORD_QUESTIONS = MOCK_CHOICE_QUESTION_SET.questions.filter((q) => q.type === "word")
const QUIZ_QUESTIONS = MOCK_CHOICE_QUESTION_SET.questions.filter((q) => q.type === "quiz")

// ─── Main ChapterPlayer ────────────────────────────────────
export default function ChapterPlayer({ onComplete, onBack }: ChapterPlayerProps) {
  const initialPhase: ChapterPhase = "intro"
  const [chapterPhase, setChapterPhase] = useState<ChapterPhase>(initialPhase)
  const [quizResult, setQuizResult] = useState<{ total: number; correct: number } | null>(null)
  const [wordIdx, setWordIdx] = useState(0)
  const [quizCurrentIndex, setQuizCurrentIndex] = useState(0)
  const [quizMetrics, setQuizMetrics] = useState<("none" | "correct" | "incorrect")[]>(
    Array(QUIZ_QUESTIONS.length).fill("none")
  )

  const combinedSteps: StepIndicatorInfo[] = useMemo(() => {
    const wordSteps: StepIndicatorInfo[] = WORD_QUESTIONS.map((_, idx) => ({
      type: "word" as const,
      status: "none" as const,
      isCurrent: chapterPhase === "words" && idx === wordIdx,
    }))
    const quizSteps: StepIndicatorInfo[] = QUIZ_QUESTIONS.map((q, idx) => ({
      type: (q.type ?? "quiz") as StepIndicatorInfo["type"],
      status: chapterPhase === "words" ? "none" : quizMetrics[idx],
      isCurrent: chapterPhase === "quiz" && idx === quizCurrentIndex,
    }))
    return [...wordSteps, ...quizSteps]
  }, [chapterPhase, wordIdx, quizCurrentIndex, quizMetrics])

  if (chapterPhase === "done" && quizResult) {
    return (
      <ChapterDoneScreen
        correct={quizResult.correct}
        total={quizResult.total}
        chapterTitle={MOCK_CHOICE_QUESTION_SET.title}
        onFinish={() => onComplete(quizResult.total, quizResult.correct)}
      />
    )
  }

  if (chapterPhase === "intro") {
    return (
      <ChapterIntroScreen
        chapterTitle={MOCK_CHOICE_QUESTION_SET.title}
        missionTitle={MOCK_CHOICE_QUESTION_SET.missionTitle}
        missionKeywords={MOCK_CHOICE_QUESTION_SET.missionKeywords}
        onStart={() => setChapterPhase(WORD_QUESTIONS.length > 0 ? "words" : "quiz")}
      />
    )
  }

  if (chapterPhase === "quiz") {
    return (
      <QuizPlayer
        questions={QUIZ_QUESTIONS}
        headerTitle={MOCK_CHOICE_QUESTION_SET.title}
        onBack={WORD_QUESTIONS.length > 0 ? () => setChapterPhase("words") : onBack}
        onComplete={(total, correct) => {
          setQuizResult({ total, correct })
          setChapterPhase("done")
        }}
        indicatorSteps={combinedSteps}
        onCurrentIndexChange={setQuizCurrentIndex}
        onMetricsChange={setQuizMetrics}
      />
    )
  }

  // "words" phase
  return (
    <WordCardsPlayer
      words={WORD_QUESTIONS}
      headerTitle={MOCK_CHOICE_QUESTION_SET.title}
      wordIdx={wordIdx}
      onWordIdxChange={setWordIdx}
      onComplete={() => setChapterPhase("quiz")}
      onBack={onBack}
      indicatorSteps={combinedSteps}
    />
  )
}
