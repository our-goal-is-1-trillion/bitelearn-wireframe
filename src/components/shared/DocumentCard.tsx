import { useLayoutEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check } from "lucide-react"

export type DocumentCardField = {
  label: string
  value: string
}

export type DocumentCardData = {
  header: string
  subHeader: string
  sectionTitle: string
  fields: DocumentCardField[]
  footerNotice?: string
}

type InteractiveProps = {
  mode: "interactive"
  /** document_select 일 때만 클릭 가능 */
  choiceMode: "multiple" | "ox" | "document_select"
  selectedValue?: string
  onSelectField?: (value: string) => void
  isChecking?: boolean
  correctIndex?: number
}

type ResultProps = {
  mode: "result"
  correctIndex?: number
  /** 유저가 선택한 필드 인덱스 */
  selectedAnswerIndex?: number
}

type DocumentCardProps = {
  data: DocumentCardData
} & (InteractiveProps | ResultProps)

export default function DocumentCard(props: DocumentCardProps) {
  const { data } = props
  const valueRefs = useRef<Record<number, HTMLSpanElement | null>>({})
  const [isWrappedMap, setIsWrappedMap] = useState<Record<number, boolean>>({})

  const isInteractive = props.mode === "interactive"
  const isChecking = isInteractive && props.isChecking === true
  const selectedValue = isInteractive ? (props.selectedValue ?? "") : ""
  const correctIndex = props.correctIndex

  useLayoutEffect(() => {
    const measure = () => {
      const next: Record<number, boolean> = {}
      Object.entries(valueRefs.current).forEach(([key, el]) => {
        if (!el) return
        const style = window.getComputedStyle(el)
        const lineHeight = Number.parseFloat(style.lineHeight || "0")
        next[Number(key)] = lineHeight > 0 ? el.scrollHeight > lineHeight + 1 : false
      })
      setIsWrappedMap(next)
    }
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [data, selectedValue, isChecking])

  return (
    <div className="relative rounded-[32px] border-2 border-slate-100 bg-slate-50 p-6 overflow-hidden shadow-inner">

      {/* Scanning animation overlay (interactive, isChecking) */}
      {isInteractive && (
        <AnimatePresence>
          {isChecking && (
            <motion.div
              className="absolute inset-0 z-20 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="absolute inset-x-0 h-1 bg-slate-900/40 shadow-[0_0_15px_rgba(15,23,42,0.3)] z-30"
                initial={{ top: "0%" }}
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-0 bg-slate-900/5 backdrop-blur-[1px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Header */}
      <div className="mb-5 border-b border-slate-200 pb-4">
        <p className="text-sm font-bold text-slate-900 uppercase tracking-widest">{data.header}</p>
        <p className="text-xs font-medium text-slate-400 mt-1">{data.subHeader}</p>
      </div>

      <p className="mb-4 text-xs font-bold text-slate-400 uppercase tracking-tighter">{data.sectionTitle}</p>

      {/* Fields */}
      <div className="space-y-3">
        {data.fields.map((field, index) => {
          const isSelected = selectedValue === String(index)
          const isAnswer = index === correctIndex

          let fieldClass = "w-full rounded-2xl border-2 px-4 py-3.5 text-left transition-all duration-200 "
          let showCheckIcon = false
          let showAnswerBadge = false

          if (props.mode === "interactive") {
            const { choiceMode } = props
            if (choiceMode === "document_select") {
              if (isChecking) {
                if (isAnswer) {
                  fieldClass += "border-slate-900 bg-slate-900 text-white shadow-lg"
                } else if (isSelected) {
                  fieldClass += "border-slate-200 bg-white text-slate-400 line-through"
                } else {
                  fieldClass += "border-slate-100 bg-white text-slate-500 opacity-80"
                }
              } else if (isSelected) {
                fieldClass += "border-slate-900 bg-white text-slate-900 shadow-xl shadow-slate-200 -translate-y-0.5 ring-4 ring-slate-100"
                showCheckIcon = true
              } else {
                fieldClass += "border-white bg-white text-slate-900 hover:border-slate-200 shadow-sm"
              }
            } else {
              fieldClass += "border-white bg-white text-slate-900 shadow-sm cursor-default"
            }
          } else {
            // result mode
            const { selectedAnswerIndex } = props
            if (isAnswer) {
              fieldClass += "border-slate-900 bg-slate-900 text-white shadow-lg scale-[1.02]"
              showAnswerBadge = true
            } else if (selectedAnswerIndex === index && !isAnswer) {
              fieldClass += "border-slate-200 bg-white text-slate-400 line-through"
            } else {
              fieldClass += "border-slate-100 bg-white text-slate-500 opacity-80"
            }
          }

          const handleClick =
            props.mode === "interactive" && props.choiceMode === "document_select" && !isChecking
              ? () => props.onSelectField?.(String(index))
              : undefined

          const isDisabled =
            props.mode !== "interactive" ||
            isChecking ||
            props.choiceMode !== "document_select"

          return (
            <div key={`${field.label}-${index}`} className="relative">
              <button
                type="button"
                className={fieldClass}
                onClick={handleClick}
                disabled={isDisabled}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className={isWrappedMap[index] ? "flex flex-col items-start gap-1" : "flex items-start gap-3"}>
                    <span className="shrink-0 text-xs font-bold uppercase tracking-wider opacity-60">
                      {field.label}
                    </span>
                    <span
                      ref={(el) => { valueRefs.current[index] = el }}
                      className="min-w-0 basis-0 flex-1 text-sm font-bold leading-snug break-words"
                    >
                      {field.value}
                    </span>
                  </div>

                  {showCheckIcon && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="shrink-0 h-6 w-6 rounded-full bg-slate-900 text-white flex items-center justify-center"
                    >
                      <Check size={14} strokeWidth={3} />
                    </motion.div>
                  )}

                  {showAnswerBadge && (
                    <span className="shrink-0 bg-white text-slate-900 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                      정답
                    </span>
                  )}
                </div>
              </button>
            </div>
          )
        })}
      </div>

      {data.footerNotice && (
        <p className="mt-5 text-[11px] font-bold text-slate-300 text-center uppercase tracking-widest">
          {data.footerNotice}
        </p>
      )}
    </div>
  )
}
