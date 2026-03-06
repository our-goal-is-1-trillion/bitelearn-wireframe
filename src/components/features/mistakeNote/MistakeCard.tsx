import { CalendarDays, ChevronRight, Clock3 } from "lucide-react"

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
    <article className="rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm">
      <div className="mb-2">
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600">
          {categoryLabel}
        </span>
      </div>

      <p className="text-xs text-slate-500">{chapterTitle}</p>
      <p className="mt-1 text-sm font-semibold leading-snug text-slate-900">{question}</p>

      <div className="mt-3 flex items-center justify-between">
        <span className="flex items-center gap-1 text-[11px] text-slate-400">
          <CalendarDays size={12} />
          {dateText}
        </span>
        <span className="flex items-center gap-1 text-[11px] text-slate-400">
          <Clock3 size={12} />
          {timeText}
        </span>
        <button
          type="button"
          onClick={onRetry}
          className="flex items-center gap-1 rounded-full border border-slate-200 px-2.5 py-1 text-[11px] font-medium text-slate-600 hover:bg-slate-50"
        >
          다시 풀기
          <ChevronRight size={12} />
        </button>
      </div>
    </article>
  )
}
