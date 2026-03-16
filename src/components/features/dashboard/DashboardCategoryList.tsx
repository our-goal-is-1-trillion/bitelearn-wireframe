import { Button } from "@/components/ui/button"
import type { DashboardCategory } from "./dashboard.types"

type DashboardCategoryListProps = {
  categories: DashboardCategory[]
}

export default function DashboardCategoryList({ categories }: DashboardCategoryListProps) {
  return (
    <article className="mt-8">
      <div className="px-1 mb-5">
        <h3 className="text-[17px] font-bold text-slate-900 tracking-tight">분야별 지식 쌓기 📚</h3>
        <p className="text-xs font-medium text-slate-500 mt-1">관심 있는 분야를 골라 공부를 시작해 보세요.</p>
      </div>
      
      {/* 2x2 Grid Layout for direct access to 4 domains */}
      <div className="grid grid-cols-2 gap-3">
        {categories.slice(0, 4).map((category) => (
          <Button
            key={category.name}
            variant="outline"
            className="flex h-auto flex-col items-start rounded-[24px] border-2 border-slate-100 bg-white p-4 transition-all hover:border-slate-300 active:scale-95 shadow-sm"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-xl overflow-hidden p-1">
              {category.iconUrl ? (
                <img src={category.iconUrl} alt={category.name} className="h-full w-full object-contain" />
              ) : (
                category.emoji
              )}
            </div>
            
            <div className="text-left w-full">
              <p className="text-sm font-bold text-slate-900 leading-tight mb-1">{category.name}</p>
              <p className="text-[11px] font-medium text-slate-400">{category.lessons}개 챕터</p>
            </div>
            
            <div className="mt-4 w-full">
              <div className="flex items-end justify-between mb-1.5 px-0.5">
                <span className="text-[10px] font-bold text-slate-900">{category.percent}%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                <div 
                  className="h-full rounded-full bg-slate-900" 
                  style={{ width: `${category.percent}%` }} 
                />
              </div>
            </div>
          </Button>
        ))}
      </div>
    </article>
  )
}
