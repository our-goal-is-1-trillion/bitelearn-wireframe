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
    <section className="mt-12 mb-8">
      <div className="flex items-center gap-2 mb-6 px-1">
        <Sparkles className="h-5 w-5 text-slate-900 fill-slate-900" />
        <h3 className="text-lg font-bold text-slate-900 tracking-tight">오늘의 추천 학습👇</h3>
      </div>
      
      <div 
        onClick={onContinue}
        className="group relative overflow-hidden rounded-[36px] border-2 border-slate-200 bg-white p-7 shadow-sm transition-all hover:border-slate-900 active:scale-[0.98] cursor-pointer"
      >
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <span className="inline-block rounded-full bg-slate-900 px-3 py-1 text-xs font-bold text-white uppercase tracking-tighter">
              Featured Pick
            </span>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{first.category}</span>
          </div>
          
          <h4 className="text-xl font-bold text-slate-900 leading-tight tracking-tight">
            {first.title}
          </h4>
          
          <div className="mt-3 flex items-center justify-between border-t border-slate-50 pt-5">
            <div className="flex flex-col">
              <p className="text-xs font-bold text-slate-300 uppercase tracking-widest mb-1">Duration</p>
              <p className="text-sm font-bold text-slate-500">약 5분 소요</p>
            </div>
            <Button size="icon" variant="secondary" className="h-12 w-12 rounded-full bg-slate-50 text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-all shadow-md active:scale-90">
              <ArrowRight size={24} />
            </Button>
          </div>
        </div>
      </div>
      
      {recommendations[1] && (
        <Button 
          variant="outline"
          className="mt-5 flex w-full items-center justify-between rounded-[24px] border-2 border-dashed border-slate-200 bg-white px-6 py-5 h-auto shadow-sm group hover:border-slate-300"
        >
           <span className="text-sm font-bold text-slate-500 group-hover:text-slate-900 transition-colors">다른 추천: {recommendations[1].title}</span>
           <ArrowRight size={18} className="text-slate-200 group-hover:text-slate-400 transition-colors" />
        </Button>
      )}
    </section>
  )
}
