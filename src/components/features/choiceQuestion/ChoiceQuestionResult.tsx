import { motion } from "framer-motion"
import { Check, X } from "lucide-react"
import QuizFooter from "@/components/layout/QuizFooter"

type ChoiceQuestionResultProps = {
  isCorrect: boolean
  correctAnswerText: string
  selectedAnswerText: string
  explanation: string
  characterImageUrl?: string
  isLastQuestion: boolean
  onNext: () => void
}

export default function ChoiceQuestionResult({
  isCorrect,
  correctAnswerText,
  selectedAnswerText,
  explanation,
  characterImageUrl,
  isLastQuestion,
  onNext,
}: ChoiceQuestionResultProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col animate-in fade-in slide-in-from-right-8 duration-500">
      <section className="flex-1 overflow-y-auto px-6 pb-4">

        {/* ── Result header with character image ── */}
        {isCorrect ? (
          <div className="flex flex-col items-center gap-2 pt-4 pb-4">
            {characterImageUrl && (
              <img
                src={characterImageUrl}
                alt="정답 캐릭터"
                className="h-[120px] w-[120px] object-contain"
              />
            )}
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="h-12 w-12 rounded-2xl bg-slate-900 flex items-center justify-center"
            >
              <Check className="text-white" size={22} strokeWidth={3} />
            </motion.div>
            <h2 className="text-xl font-bold text-slate-900">맞았어요!</h2>
          </div>
        ) : (
          <div className="flex items-center justify-between pt-4 pb-4">
            <div className="flex flex-col gap-3">
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="h-12 w-12 rounded-2xl bg-slate-200 flex items-center justify-center"
              >
                <X className="text-slate-500" size={22} />
              </motion.div>
              <h2 className="text-xl font-bold text-slate-900">틀렸습니다.</h2>
            </div>
            {characterImageUrl && (
              <img
                src={characterImageUrl}
                alt="오답 캐릭터"
                className="h-[120px] w-[120px] object-contain"
              />
            )}
          </div>
        )}

        {/* ── Wrong answer card ── */}
        {!isCorrect && (
          <div className="mb-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <p className="text-[10px] font-bold text-slate-400 mb-1.5">내가 선택한 답</p>
            <p className="text-sm text-slate-600 line-through">{selectedAnswerText}</p>
          </div>
        )}

        {/* ── Correct answer card ── */}
        <div className="mb-3 rounded-xl border border-slate-900 bg-slate-900 px-4 py-3">
          <p className="text-[10px] font-bold text-slate-400 mb-1.5">정답</p>
          <p className="text-sm font-semibold text-white">{correctAnswerText}</p>
        </div>

        {/* ── Explanation card ── */}
        <div className="rounded-xl border border-slate-100 bg-white px-4 py-4">
          <p className="text-[10px] font-bold text-slate-400 mb-2">해설</p>
          <p className="text-sm leading-relaxed text-slate-600">{explanation}</p>
        </div>

      </section>

      <QuizFooter onClick={onNext}>
        {isLastQuestion ? "최종 결과 확인" : "다음 문제"}
      </QuizFooter>
    </div>
  )
}
