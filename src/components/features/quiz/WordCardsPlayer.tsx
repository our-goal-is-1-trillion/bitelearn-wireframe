import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MousePointerClick } from "lucide-react"
import QuizHeader from "@/components/layout/QuizHeader"
import QuizFooter from "@/components/layout/QuizFooter"
import ChoiceQuestionIndicator from "@/components/features/choiceQuestion/ChoiceQuestionIndicator"
import WordCard from "./WordCard"
import type { StepIndicatorInfo } from "@/components/features/choiceQuestion/ChoiceQuestionIndicator"
import type { ChoiceQuestionItem } from "@/data/mock/choiceQuestion"

type WordCardsPlayerProps = {
  words: ChoiceQuestionItem[]
  wordIdx: number
  onWordIdxChange: (idx: number) => void
  onComplete: () => void
  onBack: () => void
  indicatorSteps?: StepIndicatorInfo[]
}

export default function WordCardsPlayer({ 
  words, 
  wordIdx, 
  onWordIdxChange, 
  onComplete, 
  onBack, 
  indicatorSteps: externalSteps 
}: WordCardsPlayerProps) {
  const [wordFlipped, setWordFlipped] = useState(false)
  const [wordDirection, setWordDirection] = useState(1)

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
      onComplete()
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

  // ─── Refined Animation Variants ───
  // y축 이동을 부모가 아닌 변수 내부에서 직접 제어하여 사선 이동을 방지합니다.
  const slideVariants = {
    initial: (dir: number) => ({
      x: dir > 0 ? "110%" : "-110%",
      y: wordFlipped ? 0 : -40, // Match current state position
      opacity: 0,
    }),
    animate: {
      x: 0,
      y: wordFlipped ? 0 : -40, // Position based on flip state
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        y: { type: "spring", stiffness: 200, damping: 25 },
        opacity: { duration: 0.2 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-110%" : "110%",
      // CRITICAL: exit 시점의 y축을 현재 y축과 동일하게 유지하여 수평 이동 보장
      y: wordFlipped ? 0 : -40, 
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    }),
  }

  if (!currentWord) return null

  return (
    <main className="relative mx-auto h-[812px] w-[375px] overflow-hidden bg-slate-50 text-slate-900 flex flex-col border border-slate-200 shadow-xl">
      {/* 1. Fixed Header Area */}
      <div className="shrink-0 bg-white z-20 border-b border-slate-100">
        <QuizHeader title="생존 단어장" showCloseButton onCloseClick={onBack} />
        <ChoiceQuestionIndicator steps={indicatorSteps} />
      </div>

      {/* 2. Main Content (The Interaction Zone) */}
      <div className="flex-1 relative flex items-center justify-center px-6 overflow-hidden">
        
        {/* The Card Slider */}
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
        <div className="absolute bottom-20 inset-x-0 flex items-center justify-center pointer-events-none">
          <AnimatePresence>
            {!wordFlipped && (
              <motion.div
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

      {/* 3. Footer Area (Appears on flip) */}
      <div className="shrink-0 bg-white border-t border-slate-100 min-h-[100px] relative z-30">
        <AnimatePresence>
          {wordFlipped && (
            <motion.div
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
