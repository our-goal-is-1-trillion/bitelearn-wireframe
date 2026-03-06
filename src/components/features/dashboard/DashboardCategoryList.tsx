import { Button } from "@/components/ui/button"
import type { DashboardCategory } from "./dashboard.types"

type DashboardCategoryListProps = {
  categories: DashboardCategory[]
}

export default function DashboardCategoryList({ categories }: DashboardCategoryListProps) {
  return (
    <article className="mt-10">
      <div className="flex items-center justify-between px-1 mb-5">
        <h3 className="text-lg font-black text-slate-900 tracking-tight">지식 보관함 📚</h3>
        <Button variant="link" size="sm" className="h-auto p-0 text-slate-400 text-xs font-bold hover:text-slate-900">
          전체보기
        </Button>
      </div>
      
      <div className="hide-scrollbar -mx-5 flex gap-4 overflow-x-auto px-5 pb-4">
        {categories.map((category) => (
          <Button
            key={category.name}
            variant="outline"
            className="flex h-auto min-w-[156px] flex-col items-start rounded-[24px] border-slate-200 bg-white p-5 transition-all hover:border-slate-300 active:scale-95 shadow-sm"
          >
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-slate-50 text-3xl">
              {category.emoji}
            </div>
            
            <div className="text-left w-full">
              <p className="text-base font-bold text-slate-900 leading-tight mb-1">{category.name}</p>
              <p className="text-xs font-medium text-slate-400">{category.lessons} Chapters</p>
            </div>
            
            <div className="mt-5 w-full">
              <div className="flex items-end justify-between mb-2 px-1">
                <span className="text-xs font-bold text-slate-900">{category.percent}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
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
