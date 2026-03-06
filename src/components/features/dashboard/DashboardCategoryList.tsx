import { Button } from "@/components/ui/button"
import type { DashboardCategory } from "./dashboard.types"

type DashboardCategoryListProps = {
  categories: DashboardCategory[]
}

export default function DashboardCategoryList({ categories }: DashboardCategoryListProps) {
  return (
    <article className="mt-12">
      <div className="px-1 mb-6">
        <h3 className="text-lg font-bold text-slate-900 tracking-tight">분야별 지식 쌓기 📚</h3>
        <p className="text-sm font-medium text-slate-500 mt-1">관심 있는 분야를 골라 공부를 시작해 보세요.</p>
      </div>
      
      {/* 2x2 Grid Layout for direct access to 4 domains */}
      <div className="grid grid-cols-2 gap-4">
        {categories.slice(0, 4).map((category) => (
          <Button
            key={category.name}
            variant="outline"
            className="flex h-auto flex-col items-start rounded-[28px] border-2 border-slate-100 bg-white p-5 transition-all hover:border-slate-300 active:scale-95 shadow-sm"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-2xl">
              {category.emoji}
            </div>
            
            <div className="text-left w-full">
              <p className="text-[15px] font-bold text-slate-900 leading-tight mb-1">{category.name}</p>
              <p className="text-xs font-medium text-slate-400">{category.lessons}개 챕터</p>
            </div>
            
            <div className="mt-5 w-full">
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
