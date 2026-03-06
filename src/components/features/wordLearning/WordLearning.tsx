import { useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import QuizHeader from "@/components/common/QuizHeader"
import QuizFooter from "@/components/common/QuizFooter"
import ChoiceQuestionIndicator, { type StepIndicatorInfo } from "@/components/features/choiceQuestion/ChoiceQuestionIndicator"
import { cn } from "@/lib/utils"
import type { ChoiceQuestionItem, ChoiceQuestionSet } from "@/mock/choiceQuestion"

type WordLearningProps = {
  /** 퀴즈의 원본 세트 데이터 (여기서 word 타입만 필터링하여 사용) */
  wordSet: ChoiceQuestionSet
  /** 홈이나 이전 화면으로 돌아가는 함수 */
  onBack: () => void
}

export default function WordLearning({ wordSet, onBack }: WordLearningProps) {
  // 전체 문항 중 "word" 타입만 추출합니다.
  const words = useMemo(
    () => wordSet.questions.filter((q): q is ChoiceQuestionItem => q.type === "word"),
    [wordSet]
  )
  
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [direction, setDirection] = useState(0) // 1: next, -1: prev

  const handleNext = () => {
    if (currentIndex >= words.length - 1) {
      onBack()
      return
    }
    setDirection(1)
    setIsFlipped(false)
    setCurrentIndex((prev) => prev + 1)
  }

  const handlePrev = () => {
    if (currentIndex <= 0) return
    setDirection(-1)
    setIsFlipped(false)
    setCurrentIndex((prev) => prev - 1)
  }

  const currentWord = words[currentIndex]

  // 학습 진행도 표시를 위한 데이터
  const indicatorSteps: StepIndicatorInfo[] = words.map((_, idx) => ({
    type: "word",
    status: "none",
    isCurrent: idx === currentIndex,
  }))

  const slideVariants = {
    initial: (dir: number) => ({
      x: dir > 0 ? "120%" : "-120%",
      opacity: 0,
      scale: 0.9,
    }),
    animate: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-120%" : "120%",
      opacity: 0,
      scale: 0.9,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
      },
    }),
  }

  if (!currentWord) {
    return (
      <main className="relative flex flex-1 flex-col overflow-hidden border border-slate-200 bg-slate-50 text-slate-900 shadow-xl">
        <div className="z-20 shrink-0 bg-white">
          <QuizHeader title="생존 단어장" showCloseButton onCloseClick={onBack} />
        </div>
        <div className="flex flex-1 items-center justify-center p-6">
          <p className="text-sm font-medium text-slate-500">표시할 단어가 없습니다.</p>
        </div>
      </main>
    )
  }

  return (
    <main className="relative mx-auto flex h-[812px] w-[375px] flex-col overflow-hidden border border-slate-200 bg-slate-50 text-slate-900 shadow-xl">
      {/* 헤더 */}
      <div className="z-20 shrink-0 bg-white">
        <QuizHeader title="생존 단어장" showCloseButton onCloseClick={onBack} />
      </div>
      
      {/* 진행 상태 바 */}
      <div className="shrink-0 bg-white border-b border-slate-100 shadow-sm">
        <ChoiceQuestionIndicator steps={indicatorSteps} />
      </div>

      <div className="z-10 flex items-center justify-between border-b border-slate-200 bg-white/50 backdrop-blur-sm px-6 py-3">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Learning Progress</span>
        <span className="rounded-full bg-slate-900 px-3 py-0.5 text-xs font-bold text-white tracking-widest">
          {currentIndex + 1} / {words.length}
        </span>
      </div>

      {/* 메인 학습 컨텐츠 */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 bg-slate-50 overflow-hidden relative">
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full max-w-[320px] h-[540px] flex flex-col items-center justify-center perspective-1000"
          >
            <motion.div
              className={cn(
                "w-full h-full relative preserve-3d cursor-pointer shadow-2xl rounded-3xl",
                isFlipped ? "rotate-y-180" : ""
              )}
              initial={false}
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              onClick={() => setIsFlipped(!isFlipped)}
            >
              {/* 카드 앞면 (Front) */}
              <div className="absolute inset-0 w-full h-full backface-hidden flex flex-col bg-white rounded-3xl border border-slate-100 overflow-hidden group shadow-inner">
                  <div className="flex-1 w-full bg-slate-50 flex items-center justify-center p-8 group-hover:bg-slate-100 transition-colors">
                      {currentWord.imageUrl ? (
                          <img 
                            src={currentWord.imageUrl} 
                            alt={currentWord.imageAlt} 
                            className="w-full h-full object-cover rounded-2xl shadow-sm grayscale opacity-90 transition-all group-hover:grayscale-0 group-hover:opacity-100"
                          />
                      ) : (
                          <div className="text-7xl flex flex-col items-center opacity-70">
                            <span className="mb-4 drop-shadow-lg">📖</span>
                            <span className="text-xs font-extrabold text-slate-300">IMAGE MISSING</span>
                          </div>
                      )}
                  </div>
                  <div className="shrink-0 flex flex-col items-center justify-center p-8 pt-4 text-center bg-white">
                      <div className="mb-4 bg-slate-900/5 px-4 py-1.5 rounded-full border border-slate-900/10">
                        <span className="text-[10px] font-black tracking-[0.2em] text-slate-400">
                            {currentWord.flavorText || "SURVIVAL WORD"}
                        </span>
                      </div>
                      <h2 className="text-2xl font-black text-slate-900 break-keep mb-8 tracking-tight">
                          {currentWord.choices[0]}
                      </h2>
                      <div className="bg-slate-50 border border-slate-100 px-6 py-3 rounded-2xl w-full flex items-center justify-center gap-2 group-hover:bg-slate-100 transition-all border-dashed">
                         <motion.span
                           animate={{ y: [0, 4, 0] }}
                           transition={{ repeat: Infinity, duration: 1.5 }}
                           className="text-slate-300"
                         >
                            👇
                         </motion.span>
                         <p className="text-xs font-bold text-slate-400">
                             터치해서 의미 확인하기
                         </p>
                      </div>
                  </div>
              </div>

              {/* 카드 뒷면 (Back) */}
              <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 flex flex-col bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl text-white p-8">
                  <div className="flex-1 flex flex-col items-center justify-center">
                      <h3 className="text-xl font-black mb-8 text-center text-emerald-400 [word-break:keep-all] leading-tight">
                          {currentWord.question}
                      </h3>
                      
                      <div className="w-10 h-1 bg-slate-800 mb-8 rounded-full" />
                      
                      <p className="text-[15px] font-bold leading-relaxed text-slate-300 text-center [word-break:keep-all]">
                          {currentWord.passage}
                      </p>
                      
                      <div className="mt-10 p-6 bg-slate-800/50 rounded-2xl border border-slate-800/50 w-full text-left shadow-inner ring-1 ring-white/5">
                          <p className="text-[13px] text-slate-400 leading-relaxed font-semibold">
                              <span className="text-emerald-400 mr-2 font-black">💡 TIP</span>
                              {currentWord.explanation}
                          </p>
                      </div>
                  </div>
                  
                  <div className="mt-8 text-center opacity-30">
                     <p className="text-[10px] font-black tracking-widest">BITELEARN SYSTEM</p>
                  </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-4 text-center pb-8 sticky bottom-0 bg-slate-50/80 backdrop-blur-sm pt-2">
         <p className="text-[10px] font-bold text-slate-300 tracking-tighter uppercase">카드를 뒤집어 상세 내용을 확인하세요</p>
      </div>

      <QuizFooter
        disabled={!isFlipped}
        previousDisabled={currentIndex === 0}
        onClick={handleNext}
        onPrevious={handlePrev}
      >
        {currentIndex === words.length - 1 ? "학습 완료하기" : "다음 단어 확인"}
      </QuizFooter>
    </main>
  )
}
