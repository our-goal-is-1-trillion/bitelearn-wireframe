import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MousePointerClick } from "lucide-react"
import QuizHeader from "@/components/layout/QuizHeader"
import QuizFooter from "@/components/layout/QuizFooter"
import ChoiceQuestionIndicator from "@/components/features/choiceQuestion/ChoiceQuestionIndicator"
import type { StepIndicatorInfo } from "@/components/features/choiceQuestion/ChoiceQuestionIndicator"
import type { ChoiceQuestionItem } from "@/data/mock/choiceQuestion"

type WordCardsPlayerProps = {
  words: ChoiceQuestionItem[]
  onComplete: () => void
  onBack: () => void
}

const slideVariants = {
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

export default function WordCardsPlayer({ words, onComplete, onBack }: WordCardsPlayerProps) {
  const [wordIdx, setWordIdx] = useState(0)
  const [wordFlipped, setWordFlipped] = useState(false)
  const [wordDirection, setWordDirection] = useState(1)

  const currentWord = words[wordIdx]
  const isFirstWord = wordIdx === 0
  const isLastWord = wordIdx >= words.length - 1

  const indicatorSteps: StepIndicatorInfo[] = words.map((_, idx) => ({
    type: "word" as const,
    status: "none" as const,
    isCurrent: idx === wordIdx,
  }))

  if (!currentWord) {
    return (
      <main className="relative mx-auto h-[812px] w-[375px] overflow-hidden bg-white text-slate-900 flex items-center justify-center border border-slate-200">
        <p className="text-sm text-slate-400">표시할 단어가 없습니다.</p>
      </main>
    )
  }

  return (
    <main className="relative mx-auto h-[812px] w-[375px] overflow-hidden bg-white text-slate-900">
      <div className="relative flex h-full flex-col border border-slate-200 pt-14">
        <div className="absolute inset-x-0 top-0 z-20 bg-white">
          <QuizHeader title="생존 단어장" showCloseButton onCloseClick={onBack} />
        </div>

        <ChoiceQuestionIndicator steps={indicatorSteps} />

        <div className="flex-1 flex flex-col items-center justify-center px-6 pb-4 overflow-hidden">
          <AnimatePresence mode="wait" initial={false} custom={wordDirection}>
            <motion.div
              key={wordIdx}
              custom={wordDirection}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full max-w-[310px] perspective-1000 h-[460px]"
            >
              <motion.div
                className="w-full h-full relative preserve-3d cursor-pointer rounded-2xl shadow-md"
                animate={{ rotateY: wordFlipped ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                onClick={() => setWordFlipped(!wordFlipped)}
              >
                {/* Front */}
                <div className="absolute inset-0 backface-hidden flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden">
                  <div className="flex-1 bg-slate-100 flex items-center justify-center overflow-hidden">
                    {currentWord.imageUrl ? (
                      <img
                        src={currentWord.imageUrl}
                        alt={currentWord.imageAlt}
                        className="w-full h-full object-cover grayscale opacity-90"
                      />
                    ) : (
                      <span className="text-5xl opacity-30">📖</span>
                    )}
                  </div>
                  <div className="shrink-0 flex flex-col items-center p-6 text-center bg-white border-t border-slate-100">
                    <div className="mb-2 bg-slate-100 px-3 py-1 rounded-full">
                      <span className="text-[11px] font-bold text-slate-500">{currentWord.flavorText}</span>
                    </div>
                    <h2 className="text-lg font-bold text-slate-800 mb-4">{currentWord.choices[0]}</h2>
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <MousePointerClick size={13} />
                      <span className="text-xs font-medium">터치해서 의미 확인</span>
                    </div>
                  </div>
                </div>

                {/* Back */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 flex flex-col bg-slate-800 rounded-2xl overflow-hidden text-white p-7">
                  <div className="flex-1 flex flex-col justify-center">
                    <h3 className="text-base font-bold mb-4 text-center leading-tight">{currentWord.question}</h3>
                    <div className="w-8 h-px bg-slate-600 mb-5 mx-auto" />
                    <p className="text-[13px] font-medium leading-relaxed text-slate-300 text-center whitespace-pre-line">
                      {currentWord.passage}
                    </p>
                    <div className="mt-5 p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
                      <p className="text-xs text-slate-400 leading-relaxed">{currentWord.explanation}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        <QuizFooter
          disabled={!wordFlipped}
          previousDisabled={isFirstWord}
          onClick={() => {
            if (isLastWord) { onComplete(); return }
            setWordDirection(1)
            setWordIdx((prev) => prev + 1)
            setWordFlipped(false)
          }}
          onPrevious={isFirstWord ? undefined : () => {
            setWordDirection(-1)
            setWordIdx((prev) => prev - 1)
            setWordFlipped(false)
          }}
        >
          {isLastWord ? "단어 학습 완료" : "다음 단어"}
        </QuizFooter>
      </div>
    </main>
  )
}
