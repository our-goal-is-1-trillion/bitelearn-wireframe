import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { DashboardRecommendation } from "./dashboard.types"

type DashboardTodayRecommendationProps = {
  recommendations: DashboardRecommendation[]
  onContinue: () => void
}

export default function DashboardTodayRecommendation({
  recommendations,
  onContinue,
}: DashboardTodayRecommendationProps) {
  const first = recommendations[0]

  return (
    <section className="mt-10 mb-6">
      <div className="flex items-center gap-1.5 mb-5 px-1">
        <Sparkles className="h-5 w-5 text-slate-900" />
        <h3 className="text-lg font-black text-slate-900 tracking-tight">오늘의 추천 학습👇</h3>
      </div>
      
      <div 
        onClick={onContinue}
        className="group relative overflow-hidden rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-slate-300 active:scale-[0.98] cursor-pointer"
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="inline-block rounded-full bg-slate-900 px-3 py-0.5 text-xs font-bold text-white uppercase tracking-tighter">
              Featured
            </span>
            <span className="text-xs font-bold text-slate-400">{first.category}</span>
          </div>
          
          <h4 className="text-lg font-black text-slate-900 leading-tight">
            {first.title}
          </h4>
          
          <div className="mt-2 flex items-center justify-between">
            <p className="text-sm font-medium text-slate-400">약 5분 소요</p>
            <Button size="icon" variant="secondary" className="h-10 w-10 rounded-full bg-slate-50 text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-all shadow-sm">
              <ArrowRight size={20} />
            </Button>
          </div>
        </div>
      </div>
      
      {recommendations[1] && (
        <Button 
          variant="outline"
          className="mt-4 flex w-full items-center justify-between rounded-2xl border-dashed border-slate-200 bg-white px-5 py-4 h-auto shadow-sm"
        >
           <span className="text-sm font-bold text-slate-500">다른 추천: {recommendations[1].title}</span>
           <ArrowRight size={16} className="text-slate-200" />
        </Button>
      )}
    </section>
  )
}
