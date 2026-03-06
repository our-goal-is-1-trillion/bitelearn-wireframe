import { useState } from "react"
import QuizHeader from "@/components/layout/QuizHeader"
import QuizFooter from "@/components/layout/QuizFooter"
import ChoiceQuestionIndicator, { type StepIndicatorInfo } from "@/components/features/choiceQuestion/ChoiceQuestionIndicator"
import type { ChoiceQuestionSet } from "@/data/mock/choiceQuestion"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { Info, MousePointerClick } from "lucide-react"

type WordLearningProps = {
  /** 퀴즈의 원본 세트 데이터 (여기서 word 타입만 필터링하여 사용) */
  wordSet: ChoiceQuestionSet
  /** 홈이나 이전 화면으로 돌아가는 함수 */
  onBack: () => void
}

export default function WordLearning({ wordSet, onBack }: WordLearningProps) {
  // 전체 문항 중 "word" 타입만 추출합니다.
  const words = wordSet.questions.filter((q) => q.type === "word")
  
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  
  const handleNext = () => {
    if (currentIndex >= words.length - 1) {
      onBack()
      return
    }
    setIsFlipped(false)
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1)
    }, 150)
  }

  const handlePrev = () => {
    if (currentIndex <= 0) return
    setIsFlipped(false)
    setTimeout(() => {
      setCurrentIndex((prev) => prev - 1)
    }, 150)
  }

  const currentWord = words[currentIndex]

  const indicatorSteps: StepIndicatorInfo[] = words.map((_, idx) => ({
    type: "word",
    status: "none",
    isCurrent: idx === currentIndex,
  }))

  return (
    <main className="relative mx-auto h-[812px] w-[375px] overflow-hidden bg-slate-50 text-slate-900 flex flex-col border border-slate-200 shadow-xl">
      {/* 헤더 */}
      <div className="shrink-0 bg-white z-20">
        <QuizHeader title="생존 단어장" showCloseButton onCloseClick={onBack} />
      </div>
      
      <div className="shrink-0 bg-white border-b border-slate-200 shadow-sm">
        <ChoiceQuestionIndicator steps={indicatorSteps} />
      </div>

      {/* 메인 학습 컨텐츠 */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 pb-24 relative bg-slate-50 overflow-hidden">
        
        <div className="w-full max-w-[320px] perspective-1000 my-auto h-[540px]">
          <motion.div
            className="w-full h-full relative preserve-3d cursor-pointer shadow-md rounded-2xl"
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            {/* 카드 앞면 */}
            <div className="absolute inset-0 w-full h-full backface-hidden flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden group">
                <div className="flex-1 w-full bg-slate-100 flex items-center justify-center p-6 group-hover:bg-slate-200 transition-colors">
                    {currentWord.imageUrl ? (
                        <img 
                          src={currentWord.imageUrl} 
                          alt={currentWord.imageAlt} 
                          className="w-full h-full object-cover rounded-xl shadow-sm grayscale opacity-90"
                        />
                    ) : (
                        <div className="text-6xl flex flex-col items-center opacity-80">
                          <span className="mb-4">📖</span>
                        </div>
                    )}
                </div>
                <div className="shrink-0 flex flex-col items-center justify-center p-8 text-center bg-white border-t border-slate-100">
                    <div className="mb-4 bg-slate-100 px-4 py-1.5 rounded-full border border-slate-200">
                      <span className="text-xs font-bold tracking-wide text-slate-500">
                          {currentWord.flavorText || "핵심 단어"}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800 break-keep mb-6">
                        {currentWord.choices[0]}
                    </h2>
                    <div className="bg-slate-50 border border-slate-100 px-5 py-2.5 rounded-xl w-full flex items-center justify-center gap-2">
                       <MousePointerClick size={16} className="text-slate-400" />
                       <p className="text-sm font-semibold text-slate-500">
                           터치해서 의미 확인하기
                       </p>
                    </div>
                </div>
            </div>

            {/* 카드 뒷면 */}
            <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 flex flex-col bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-xl text-white p-8">
                <div className="flex-1 flex flex-col items-center justify-center">
                    <h3 className="text-xl font-bold mb-6 text-center text-white leading-tight">
                        {currentWord.question}
                    </h3>
                    
                    <div className="w-12 h-1 bg-slate-600 mb-8 rounded-full" />
                    
                    <p className="text-[15px] font-medium leading-relaxed text-slate-200 text-center [word-break:keep-all]">
                        {currentWord.passage}
                    </p>
                    
                    <div className="mt-10 p-5 bg-slate-900/50 rounded-xl border border-slate-700/50 w-full text-left shadow-inner">
                        <p className="text-sm text-slate-300 leading-relaxed font-medium">
                            {currentWord.explanation}
                        </p>
                    </div>
                </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-10">
           <p className="text-xs font-bold text-slate-300 tracking-tight">카드를 뒤집어 상세 내용을 확인하세요</p>
        </div>
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
