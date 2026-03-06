import { CalendarDays, ChevronRight, Clock3, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"

type MistakeCardProps = {
  categoryLabel: string
  dateText: string
  chapterTitle: string
  question: string
  timeText: string
  onRetry?: () => void
}

export default function MistakeCard({
  categoryLabel,
  dateText,
  chapterTitle,
  question,
  timeText,
  onRetry,
}: MistakeCardProps) {
  return (
    <article className="group relative flex flex-col items-start rounded-[28px] border-2 border-slate-100 bg-white p-6 shadow-sm transition-all hover:border-slate-300 active:scale-[0.98]">
      {/* Category & Date Header */}
      <div className="w-full flex items-center justify-between mb-4">
        <span className="rounded-full bg-slate-50 border border-slate-100 px-3 py-1 text-xs font-bold text-slate-500 uppercase tracking-tighter">
          {categoryLabel}
        </span>
        <div className="flex items-center gap-3 text-slate-300">
           <div className="flex items-center gap-1 text-[11px] font-bold">
             <CalendarDays size={12} />
             {dateText}
           </div>
        </div>
      </div>

      {/* Chapter & Question */}
      <div className="space-y-2 mb-6">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{chapterTitle}</p>
        <h3 className="text-base font-bold leading-snug text-slate-900 break-keep">
          {question}
        </h3>
      </div>

      {/* Bottom Action Area */}
      <div className="w-full pt-5 border-t border-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-slate-300">
           <Clock3 size={12} />
           <span className="text-[11px] font-bold uppercase">{timeText}</span>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onRetry}
          className="rounded-full h-9 px-4 border-slate-200 bg-white text-xs font-bold text-slate-600 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all gap-1.5"
        >
          <RotateCcw size={13} strokeWidth={2.5} />
          다시 도전
        </Button>
      </div>
      
      {/* Subtle corner accent for lo-fi feel */}
      <div className="absolute top-4 right-4 h-1.5 w-1.5 rounded-full bg-slate-100 group-hover:bg-slate-900 transition-colors" />
    </article>
  )
}
