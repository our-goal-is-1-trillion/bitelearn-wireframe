import { motion } from "framer-motion"
import { ChevronRight, Star, GraduationCap, House, BookOpenCheck, FileText, UserRound, TrendingUp, PlayCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import DashboardBottomNav from "@/components/layout/DashboardBottomNav"
import { MOCK_CATEGORY_CHAPTERS } from "@/data/mock/chapter"
import type { CategoryChapters } from "@/data/mock/chapter"
import { MOCK_USER } from "@/data/mock/user"

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

const getAssetBadge = (exp: number) => {
  if (exp < 1000) return { icon: "🤎", label: "낡은 저금통", nextThreshold: 1000, nextLabel: "든든한 통장", nextIcon: "💳 든든한 통장" }
  if (exp < 5000) return { icon: "💳", label: "든든한 통장", nextThreshold: 5000, nextLabel: "프리미엄 금고", nextIcon: "💎 프리미엄 금고" }
  return { icon: "💎", label: "프리미엄 금고", nextThreshold: 5000, nextLabel: "", nextIcon: "" }
}


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

  // 관제탑 Map 영역: 진도율에 따라 흑백 -> 컬러 (진도 0이면 완전 흑백, 100이면 완전 컬러)
  const grayscaleValue = isComplete ? 0 : Math.max(0, 100 - progress)

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, delay: index * 0.06 }}
      style={{ filter: `grayscale(${grayscaleValue}%)` }}
    >
      <Button
        variant="outline"
        onClick={onSelect}
        className="flex h-auto w-full flex-col items-start gap-0 rounded-[22px] border-2 border-slate-100 bg-white p-0 shadow-sm transition-all hover:border-slate-200 hover:bg-white active:scale-[0.98] overflow-hidden"
      >
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
  const badge = getAssetBadge(MOCK_USER.totalExp)
  
  let expProgress = 100
  let remainingExp = 0
  if (MOCK_USER.totalExp < 5000) {
    const prevThreshold = badge.nextThreshold === 1000 ? 0 : 1000
    const range = badge.nextThreshold - prevThreshold
    const current = MOCK_USER.totalExp - prevThreshold
    expProgress = Math.min(100, Math.round((current / range) * 100))
    remainingExp = badge.nextThreshold - MOCK_USER.totalExp
  }

  // 넥스트 액션 챕터 찾기 (in_progress 최우선, 없으면 첫 available)
  let nextActionCategory = null
  let nextActionChapter = null

  for (const cat of MOCK_CATEGORY_CHAPTERS) {
    const inProgress = cat.chapters.find(c => c.status === "in_progress")
    if (inProgress) {
      nextActionCategory = cat
      nextActionChapter = inProgress
      break
    }
  }

  if (!nextActionChapter) {
    for (const cat of MOCK_CATEGORY_CHAPTERS) {
      const available = cat.chapters.find(c => c.status === "available")
      if (available) {
        nextActionCategory = cat
        nextActionChapter = available
        break
      }
    }
  }

  return (
    <main className="relative mx-auto h-[812px] w-[375px] overflow-hidden bg-slate-50 text-slate-900">
      <div className="relative flex h-full flex-col border border-slate-200">

        <div className="hide-scrollbar flex-1 overflow-y-auto pb-28">
          
          {/* Section 1: 멍멍이의 자산 현황 (Hero) */}
          <section className="bg-white px-6 pt-10 pb-6 rounded-b-[32px] shadow-sm relative z-10 border-b border-slate-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-9 w-9 flex items-center justify-center rounded-full bg-slate-50 border border-slate-100 shadow-sm shrink-0 text-xl">
                {badge.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-semibold text-slate-400 leading-none mb-1">멍멍이 통장 · {badge.label}</p>
                <p className="text-[20px] font-extrabold text-slate-900 leading-none">
                  {MOCK_USER.totalExp.toLocaleString()}<span className="text-orange-500 text-[14px] ml-1 font-bold">B</span>
                </p>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl px-4 py-3 border border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-slate-500">
                  {remainingExp > 0 ? `${badge.nextIcon} 장만까지` : "최고 등급 달성!"}
                </span>
                {remainingExp > 0 && (
                  <span className="text-[11px] font-bold text-orange-500">{remainingExp.toLocaleString()} B 남음</span>
                )}
              </div>
              <div className="h-2 w-full bg-white rounded-full overflow-hidden border border-slate-200">
                <motion.div
                  className="h-full bg-orange-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${expProgress}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </div>
            </div>
          </section>

          {/* Section 2: 지금 당장 해야 할 1가지 (Next Action) */}
          {nextActionChapter && nextActionCategory && (
            <section className="px-5 pt-8 pb-4">
              <div className="flex items-center gap-2 mb-3 px-1">
                <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                  <PlayCircle size={14} className="fill-blue-600 text-white" />
                </div>
                <h2 className="text-sm font-bold text-slate-800 tracking-tight">지금 당장 이어하기</h2>
              </div>
              
              <Button
                variant="outline"
                className="h-auto w-full flex-col items-start gap-3 rounded-[24px] bg-white border-2 border-blue-500/20 shadow-md p-5 text-left transition-all hover:scale-[1.02] active:scale-[0.98]"
                onClick={() => onSelectCategory(nextActionCategory!.categoryId)}
              >
                 <div className="flex w-full items-center justify-between">
                    <span className="inline-flex rounded-md bg-blue-50 px-2 py-1 text-[10px] font-bold text-blue-600">
                      {nextActionCategory.categoryName}
                    </span>
                    <span className="text-[11px] font-bold text-slate-400">
                      이어서 시작하기 <ChevronRight size={14} className="inline -mt-0.5" />
                    </span>
                 </div>
                 <div>
                    <h3 className="text-lg font-bold text-slate-900 leading-snug whitespace-normal break-keep">
                      {nextActionChapter.title}
                    </h3>
                    <p className="text-xs font-medium text-slate-500 mt-1 line-clamp-1">
                      {nextActionChapter.subtitle}
                    </p>
                 </div>
              </Button>
            </section>
          )}

          {/* Section 3: 지식 금고 현황 (Category Map) */}
          <section className="px-5 pt-6 pb-6">
            <h2 className="text-sm font-bold text-slate-800 tracking-tight mb-4 px-1">지식 금고 현황</h2>
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
              <p className="text-[11px] font-medium text-slate-400 leading-relaxed">
                모든 금고를 컬러풀하게 채워보세요 🎨
              </p>
            </div>
          </section>

        </div>

        <DashboardBottomNav tabs={LEARNING_TABS} onTabClick={onTabClick} />
      </div>
    </main>
  )
}
