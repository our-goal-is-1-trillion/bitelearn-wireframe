import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Check, Lock, GraduationCap, House, BookOpenCheck, FileText, UserRound } from "lucide-react"
import { Button } from "@/components/ui/button"
import DashboardBottomNav from "@/components/layout/DashboardBottomNav"
import { MOCK_CATEGORY_CHAPTERS } from "@/data/mock/chapter"
import type { Chapter, Subcategory } from "@/data/mock/chapter"

type ChapterListProps = {
  initialCategoryId?: string
  onBack: () => void
  onSelectChapter: (chapterId?: string) => void
  onTabClick?: (label: string) => void
}

const LEARNING_TABS = [
  { label: "홈", icon: House, active: false },
  { label: "학습", icon: GraduationCap, active: true },
  { label: "노트", icon: BookOpenCheck, active: false },
  { label: "아티클", icon: FileText, active: false },
  { label: "마이", icon: UserRound, active: false },
]

// ─── Roadmap geometry ────────────────────────────────────────
const STEP_Y = 160
const HALF_BTN = 40
const SVG_W = 100
const X_OFFSETS = [-35, 0, 35, 0] as const

function smoothPath(pts: [number, number][]): string {
  if (pts.length < 2) return ""
  let d = `M ${pts[0][0]} ${pts[0][1]}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[Math.min(pts.length - 1, i + 2)]
    const cp1x = p1[0] + (p2[0] - p0[0]) / 6
    const cp1y = p1[1] + (p2[1] - p0[1]) / 6
    const cp2x = p2[0] - (p3[0] - p1[0]) / 6
    const cp2y = p2[1] - (p3[1] - p1[1]) / 6
    d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2[0]} ${p2[1]}`
  }
  return d
}

function RoadmapCurve({ count, totalH }: { count: number; totalH: number }) {
  if (count <= 1) return null
  const cx = SVG_W / 2
  const pts: [number, number][] = Array.from({ length: count }, (_, i) => [
    cx + X_OFFSETS[i % 4],
    HALF_BTN + i * STEP_Y,
  ])
  const d = smoothPath(pts)
  return (
    <svg
      className="absolute left-1/2 top-0 -translate-x-1/2 pointer-events-none"
      width={SVG_W}
      height={totalH}
      viewBox={`0 0 ${SVG_W} ${totalH}`}
      fill="none"
    >
      <path d={d} stroke="#F8FAFC" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
      <path d={d} stroke="#E2E8F0" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function StageNode({
  chapter,
  index,
  onSelect,
}: {
  chapter: Chapter
  index: number
  onSelect: () => void
}) {
  const isCompleted = chapter.status === "completed"
  const isInProgress = chapter.status === "in_progress"
  const isAvailable = chapter.status === "available"
  const isLocked = chapter.status === "locked"

  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05, type: "spring", stiffness: 260, damping: 22 }}
    >
      <div className="relative">
        {isInProgress && (
          <div className="absolute inset-0 rounded-[28px] bg-blue-400 opacity-20 animate-ping z-0" style={{ animationDuration: '2s' }} />
        )}
        <Button
          disabled={isLocked}
          onClick={onSelect}
          variant="outline"
          className={`
            relative z-10 flex h-20 w-20 items-center justify-center rounded-[28px] shadow-sm transition-all active:scale-95 border-2
            ${isCompleted ? "bg-slate-900 border-slate-900 text-white hover:bg-slate-800 hover:text-white" : ""}
            ${isInProgress ? "bg-white border-blue-500 ring-4 ring-blue-50 hover:bg-slate-50" : ""}
            ${isLocked ? "bg-slate-50 border-slate-200 text-slate-300" : (!isInProgress && !isCompleted) ? "bg-white border-slate-200 hover:bg-slate-50" : ""}
          `}
        >
          {isCompleted ? (
            <Check size={32} strokeWidth={3} />
          ) : isLocked ? (
            <Lock size={20} />
          ) : (
            <span className="text-3xl">{chapter.emoji}</span>
          )}
          {isInProgress && (
            <div className="absolute -top-3 -right-8 rounded-full bg-blue-600 px-2.5 py-1 text-[10px] font-black text-white shadow-md flex items-center gap-1 whitespace-nowrap">
              <span className="animate-pulse">▶</span> 이어서 학습 중
            </div>
          )}
          {isAvailable && (
            <div className="absolute -top-2 -right-4 rounded-full bg-slate-800 px-2 py-0.5 text-[10px] font-bold text-white shadow-sm whitespace-nowrap">
              다음 챕터
            </div>
          )}
        </Button>
      </div>

      <div className="mt-3 max-w-[110px] text-center">
        <p className={`text-xs font-bold leading-tight ${isLocked ? "text-slate-400" : "text-slate-900"}`}>
          {chapter.title}
        </p>
        {!isLocked && (
          <p className="mt-1 text-xs text-slate-400 font-medium">
            약 {chapter.estimatedMinutes}분 · {chapter.questionCount}문제
          </p>
        )}
      </div>
    </motion.div>
  )
}

// ─── Subcategory status helper ───────────────────────────────
type SubStatus = "in_progress" | "available" | "completed" | "locked" | "coming_soon"

function getSubStatus(sub: Subcategory): SubStatus {
  if (sub.locked) return "coming_soon"
  const chs = sub.chapters
  if (chs.length === 0) return "coming_soon"
  if (chs.every((c) => c.status === "completed")) return "completed"
  if (chs.some((c) => c.status === "in_progress")) return "in_progress"
  if (chs.some((c) => c.status === "available")) return "available"
  return "locked"
}

// ─── Subcategory card ────────────────────────────────────────
function SubcategoryCard({
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
  const progressPercent = total > 0 ? Math.round((completed / total) * 100) : 0
  const status = getSubStatus(sub)
  const isAccessible = status !== "coming_soon"

  const StatusBadge = () => {
    if (status === "in_progress")
      return <span className="text-[10px] font-bold text-blue-600 bg-blue-50 rounded-md px-2 py-0.5 whitespace-nowrap">학습 중</span>
    if (status === "available")
      return <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 rounded-md px-2 py-0.5 whitespace-nowrap">시작 가능</span>
    if (status === "completed")
      return (
        <span className="text-[10px] font-bold text-white bg-slate-900 rounded-md px-2 py-0.5 flex items-center gap-0.5 whitespace-nowrap">
          <Check size={9} strokeWidth={3} /> 완료
        </span>
      )
    if (status === "locked")
      return <span className="text-[10px] font-bold text-slate-500 bg-slate-100 rounded-md px-2 py-0.5 whitespace-nowrap">학습 예정</span>
    return (
      <span className="text-[10px] font-bold text-slate-400 bg-slate-50 rounded-md px-2 py-0.5 flex items-center gap-0.5 whitespace-nowrap">
        <Lock size={9} /> 준비 중
      </span>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, type: "spring", stiffness: 280, damping: 24 }}
    >
      <button
        disabled={!isAccessible}
        onClick={isAccessible ? onSelect : undefined}
        className={`
          w-full rounded-2xl border-2 bg-white p-4 text-left shadow-sm transition-all
          ${isAccessible ? "border-slate-100 hover:border-slate-200 active:scale-[0.98]" : "border-slate-100 opacity-50 cursor-not-allowed"}
        `}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-2xl ${!isAccessible ? "grayscale" : ""}`}>
            {sub.emoji}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-0.5">
              <h3 className="text-sm font-bold text-slate-900 leading-tight">{sub.name}</h3>
              <StatusBadge />
            </div>
            <p className="text-xs text-slate-400 font-medium leading-snug">{sub.description}</p>
          </div>
          {isAccessible && <ChevronRight size={16} className="text-slate-300 shrink-0" />}
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-medium text-slate-400">{completed}/{total} 챕터 완료</span>
            <span className="text-[10px] font-bold text-slate-600">{progressPercent}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
            <motion.div
              className="h-full rounded-full bg-slate-900"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.8, ease: "circOut", delay: index * 0.07 + 0.2 }}
            />
          </div>
        </div>
      </button>
    </motion.div>
  )
}

// ─── Main component ──────────────────────────────────────────
export default function ChapterList({ initialCategoryId, onBack, onSelectChapter, onTabClick }: ChapterListProps) {
  const [selectedSubId, setSelectedSubId] = useState<string | null>(null)

  const category = MOCK_CATEGORY_CHAPTERS.find((c) => c.categoryId === (initialCategoryId || "real-estate")) ?? MOCK_CATEGORY_CHAPTERS[0]
  const selectedSub = selectedSubId ? category.subcategories.find((s) => s.id === selectedSubId) ?? null : null

  const handleBack = () => {
    if (selectedSub) {
      setSelectedSubId(null)
    } else {
      onBack()
    }
  }

  const headerTitle = selectedSub
    ? `${selectedSub.name} 학습 경로`
    : `${category.categoryName} 로드맵`

  // Roadmap geometry for selected subcategory
  const displayChapters = selectedSub?.chapters ?? []
  const count = displayChapters.length
  const TEXT_H = 72
  const roadmapH = HALF_BTN + (count - 1) * STEP_Y + HALF_BTN + TEXT_H

  // Progress for progress card
  const categoryProgressPercent = Math.round((category.completedChapters / category.totalChapters) * 100)
  const subCompleted = selectedSub ? selectedSub.chapters.filter((c) => c.status === "completed").length : 0
  const subTotal = selectedSub ? selectedSub.chapters.length : 0
  const subProgressPercent = subTotal > 0 ? Math.round((subCompleted / subTotal) * 100) : 0

  return (
    <main className="relative mx-auto h-[812px] w-[375px] overflow-hidden bg-white text-slate-900 flex flex-col border border-slate-200">
      <div className="relative flex h-full flex-col">

        {/* ── Header ── */}
        <div className="shrink-0 bg-white border-b border-slate-100">
          <div className="flex h-14 items-center px-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBack}
              className="h-9 w-9 text-slate-600 rounded-xl"
            >
              <ChevronLeft size={20} />
            </Button>
            <h1 className="flex-1 text-center text-sm font-bold text-slate-900">{headerTitle}</h1>
            <div className="h-9 w-9" />
          </div>
        </div>

        {/* ── Animated content area ── */}
        <AnimatePresence mode="wait">
          {!selectedSub ? (
            /* ── Subcategory Picker ── */
            <motion.section
              key="picker"
              className="hide-scrollbar flex-1 overflow-y-auto px-5 pb-32 pt-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              {/* Category progress card */}
              <div className="mb-6 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-50 text-2xl shrink-0 overflow-hidden p-1.5">
                    {category.iconUrl ? (
                      <img src={category.iconUrl} alt={category.categoryName} className="h-full w-full object-contain" />
                    ) : (
                      category.emoji
                    )}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-base font-bold text-slate-900 leading-tight">{category.categoryName}</h2>
                    <p className="text-xs font-medium text-slate-400 mt-0.5">{category.tagline}</p>
                  </div>
                  <span className="text-xl font-bold text-slate-900 leading-none">{categoryProgressPercent}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <motion.div
                    className="h-full rounded-full bg-slate-900"
                    initial={{ width: 0 }}
                    animate={{ width: `${categoryProgressPercent}%` }}
                    transition={{ duration: 1, ease: "circOut" }}
                  />
                </div>
                <p className="mt-2 text-[11px] font-medium text-slate-400">
                  {category.completedChapters}개 완료 · {category.totalChapters - category.completedChapters}개 남음
                </p>
              </div>

              {/* Subcategory list */}
              <div className="mb-3 px-1">
                <p className="text-xs font-bold text-slate-500">어떤 유형으로 공부할까요?</p>
              </div>
              <div className="flex flex-col gap-3">
                {category.subcategories.map((sub, i) => (
                  <SubcategoryCard
                    key={sub.id}
                    sub={sub}
                    index={i}
                    onSelect={() => setSelectedSubId(sub.id)}
                  />
                ))}
              </div>
            </motion.section>
          ) : (
            /* ── Chapter Roadmap ── */
            <motion.section
              key={selectedSub.id}
              className="hide-scrollbar flex-1 overflow-y-auto px-6 pb-32 pt-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              {/* Subcategory progress card */}
              <div className="mb-12 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                <div className="flex items-end justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-slate-400 bg-slate-50 rounded-md px-2 py-0.5">{category.categoryName}</span>
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 tracking-tight">{selectedSub.name}</h2>
                    <p className="text-xs font-medium text-slate-400 mt-1">{selectedSub.description}</p>
                  </div>
                  <span className="text-2xl font-bold text-slate-900 leading-none">{subProgressPercent}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <motion.div
                    className="h-full rounded-full bg-slate-900"
                    initial={{ width: 0 }}
                    animate={{ width: `${subProgressPercent}%` }}
                    transition={{ duration: 1, ease: "circOut" }}
                  />
                </div>
              </div>

              {/* Roadmap */}
              <div className="relative mx-auto w-full" style={{ height: roadmapH }}>
                <RoadmapCurve count={count} totalH={roadmapH} />

                {displayChapters.map((chapter, i) => (
                  <div
                    key={chapter.id}
                    className="absolute"
                    style={{
                      top: i * STEP_Y,
                      left: "50%",
                      transform: `translateX(calc(-50% + ${X_OFFSETS[i % 4]}px))`,
                    }}
                  >
                    <StageNode
                      chapter={chapter}
                      index={i}
                      onSelect={() => onSelectChapter(chapter.id)}
                    />
                  </div>
                ))}
              </div>

              <div className="mt-8 mb-4 text-center">
                <div className="inline-block rounded-xl border border-dashed border-slate-200 bg-slate-50 px-6 py-3 text-xs font-bold text-slate-300">
                  다음 단계를 준비 중이에요
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        <DashboardBottomNav tabs={LEARNING_TABS} onTabClick={onTabClick} />
      </div>
    </main>
  )
}
