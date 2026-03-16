import { motion } from "framer-motion"
import { ChevronRight, Star, GraduationCap, House, BookOpenCheck, FileText, UserRound, MapPin, PlayCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import DashboardBottomNav from "@/components/layout/DashboardBottomNav"
import { MOCK_CATEGORY_CHAPTERS, flattenChapters } from "@/data/mock/chapter"
import type { CategoryChapters } from "@/data/mock/chapter"
import { MOCK_USER } from "@/data/mock/user"
import BadgeCollectionDialog from "@/components/features/badge/BadgeCollectionDialog"

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
  if (exp < 1000) return { icon: "🤎", label: "낡은 저금통", nextThreshold: 1000, nextIcon: "💳", nextLabel: "든든한 통장" }
  if (exp < 5000) return { icon: "💳", label: "든든한 통장", nextThreshold: 5000, nextIcon: "💎", nextLabel: "프리미엄 금고" }
  return { icon: "💎", label: "프리미엄 금고", nextThreshold: 5000, nextIcon: "", nextLabel: "" }
}

function CategoryCard({ cat, index, onSelect }: { cat: CategoryChapters; index: number; onSelect: () => void }) {
  const progress = Math.round((cat.completedChapters / cat.totalChapters) * 100)
  const isComplete = cat.completedChapters === cat.totalChapters
  const allChapters = flattenChapters(cat)
  const inProgressChapter = allChapters.find((c) => c.status === "in_progress")
  const nextChapter = allChapters.find((c) => c.status === "available") ?? inProgressChapter
  const grayscaleValue = isComplete ? 0 : Math.max(0, 100 - progress)
  const remaining = cat.totalChapters - cat.completedChapters

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
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-50 text-2xl shrink-0 overflow-hidden p-1.5">
            {cat.iconUrl ? (
              <img src={cat.iconUrl} alt={cat.categoryName} className="h-full w-full object-contain" />
            ) : (
              cat.emoji
            )}
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
              {isComplete ? `${cat.totalChapters}개 모두 완료` : `${cat.completedChapters}개 완료 · ${remaining}개 남음`}
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
            <MapPin size={11} className="text-orange-400 shrink-0" />
            <p className="text-[11px] font-bold text-slate-500 truncate">
              {nextChapter.title}
              {nextChapter.estimatedMinutes && (
                <span className="font-normal text-slate-400"> · {nextChapter.estimatedMinutes}분</span>
              )}
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

  let nextActionCategory = null
  let nextActionChapter = null
  for (const cat of MOCK_CATEGORY_CHAPTERS) {
    const inProgress = flattenChapters(cat).find(c => c.status === "in_progress")
    if (inProgress) { nextActionCategory = cat; nextActionChapter = inProgress; break }
  }
  if (!nextActionChapter) {
    for (const cat of MOCK_CATEGORY_CHAPTERS) {
      const available = flattenChapters(cat).find(c => c.status === "available")
      if (available) { nextActionCategory = cat; nextActionChapter = available; break }
    }
  }

  const firstName = MOCK_USER.name.replace("코딩하는 ", "")

  return (
    <main className="relative mx-auto h-[812px] w-[375px] overflow-hidden bg-slate-50 text-slate-900">
      <div className="relative flex h-full flex-col border border-slate-200">
        <div className="hide-scrollbar flex-1 overflow-y-auto pb-28">

          {/* Section 1: Byte 자산 & 뱃지 현황 (Hero) */}
          <section className="bg-white px-6 pt-10 pb-6 rounded-b-[32px] shadow-sm relative z-10 border-b border-slate-100">

            {/* 타이틀 */}
            <p className="text-[13px] font-semibold text-slate-400 mb-3">
              {firstName}님의 Byte 자산
            </p>

            {/* Byte 수치 + 뱃지 정보 */}
            <div className="flex items-center justify-between mb-4">
              <BadgeCollectionDialog>
                <button className="flex items-center gap-2.5 active:scale-95 transition-transform">
                  <span className="h-10 w-10 flex items-center justify-center rounded-full bg-amber-50 border border-amber-100 shadow-sm text-[22px] shrink-0">
                    {badge.icon}
                  </span>
                  <div className="text-left">
                    <p className="text-[15px] font-bold text-slate-900 leading-tight">{badge.label}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <p className="text-[11px] font-medium text-slate-400 leading-none">뱃지 컬렉션 보기</p>
                      <ChevronRight size={10} className="text-slate-300" />
                    </div>
                  </div>
                </button>
              </BadgeCollectionDialog>

              <div className="text-right">
                <p className="text-[24px] font-extrabold text-slate-900 leading-none">
                  {MOCK_USER.totalExp.toLocaleString()}<span className="text-orange-500 text-[15px] ml-1 font-bold">B</span>
                </p>
              </div>
            </div>

            {/* 다음 뱃지 진행 */}
            {remainingExp > 0 ? (
              <div className="bg-slate-50 rounded-xl px-4 py-3 border border-slate-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
                    <span>{badge.nextIcon}</span>
                    <span>다음 뱃지 <span className="text-slate-700">{badge.nextLabel}</span>까지</span>
                  </span>
                  <span className="text-[11px] font-bold text-orange-500">{remainingExp.toLocaleString()} B 남음</span>
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
            ) : (
              <div className="bg-amber-50 rounded-xl px-4 py-3 border border-amber-100 text-center">
                <p className="text-[12px] font-bold text-amber-700">🏆 최고 뱃지 달성! 대단해요!</p>
              </div>
            )}
          </section>

          {/* Section 2: Next Action */}
          {nextActionChapter && nextActionCategory && (
            <section className="px-5 pt-8 pb-4">
              <div className="flex items-center gap-2 mb-3 px-1">
                <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                  <PlayCircle size={14} className="fill-blue-600 text-white" />
                </div>
                <h2 className="text-sm font-bold text-slate-800 tracking-tight">
                  딱 {nextActionChapter.estimatedMinutes}분이면 돼요 🎯
                </h2>
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
                  <span className="text-[11px] font-bold text-slate-400 flex items-center gap-0.5">
                    이어서 풀기 · {nextActionChapter.estimatedMinutes}분
                    <ChevronRight size={13} className="inline -mt-0.5" />
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

          {/* Section 3: 내 학습 지도 */}
          <section className="px-5 pt-6 pb-6">
            <h2 className="text-sm font-bold text-slate-800 tracking-tight mb-4 px-1">내 학습 지도 🗺️</h2>
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
                매일 조금씩, 재정 독립에 가까워지고 있어요 💪
              </p>
            </div>
          </section>

        </div>

        <DashboardBottomNav tabs={LEARNING_TABS} onTabClick={onTabClick} />
      </div>
    </main>
  )
}
