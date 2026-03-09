import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import QuizPlayer from "@/components/features/quiz/QuizPlayer"
import WordCardsPlayer from "@/components/features/quiz/WordCardsPlayer"
import { MOCK_CHOICE_QUESTION_SET } from "@/data/mock/choiceQuestion"
import type { StepIndicatorInfo } from "@/components/features/choiceQuestion/ChoiceQuestionIndicator"

// ─── Types ──────────────────────────────────────────────────
type ChapterPhase = "intro" | "words" | "quiz" | "done"

type ChapterPlayerProps = {
  onComplete: (total: number, correct: number) => void
  onBack: () => void
}

// ─── Constants ──────────────────────────────────────────────
const WORD_QUESTIONS = MOCK_CHOICE_QUESTION_SET.questions.filter((q) => q.type === "word")
const QUIZ_QUESTIONS = MOCK_CHOICE_QUESTION_SET.questions.filter((q) => q.type === "quiz")

// ─── Chapter Intro Screen ────────────────────────────────────
function ChapterIntroScreen({
  chapterTitle,
  onStart,
}: {
  chapterTitle: string
  onStart: () => void
}) {
  return (
    <main className="relative mx-auto h-[812px] w-[375px] overflow-hidden bg-white text-slate-900">
      <div className="flex h-full flex-col items-center justify-center border border-slate-200 px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex w-full flex-col items-center text-center"
        >
          <div className="w-full flex-1 flex flex-col items-center justify-center space-y-4 my-24">
            <h1 className="text-lg font-bold leading-tight tracking-tight text-slate-500">이번 챕터에서는</h1>
            <p className="text-[22px] font-bold leading-relaxed text-slate-900 break-keep px-4">
              "{chapterTitle}"
            </p>
            <p className="text-sm font-medium leading-relaxed text-slate-400 break-keep mt-2">
              기본적인 단어부터 실전 상황까지<br />순서대로 학습해보세요.
            </p>
          </div>
          
          <Button className="w-full h-14 rounded-2xl bg-indigo-600 outline-none hover:bg-indigo-600 text-base font-bold text-white shadow-lg active:scale-95 transition-all" onClick={onStart}>
            학습 시작하기
          </Button>
        </motion.div>
      </div>
    </main>
  )
}


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
