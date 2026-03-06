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
  /** 외부에서 관리되는 현재 단어 인덱스 */
  wordIdx: number
  onWordIdxChange: (idx: number) => void
  onComplete: () => void
  onBack: () => void
  /** ChapterPlayer에서 내려오는 통합 인디케이터 (미제공 시 로컬 계산) */
  indicatorSteps?: StepIndicatorInfo[]
}

export const wordSlideVariants = {
  initial: (dir: number) => ({
    x: dir > 0 ? "110%" : "-110%",
    opacity: 0,
    scale: 0.92,
  }),
  animate: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: "spring" as const, stiffness: 300, damping: 30 },
      opacity: { duration: 0.25 },
    },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? "-110%" : "110%",
    opacity: 0,
    scale: 0.92,
    transition: {
      x: { type: "spring" as const, stiffness: 300, damping: 30 },
      opacity: { duration: 0.25 },
    },
  }),
}

export default function WordCardsPlayer({ words, wordIdx, onWordIdxChange, onComplete, onBack, indicatorSteps: externalSteps }: WordCardsPlayerProps) {
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

  if (!currentWord) {
    return (
      <main className="relative mx-auto h-[812px] w-[375px] overflow-hidden bg-white text-slate-900 flex items-center justify-center border border-slate-200 shadow-2xl">
        <p className="text-sm text-slate-400">표시할 단어가 없습니다.</p>
      </main>
    )
  }

  const handleNext = () => {
    if (isLastWord) {
      onComplete()
      return
    }
    setWordDirection(1)
    onWordIdxChange(wordIdx + 1)
    setWordFlipped(false)
  }

  const handlePrev = () => {
    if (isFirstWord) return
    setWordDirection(-1)
    onWordIdxChange(wordIdx - 1)
    setWordFlipped(false)
  }

  return (
    <main className="relative mx-auto h-[812px] w-[375px] overflow-hidden bg-slate-50 text-slate-900 flex flex-col border border-slate-200 shadow-xl">
      {/* 헤더 */}
      <div className="shrink-0 bg-white z-20">
        <QuizHeader title="생존 단어장" showCloseButton onCloseClick={onBack} />
      </div>
      
      {/* 인디케이터 */}
      <div className="shrink-0 bg-white border-b border-slate-200 shadow-sm">
        <ChoiceQuestionIndicator steps={indicatorSteps} />
      </div>

      {/* 메인 학습 컨텐츠 */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 pb-10 relative bg-slate-50 overflow-hidden">
        <AnimatePresence mode="wait" initial={false} custom={wordDirection}>
          <motion.div
            key={wordIdx}
            custom={wordDirection}
            variants={wordSlideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full max-w-[320px] perspective-1000 my-auto h-[540px]"
          >
            <WordCard 
              word={currentWord} 
              isFlipped={wordFlipped} 
              onFlip={() => setWordFlipped(!wordFlipped)} 
            />
          </motion.div>
        </AnimatePresence>

        {/* 안내 문구 */}
        <div className="mt-8 h-6 flex items-center justify-center">
           <AnimatePresence mode="wait">
             {!wordFlipped ? (
               <motion.div
                 key="flip-guide"
                 initial={{ opacity: 0, y: 5 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -5 }}
                 className="flex items-center gap-2 text-slate-400"
               >
                 <MousePointerClick size={14} />
                 <p className="text-xs font-bold tracking-tight">카드를 뒤집어 의미를 확인하세요</p>
               </motion.div>
             ) : (
               <motion.p
                 key="next-guide"
                 initial={{ opacity: 0, y: 5 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="text-xs font-bold text-slate-300"
               >
                 단어의 의미를 충분히 읽어보세요
               </motion.p>
             )}
           </AnimatePresence>
        </div>
      </div>

      {/* 푸터 영역 (뒤집었을 때만 노출) */}
      <div className="shrink-0 bg-white relative min-h-[100px]">
        <AnimatePresence>
          {wordFlipped && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="w-full"
            >
              <QuizFooter
                onPrevious={!isFirstWord ? handlePrev : undefined}
                onClick={handleNext}
              >
                {isLastWord ? "학습 완료하기" : "다음 단어로 넘어가기"}
              </QuizFooter>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}
