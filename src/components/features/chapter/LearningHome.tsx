import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { ChevronRight, Lock, GraduationCap, House, BookOpenCheck, FileText, UserRound, PlayCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import DashboardBottomNav from "@/components/layout/DashboardBottomNav"
import { MOCK_CATEGORY_CHAPTERS, flattenChapters } from "@/data/mock/chapter"
import type { CategoryChapters, Subcategory } from "@/data/mock/chapter"
import { MOCK_USER } from "@/data/mock/user"
import BadgeCollectionDialog from "@/components/features/badge/BadgeCollectionDialog"

const BADGE_FLAME_IMG = "/images/badge-flame-learner.png"
const BYTE_COIN_IMG = "/images/icon-byte-coin.png"

type LearningHomeProps = {
  onSelectSubcategory: (categoryId: string, subcategoryId: string) => void
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

// ─── Subcategory row ─────────────────────────────────────────
function SubcategoryRow({
  sub,
  index,
  onSelect,
}: {
  sub: Subcategory
  index: number
  onSelect: () => void
}) {
  const total = sub.chapters.length
  const completed = sub.chapters.filter((c) => c.status === "completed").length
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0
  const hasInProgress = sub.chapters.some((c) => c.status === "in_progress")
  const isAccessible = !sub.locked

  return (
    <motion.button
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.18 }}
      disabled={!isAccessible}
      onClick={isAccessible ? onSelect : undefined}
      className={`
        w-full flex items-center gap-3 px-4 py-3 text-left border-b border-slate-50 last:border-0
        transition-colors
        ${isAccessible ? "hover:bg-slate-50/70 active:bg-slate-100" : "cursor-not-allowed"}
      `}
    >
      {/* Icon */}
      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-lg
        ${isAccessible ? "bg-slate-50" : "bg-slate-50 opacity-40"}`}>
        {sub.locked ? <Lock size={13} className="text-slate-300" /> : sub.emoji}
      </div>

      {/* Text + progress */}
      <div className={`flex-1 min-w-0 ${!isAccessible ? "opacity-40" : ""}`}>
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="text-[13px] font-bold text-slate-800 leading-none">{sub.name}</span>
          {sub.locked ? (
            <span className="text-[10px] font-medium text-slate-300">준비 중</span>
          ) : hasInProgress ? (
            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 rounded-full px-2 py-0.5 whitespace-nowrap">학습 중</span>
          ) : completed === total && total > 0 ? (
            <span className="text-[10px] font-bold text-white bg-slate-800 rounded-full px-2 py-0.5 whitespace-nowrap">완료</span>
          ) : (
            <span className="text-[10px] font-medium text-slate-400 whitespace-nowrap">{completed}/{total} 챕터</span>
          )}
        </div>
        {isAccessible && (
          <div className="h-1 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-slate-400 transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
        )}
      </div>

      {isAccessible && <ChevronRight size={14} className="text-slate-300 shrink-0" />}
    </motion.button>
  )
}

// ─── Category card (accordion) ───────────────────────────────
function CategoryCard({
  cat,
  index,
  isExpanded,
  onToggle,
  onSelectSubcategory,
}: {
  cat: CategoryChapters
  index: number
  isExpanded: boolean
  onToggle: () => void
  onSelectSubcategory: (subId: string) => void
}) {
  const progress = Math.round((cat.completedChapters / cat.totalChapters) * 100)
  const remaining = cat.totalChapters - cat.completedChapters

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, delay: index * 0.06 }}
    >
      <div className={`rounded-[22px] border-2 bg-white shadow-sm overflow-hidden transition-colors
        ${isExpanded ? "border-slate-200" : "border-slate-100"}`}>

        {/* ── Header row (tap to toggle) ── */}
        <button
          onClick={onToggle}
          className="flex w-full items-center gap-3 px-4 pt-4 pb-3 text-left transition-colors hover:bg-slate-50/50 active:bg-slate-50"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-50 overflow-hidden p-1.5">
            {cat.iconUrl ? (
              <img src={cat.iconUrl} alt={cat.categoryName} className="h-full w-full object-contain" />
            ) : (
              <span className="text-2xl">{cat.emoji}</span>
            )}
          </div>
          <div className="flex-1 min-w-0 text-left">
            <h3 className="text-[15px] font-bold text-slate-900 leading-tight">{cat.categoryName}</h3>
            <p className="text-xs text-slate-400 font-medium mt-0.5 truncate">{cat.tagline}</p>
          </div>
          <motion.div animate={{ rotate: isExpanded ? 90 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronRight size={16} className="text-slate-400 shrink-0" />
          </motion.div>
        </button>

        {/* ── Progress bar ── */}
        <div className="px-4 pb-3">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-medium text-slate-400">
              {cat.completedChapters}개 완료 · {remaining}개 남음
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

        {/* ── Accordion: subcategory rows ── */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              key="accordion"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
            >
              <div className="border-t border-slate-100">
                {cat.subcategories.map((sub, i) => (
                  <SubcategoryRow
                    key={sub.id}
                    sub={sub}
                    index={i}
                    onSelect={() => onSelectSubcategory(sub.id)}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

// ─── Main component ──────────────────────────────────────────
export default function LearningHome({ onSelectSubcategory, onTabClick }: LearningHomeProps) {
  const [expandedCategoryId, setExpandedCategoryId] = useState<string | null>(null)
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

  let nextActionCategory: CategoryChapters | null = null
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

  const handleToggle = (categoryId: string) => {
    setExpandedCategoryId(prev => prev === categoryId ? null : categoryId)
  }

  const handleNextAction = () => {
    if (!nextActionCategory || !nextActionChapter) return
    const sub = nextActionCategory.subcategories.find(s =>
      s.chapters.some(c => c.id === nextActionChapter!.id)
    )
    if (sub) onSelectSubcategory(nextActionCategory.categoryId, sub.id)
  }

  // 숫자 카운팅 애니메이션
  const [displayExp, setDisplayExp] = useState(0)
  useEffect(() => {
    const target = MOCK_USER.totalExp
    const duration = 1200
    const steps = 40
    const increment = target / steps
    let current = 0
    let step = 0
    const timer = setInterval(() => {
      step++
      current = Math.min(Math.round(increment * step), target)
      setDisplayExp(current)
      if (current >= target) clearInterval(timer)
    }, duration / steps)
    return () => clearInterval(timer)
  }, [])

  return (
    <main className="relative mx-auto h-[812px] w-[375px] overflow-hidden bg-slate-50 text-slate-900">
      <div className="relative flex h-full flex-col border border-slate-200">
        <div className="hide-scrollbar flex-1 overflow-y-auto pb-28">

          {/* Section 1: Byte 자산 & 뱃지 현황 (Hero) */}
          <section className="bg-white px-5 pt-8 pb-5 rounded-b-[24px] shadow-sm border-b border-slate-100 z-10 relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={BYTE_COIN_IMG} alt="Byte" className="w-[22px] h-[22px] object-contain" />
                <div>
                  <p className="text-[11px] font-medium text-slate-400 leading-none mb-0.5">내 바이트</p>
                  <div className="flex items-baseline gap-0.5">
                    <span className="text-[28px] font-extrabold text-slate-900 leading-none tabular-nums">
                      {displayExp.toLocaleString()}
                    </span>
                    <span className="text-[13px] font-bold text-amber-500 leading-none">B</span>
                  </div>
                </div>
              </div>
              <BadgeCollectionDialog>
                <button className="flex items-center gap-2 active:scale-95 transition-transform">
                  <div className="relative w-[52px] h-[52px] rounded-full bg-orange-50 border border-orange-100 shadow-md flex items-center justify-center overflow-hidden">
                    <img src={BADGE_FLAME_IMG} alt="뱃지" className="w-[42px] h-[42px] object-contain" />
                  </div>
                  <ChevronRight size={14} className="text-slate-300" />
                </button>
              </BadgeCollectionDialog>
            </div>

            {remainingExp > 0 && (
              <div className="mt-4">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-medium text-slate-400">다음 뱃지까지</span>
                  <span className="text-[11px] font-semibold text-orange-500">{remainingExp.toLocaleString()} B 남음</span>
                </div>
                <div className="relative h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{ background: "linear-gradient(90deg, #f59e0b, #f97316)" }}
                    initial={{ width: 0 }}
                    animate={{ width: `${expProgress}%` }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                  />
                </div>
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
                onClick={handleNextAction}
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
                  isExpanded={expandedCategoryId === cat.categoryId}
                  onToggle={() => handleToggle(cat.categoryId)}
                  onSelectSubcategory={(subId) => onSelectSubcategory(cat.categoryId, subId)}
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
