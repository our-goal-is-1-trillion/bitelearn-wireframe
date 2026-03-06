import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Check, XCircle, Info } from "lucide-react"

type DocumentCardField = {
  label: string
  value: string
}

type DocumentCardData = {
  header: string
  subHeader: string
  sectionTitle: string
  fields: DocumentCardField[]
  footerNotice?: string
}

type ChoiceQuestionResultProps = {
  isCorrect: boolean
  explanation: string
  documentCard?: DocumentCardData
  correctIndex?: number
  selectedAnswerIndex?: number // Added to show what user picked
  characterImageUrl?: string
  isLastQuestion: boolean
  onNext: () => void
}

export default function ChoiceQuestionResult({
  isCorrect,
  explanation,
  documentCard,
  correctIndex,
  selectedAnswerIndex,
  characterImageUrl = "/images/result/dog_perfect.png",
  isLastQuestion,
  onNext,
}: ChoiceQuestionResultProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section className="flex-1 overflow-y-auto px-6 pb-10">
        
        {/* Result Header */}
        <div className="flex flex-col items-center text-center py-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="relative mb-4"
          >
            <img src={characterImageUrl} alt="결과 캐릭터" className="h-28 w-28 object-contain" />
            <div className={`absolute -right-2 -top-2 h-10 w-10 rounded-full flex items-center justify-center shadow-lg ${isCorrect ? "bg-slate-900" : "bg-slate-200"}`}>
              {isCorrect ? <Check className="text-white" size={24} strokeWidth={3} /> : <XCircle className="text-slate-500" size={24} />}
            </div>
          </motion.div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            {isCorrect ? "완벽하게 찾아냈어요!" : "아쉬워요, 다시 확인해볼까요?"}
          </h2>
        </div>

        {/* Document UI (Identical to Question phase) */}
        {documentCard && (
          <div className="relative mb-8 rounded-[32px] border-2 border-slate-100 bg-slate-50 p-6 shadow-inner">
            <div className="mb-5 border-b border-slate-200 pb-4">
              <p className="text-sm font-bold text-slate-900 uppercase tracking-widest">{documentCard.header}</p>
              <p className="text-xs font-medium text-slate-400 mt-1">{documentCard.subHeader}</p>
            </div>

            <p className="mb-4 text-xs font-bold text-slate-400 uppercase tracking-tighter">{documentCard.sectionTitle}</p>

            <div className="space-y-3">
              {documentCard.fields.map((field, index) => {
                const isTheCorrectField = index === correctIndex
                const isTheUserSelectedField = index === selectedAnswerIndex

                let fieldClass = "w-full rounded-2xl border-2 px-4 py-3.5 text-left transition-all duration-300 "
                
                if (isTheCorrectField) {
                  // The actual answer (the error in the document)
                  fieldClass += "border-slate-900 bg-slate-900 text-white shadow-lg z-10 scale-[1.02]"
                } else if (isTheUserSelectedField && !isCorrect) {
                  // User picked this, but it was wrong
                  fieldClass += "border-slate-300 bg-white text-slate-400 opacity-60 line-through"
                } else {
                  // Normal fields
                  fieldClass += "border-white bg-white text-slate-300 opacity-40"
                }

                return (
                  <div key={`${field.label}-${index}`} className="relative">
                    <div className={fieldClass}>
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-start gap-3">
                          <span className="shrink-0 text-xs font-bold uppercase tracking-wider opacity-60">{field.label}</span>
                          <span className="min-w-0 flex-1 text-sm font-bold leading-snug break-words">
                            {field.value}
                          </span>
                        </div>
                        {isTheCorrectField && (
                          <span className="shrink-0 bg-white text-slate-900 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                            정답
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Explanation Card */}
        <div className="rounded-[28px] border-2 border-slate-100 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-8 w-8 rounded-full bg-slate-50 flex items-center justify-center">
              <Info size={18} className="text-slate-900" />
            </div>
            <h3 className="text-base font-bold text-slate-900">핵심 정리</h3>
          </div>
          <p className="text-[15px] font-medium leading-relaxed text-slate-600 [word-break:keep-all]">
            {explanation}
          </p>
        </div>
      </section>

      {/* Footer Button */}
      <div className="p-6 bg-white border-t border-slate-50">
        <Button 
          className="w-full h-14 rounded-2xl bg-slate-900 text-white font-bold text-lg shadow-xl shadow-slate-200 active:scale-95 transition-all"
          onClick={onNext}
        >
          {isLastQuestion ? "최종 결과 확인" : "다음으로 넘어가기"}
        </Button>
      </div>
    </div>
  )
}
