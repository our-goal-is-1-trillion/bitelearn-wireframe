import { useState } from "react"
import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import QuizPlayer from "@/components/features/quiz/QuizPlayer"
import WordCardsPlayer from "@/components/features/quiz/WordCardsPlayer"
import { MOCK_CHOICE_QUESTION_SET } from "@/data/mock/choiceQuestion"

// ─── Types ──────────────────────────────────────────────────
type ChapterPhase = "words" | "quiz" | "done"

type ChapterPlayerProps = {
  onComplete: (total: number, correct: number) => void
  onBack: () => void
}

// ─── Constants ──────────────────────────────────────────────
const ALL_QUESTIONS = MOCK_CHOICE_QUESTION_SET.questions
const WORD_QUESTIONS = ALL_QUESTIONS.filter((q) => q.type === "word")
const QUIZ_QUESTIONS = ALL_QUESTIONS.filter((q) => q.type !== "word")

// ─── Chapter Done Screen ─────────────────────────────────────
function ChapterDoneScreen({
  correct,
  total,
  chapterTitle,
  onFinish,
}: {
  correct: number
  total: number
  chapterTitle: string
  onFinish: () => void
}) {
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0

  return (
    <main className="relative mx-auto h-[812px] w-[375px] overflow-hidden bg-white text-slate-900">
      <div className="flex h-full flex-col items-center justify-center border border-slate-200 px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex w-full flex-col items-center text-center"
        >
          <div className="mb-6 h-16 w-16 rounded-3xl bg-slate-900 flex items-center justify-center">
            <Check size={32} className="text-white" strokeWidth={3} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">챕터 완료!</h1>
          <p className="text-sm text-slate-400 mb-10 max-w-[260px] leading-snug">{chapterTitle}</p>

          <div className="w-full rounded-3xl border-2 border-slate-100 bg-slate-50 p-6 mb-4">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-4">퀴즈 결과</p>
            <div className="flex items-end justify-between mb-3">
              <span className="text-4xl font-black text-slate-900 leading-none">{pct}%</span>
              <span className="text-sm text-slate-400 mb-0.5">{correct} / {total} 정답</span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
              <motion.div
                className="h-full rounded-full bg-slate-900"
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 1.1, ease: "easeOut", delay: 0.3 }}
              />
            </div>
          </div>

          <Button className="w-full h-14 rounded-2xl text-base font-bold" onClick={onFinish}>
            최종 결과 확인
          </Button>
        </motion.div>
      </div>
    </main>
  )
}


// ─── Main ChapterPlayer ────────────────────────────────────
export default function ChapterPlayer({ onComplete, onBack }: ChapterPlayerProps) {
  const initialPhase: ChapterPhase = WORD_QUESTIONS.length > 0 ? "words" : "quiz"
  const [chapterPhase, setChapterPhase] = useState<ChapterPhase>(initialPhase)
  const [quizResult, setQuizResult] = useState<{ total: number; correct: number } | null>(null)

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

  if (chapterPhase === "quiz") {
    return (
      <QuizPlayer
        questions={QUIZ_QUESTIONS}
        onBack={WORD_QUESTIONS.length > 0 ? () => setChapterPhase("words") : onBack}
        onComplete={(total, correct) => {
          setQuizResult({ total, correct })
          setChapterPhase("done")
        }}
      />
    )
  }

  // "words" phase
  return (
    <WordCardsPlayer
      words={WORD_QUESTIONS}
      onComplete={() => setChapterPhase("quiz")}
      onBack={onBack}
    />
  )
}
