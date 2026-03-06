import { motion } from "framer-motion"
import { ChevronRight, GraduationCap, House, BookOpenCheck, FileText, UserRound } from "lucide-react"
import { Button } from "@/components/ui/button"
import DashboardBottomNav from "@/components/layout/DashboardBottomNav"
import { MOCK_CATEGORY_CHAPTERS } from "@/data/mock/chapter"
import type { CategoryChapters } from "@/data/mock/chapter"

type LearningHomeProps = {
  onBack: () => void
  onSelectCategory: (categoryId: string) => void
}

const LEARNING_TABS = [
  { label: "홈", icon: House, active: false },
  { label: "학습", icon: GraduationCap, active: true },
  { label: "오답노트", icon: BookOpenCheck, active: false },
  { label: "아티클", icon: FileText, active: false },
  { label: "마이", icon: UserRound, active: false },
]

function CategoryCard({
  cat,
  index,
  onSelect,
}: {
  cat: CategoryChapters
  index: number
  onSelect: () => void
}) {
  const progress = Math.round((cat.completedChapters / cat.totalChapters) * 100)
  const isComplete = cat.completedChapters === cat.totalChapters

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Button
        variant="outline"
        onClick={onSelect}
        className="flex h-auto w-full flex-col items-start gap-6 rounded-[24px] border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-slate-300 hover:bg-white active:scale-[0.98]"
      >
        <div className="flex w-full items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-slate-50 text-3xl">
              {cat.emoji}
            </div>
            <div className="text-left">
              <h3 className="text-lg font-bold text-slate-900 leading-tight">{cat.categoryName}</h3>
              <p className="mt-1 text-sm text-slate-500 font-medium">{cat.tagline}</p>
            </div>
          </div>
          
          {isComplete && (
            <div className="rounded-md bg-slate-900 px-2 py-0.5 text-xs font-bold text-white">
              완료
            </div>
          )}
        </div>

        <div className="w-full">
          <div className="mb-2 flex items-end justify-between px-1">
            <span className="text-xs font-bold text-slate-400">
              {cat.completedChapters} / {cat.totalChapters} 챕터 완료
            </span>
            <span className="text-sm font-bold text-slate-900">
              {progress}%
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
            <motion.div
              className="h-full rounded-full bg-slate-900"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "circOut", delay: index * 0.05 + 0.2 }}
            />
          </div>
        </div>

        <div className="flex w-full items-center justify-center pt-2 border-t border-slate-50">
           <span className="text-xs font-bold text-slate-300 flex items-center gap-1">
             자세히 보기 <ChevronRight size={14} />
           </span>
        </div>
      </Button>
    </motion.div>
  )
}

export default function LearningHome({ onBack, onSelectCategory }: LearningHomeProps) {
  const totalDomains = MOCK_CATEGORY_CHAPTERS.length
  const startedDomains = MOCK_CATEGORY_CHAPTERS.filter((c) => c.completedChapters > 0).length

  return (
    <main className="relative mx-auto h-[812px] w-[375px] overflow-hidden bg-white text-slate-900">
      <div className="relative flex h-full flex-col border border-slate-200">

        <header className="shrink-0 bg-white px-6 pt-12 pb-8 border-b border-slate-50">
          <div className="flex items-end justify-between">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">학습 카테고리</h1>
            <div className="text-right">
              <span className="text-2xl font-bold text-slate-900 leading-none">
                {startedDomains}<span className="text-slate-100 mx-1">/</span>{totalDomains}
              </span>
            </div>
          </div>
          
          <div className="mt-8 flex items-center gap-2">
            <div className="h-1 w-6 rounded-full bg-slate-900" />
            <p className="text-sm font-medium text-slate-500">관심 있는 분야를 골라 가볍게 시작해보세요.</p>
          </div>
        </header>

        <section className="hide-scrollbar flex-1 overflow-y-auto px-6 py-8">
          <div className="flex flex-col gap-10">
            {MOCK_CATEGORY_CHAPTERS.map((cat, i) => (
              <CategoryCard
                key={cat.categoryId}
                cat={cat}
                index={i}
                onSelect={() => onSelectCategory(cat.categoryId)}
              />
            ))}
          </div>

          <div className="mt-20 mb-12 text-center px-8">
            <p className="text-xs font-bold text-slate-300 leading-relaxed">
              새로운 학습 분야가 계속 추가될 예정이에요
            </p>
          </div>
        </section>

        <DashboardBottomNav tabs={LEARNING_TABS} />
      </div>
    </main>
  )
}
