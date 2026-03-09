import { motion } from "framer-motion"
import { ChevronRight, Star, GraduationCap, House, BookOpenCheck, FileText, UserRound, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import DashboardBottomNav from "@/components/layout/DashboardBottomNav"
import { MOCK_CATEGORY_CHAPTERS } from "@/data/mock/chapter"
import type { CategoryChapters } from "@/data/mock/chapter"

type LearningHomeProps = {
  onSelectCategory: (categoryId: string) => void
  onTabClick?: (label: string) => void
}

const LEARNING_TABS = [
  { label: "홈", icon: House, active: false },
  { label: "학습", icon: GraduationCap, active: true },
  { label: "노트", icon: BookOpenCheck, active: false },
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
  const inProgressChapter = cat.chapters.find((c) => c.status === "in_progress")
  const nextChapter = cat.chapters.find((c) => c.status === "available") ?? inProgressChapter

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, delay: index * 0.06 }}
    >
      <Button
        variant="outline"
        onClick={onSelect}
        className="flex h-auto w-full flex-col items-start gap-0 rounded-[22px] border-2 border-slate-100 bg-white p-0 shadow-sm transition-all hover:border-slate-200 hover:bg-white active:scale-[0.98] overflow-hidden"
      >
        {/* Top row */}
        <div className="flex w-full items-center gap-3 px-4 pt-4 pb-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-50 text-2xl shrink-0">
            {cat.emoji}
          </div>
          <div className="flex-1 text-left min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-[15px] font-bold text-slate-900 leading-tight">{cat.categoryName}</h3>
              {isComplete && (
                <span className="inline-flex items-center gap-0.5 rounded-md bg-slate-900 px-1.5 py-0.5 text-[10px] font-bold text-white">
                  <Star size={9} className="fill-white" /> 완료
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 font-medium mt-0.5 truncate">{cat.tagline}</p>
          </div>
          <ChevronRight size={16} className="text-slate-300 shrink-0" />
        </div>

        {/* Progress bar */}
        <div className="w-full px-4 pb-3">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-medium text-slate-400">
              {cat.completedChapters}/{cat.totalChapters} 챕터
            </span>
            <span className="text-[11px] font-bold text-slate-700">{progress}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
            <motion.div
              className="h-full rounded-full bg-slate-900"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.9, ease: "circOut", delay: index * 0.06 + 0.15 }}
            />
          </div>
        </div>

        {/* Next chapter hint */}
        {nextChapter && !isComplete && (
          <div className="w-full border-t border-slate-50 bg-slate-50/60 px-4 py-2.5 flex items-center gap-2">
            <TrendingUp size={12} className="text-slate-400 shrink-0" />
            <p className="text-[11px] font-bold text-slate-500 truncate">
              {inProgressChapter ? "이어하기: " : "다음: "}{nextChapter.title}
            </p>
          </div>
        )}
      </Button>
    </motion.div>
  )
}

export default function LearningHome({ onSelectCategory, onTabClick }: LearningHomeProps) {
  const totalChaptersAll = MOCK_CATEGORY_CHAPTERS.reduce((s, c) => s + c.totalChapters, 0)
  const completedChaptersAll = MOCK_CATEGORY_CHAPTERS.reduce((s, c) => s + c.completedChapters, 0)
  const overallPct = Math.round((completedChaptersAll / totalChaptersAll) * 100)
  const inProgressDomains = MOCK_CATEGORY_CHAPTERS.filter(
    (c) => c.completedChapters > 0 && c.completedChapters < c.totalChapters
  )

  return (
    <main className="relative mx-auto h-[812px] w-[375px] overflow-hidden bg-white text-slate-900">
      <div className="relative flex h-full flex-col border border-slate-200">

        {/* Header */}
        <header className="shrink-0 bg-white px-6 pt-10 pb-5 border-b border-slate-100">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">학습 홈</p>
          <h1 className="text-[22px] font-bold text-slate-900 leading-tight tracking-tight">
            내 학습 현황 📚
          </h1>

          {/* Overall progress hero */}
          <div className="mt-5 rounded-2xl border border-slate-100 bg-slate-50 px-5 py-4 flex items-center gap-4">
            <div className="text-center shrink-0">
              <span className="text-3xl font-black text-slate-900 leading-none">{overallPct}%</span>
              <p className="text-[10px] font-bold text-slate-400 mt-0.5">전체 달성</p>
            </div>
            <div className="flex-1 min-w-0 space-y-1.5">
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                <motion.div
                  className="h-full rounded-full bg-slate-900"
                  initial={{ width: 0 }}
                  animate={{ width: `${overallPct}%` }}
                  transition={{ duration: 1.2, ease: "circOut" }}
                />
              </div>
              <p className="text-xs font-medium text-slate-500">
                총 {completedChaptersAll}개 챕터 완료 · {inProgressDomains.length}개 분야 학습 중
              </p>
            </div>
          </div>
        </header>

        {/* Category list */}
        <section className="hide-scrollbar flex-1 overflow-y-auto px-5 py-5 pb-32">
          <p className="text-xs font-bold text-slate-400 mb-4 px-1">분야 선택</p>
          <div className="flex flex-col gap-3">
            {MOCK_CATEGORY_CHAPTERS.map((cat, i) => (
              <CategoryCard
                key={cat.categoryId}
                cat={cat}
                index={i}
                onSelect={() => onSelectCategory(cat.categoryId)}
              />
            ))}
          </div>

          <div className="mt-8 mb-4 text-center">
            <p className="text-[11px] font-medium text-slate-300 leading-relaxed">
              새로운 학습 분야가 계속 추가될 예정이에요 🌱
            </p>
          </div>
        </section>

        <DashboardBottomNav tabs={LEARNING_TABS} onTabClick={onTabClick} />
      </div>
    </main>
  )
}
