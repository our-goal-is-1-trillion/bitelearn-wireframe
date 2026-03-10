import { useState } from "react"
import { motion, AnimatePresence, type Variants } from "framer-motion"
import { MousePointerClick } from "lucide-react"
import { Button } from "@/components/ui/button"
import QuizHeader from "@/components/layout/QuizHeader"
import QuizFooter from "@/components/layout/QuizFooter"
import ChoiceQuestionIndicator from "@/components/features/choiceQuestion/ChoiceQuestionIndicator"
import WordCard from "./WordCard"
import type { StepIndicatorInfo } from "@/components/features/choiceQuestion/ChoiceQuestionIndicator"
import type { ChoiceQuestionItem } from "@/data/mock/choiceQuestion"

type WordCardsPlayerProps = {
  words: ChoiceQuestionItem[]
  headerTitle?: string
  /** 외부에서 관리되는 현재 단어 인덱스 */
  wordIdx: number
  onWordIdxChange: (idx: number) => void
  onComplete: () => void
  onBack: () => void
  /** ChapterPlayer에서 내려오는 통합 인디케이터 (미제공 시 로컬 계산) */
  indicatorSteps?: StepIndicatorInfo[]
}

export default function WordCardsPlayer({ 
  words, 
  headerTitle,
  wordIdx, 
  onWordIdxChange, 
  onComplete, 
  onBack, 
  indicatorSteps: externalSteps 
}: WordCardsPlayerProps) {
  const [wordFlipped, setWordFlipped] = useState(false)
  const [wordDirection, setWordDirection] = useState(1)
  const [showBriefing, setShowBriefing] = useState(false)

  const currentWord = words[wordIdx]
  const isFirstWord = wordIdx === 0
  const isLastWord = wordIdx >= words.length - 1

  const localSteps: StepIndicatorInfo[] = words.map((_, idx) => ({
    type: "word" as const,
    status: "none" as const,
    isCurrent: idx === wordIdx,
  }))
  const indicatorSteps = externalSteps ?? localSteps

  const handleNext = () => {
    if (isLastWord) {
      setShowBriefing(true)
      return
    }
    setWordDirection(1)
    setWordFlipped(false)
    onWordIdxChange(wordIdx + 1)
  }

  const handlePrev = () => {
    if (isFirstWord) return
    setWordDirection(-1)
    setWordFlipped(false)
    onWordIdxChange(wordIdx - 1)
  }

  // ─── Animation Variants ───
  const slideVariants: Variants = {
    initial: (dir: number) => ({
      x: dir > 0 ? "110%" : "-110%",
      y: wordFlipped ? 0 : -40,
      opacity: 0,
    }),
    animate: {
      x: 0,
      y: wordFlipped ? 0 : -40,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        y: { type: "spring", stiffness: 200, damping: 25 },
        opacity: { duration: 0.2 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-110%" : "110%",
      y: wordFlipped ? 0 : -40, // Match current state position to ensure horizontal exit
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    }),
  }

  if (!currentWord) return null

  if (showBriefing) {
    return (
      <main className="relative mx-auto h-[812px] w-[375px] overflow-hidden bg-white text-slate-900 border border-slate-200">
        <QuizHeader title={headerTitle || "생존 단어장"} showCloseButton onCloseClick={onBack} />
        <div className="flex h-[calc(100%-64px)] flex-col items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="flex w-full flex-col items-center text-center"
          >
            <div className="mb-6 h-20 w-20 rounded-full bg-orange-50 flex items-center justify-center shadow-inner">
              <span className="text-4xl">🐶</span>
            </div>
            <h1 className="text-[22px] font-bold text-slate-900 mb-3 break-keep">단어 학습 완벽해요!</h1>
            <p className="text-sm font-medium text-slate-500 mb-10 max-w-[240px] leading-relaxed break-keep">
              방금 배운 내용을 바탕으로 실전 퀴즈를 풀고 멍멍이의 바이트를 모아볼까요?
            </p>

            <Button className="w-full h-14 rounded-2xl bg-indigo-600 outline-none hover:bg-indigo-700 text-base font-bold text-white shadow-lg active:scale-95 transition-all" onClick={onComplete}>
              퀴즈 풀러 가기
            </Button>
          </motion.div>
        </div>
      </main>
    )
  }

  return (
    <main className="relative mx-auto h-[812px] w-[375px] overflow-hidden bg-slate-50 text-slate-900 flex flex-col border border-slate-200 shadow-xl">
      {/* 1. Header Area */}
      <div className="shrink-0 bg-white z-20 border-b border-slate-100">
        <QuizHeader title={headerTitle || "생존 단어장"} showCloseButton onCloseClick={onBack} />
        <ChoiceQuestionIndicator steps={indicatorSteps} />
      </div>

      {/* 2. Main Content Area */}
      <div className="flex-1 relative flex items-center justify-center px-6 overflow-hidden">
        
        {/* Card Container */}
        <AnimatePresence mode="wait" initial={false} custom={wordDirection}>
          <motion.div
            key={wordIdx}
            custom={wordDirection}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full max-w-[320px] h-[480px] z-10 perspective-1000"
          >
            <WordCard 
              word={currentWord} 
              isFlipped={wordFlipped} 
              onFlip={() => setWordFlipped(!wordFlipped)} 
            />
          </motion.div>
        </AnimatePresence>

        {/* Overlay Guide Text */}
        <div className="absolute bottom-10 inset-x-0 flex items-center justify-center pointer-events-none">
          <AnimatePresence>
            {!wordFlipped && (
              <motion.div
                key="flip-guide"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="flex flex-col items-center gap-2 text-slate-400"
              >
                <MousePointerClick size={16} />
                <p className="text-sm font-bold tracking-tight">카드를 뒤집어 확인해 보세요</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 3. Footer Area */}
      <div className="shrink-0 bg-white border-t border-slate-100 min-h-[100px] relative z-30">
        <AnimatePresence>
          {wordFlipped && (
            <motion.div
              key="footer-cta"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute inset-0"
            >
              <QuizFooter
                onPrevious={isFirstWord ? undefined : handlePrev}
                onClick={handleNext}
              >
                {isLastWord ? "학습 완료하기" : "다음 단어 확인"}
              </QuizFooter>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}
