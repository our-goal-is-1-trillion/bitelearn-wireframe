import { motion } from "framer-motion"
import { MousePointerClick } from "lucide-react"
import type { ChoiceQuestionItem } from "@/data/mock/choiceQuestion"

type WordCardProps = {
  word: ChoiceQuestionItem
  isFlipped: boolean
  onFlip: () => void
}

/** 
 * 단어 학습에서 사용되는 카드 컴포넌트 
 * 앞면(단어/이미지)과 뒷면(의미/설명)으로 구성되며 뒤집기 애니메이션을 포함합니다.
 */
export default function WordCard({ word, isFlipped, onFlip }: WordCardProps) {
  return (
    <motion.div
      className="w-full h-full relative preserve-3d cursor-pointer rounded-2xl shadow-md"
      animate={{ rotateY: isFlipped ? 180 : 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      onClick={onFlip}
    >
      {/* ── Front (단어) ── */}
      <div className="absolute inset-0 backface-hidden flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden group">
        <div className="flex-1 bg-slate-100 flex items-center justify-center overflow-hidden">
          {word.imageUrl ? (
            <img
              src={word.imageUrl}
              alt={word.imageAlt}
              className="w-full h-full object-cover grayscale opacity-90 transition-transform group-hover:scale-105 duration-500"
            />
          ) : (
            <span className="text-6xl opacity-30">📖</span>
          )}
        </div>
        <div className="shrink-0 flex flex-col items-center p-8 text-center bg-white border-t border-slate-100">
          <div className="mb-3 bg-slate-100 px-4 py-1.5 rounded-full border border-slate-200">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              {word.flavorText || "핵심 단어"}
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-6 break-keep">
            {word.choices[0]}
          </h2>
          <div className="flex items-center gap-2 text-slate-400">
            <MousePointerClick size={14} />
            <span className="text-xs font-medium">터치해서 의미 확인</span>
          </div>
        </div>
      </div>

      {/* ── Back (의미) ── */}
      <div className="absolute inset-0 backface-hidden rotate-y-180 flex flex-col bg-slate-800 rounded-2xl overflow-hidden text-white p-8">
        <div className="flex-1 flex flex-col justify-center">
          <h3 className="text-lg font-bold mb-6 text-center leading-tight">
            {word.question}
          </h3>
          <div className="w-10 h-1 bg-slate-600 mb-8 mx-auto rounded-full" />
          <p className="text-[15px] font-medium leading-relaxed text-slate-200 text-center whitespace-pre-line break-keep">
            {word.passage}
          </p>
          <div className="mt-8 p-5 bg-slate-900/50 rounded-xl border border-slate-700/50 shadow-inner text-left">
            <p className="text-sm text-slate-400 leading-relaxed font-medium">
              <span className="mr-2 text-slate-500">💡</span>
              {word.explanation}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
