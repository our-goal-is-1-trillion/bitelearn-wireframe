import { motion } from "framer-motion"
import { ChevronLeft, Check, Lock, GraduationCap, House, BookOpenCheck, FileText, UserRound } from "lucide-react"
import { Button } from "@/components/ui/button"
import DashboardBottomNav from "@/components/layout/DashboardBottomNav"
import { MOCK_CATEGORY_CHAPTERS } from "@/data/mock/chapter"
import type { Chapter } from "@/data/mock/chapter"

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
// STEP_Y: center-to-center vertical distance between nodes (px)
// HALF_BTN: half of button height (h-20 = 80px)
// SVG_W: width of the SVG canvas (centered over the roadmap)
// X_OFFSETS: horizontal zigzag offsets from center per node index
const STEP_Y = 160
const HALF_BTN = 40
const SVG_W = 100
const X_OFFSETS = [-35, 0, 35, 0] as const

// ─── Catmull-Rom → cubic bezier path ────────────────────────
// Guarantees smooth tangents at every junction (no kinks between segments).
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

// ─── Roadmap SVG curve ───────────────────────────────────────
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
      {/* glow */}
      <path d={d} stroke="#F8FAFC" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
      {/* main track */}
      <path d={d} stroke="#E2E8F0" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ─── Stage Node ──────────────────────────────────────────────
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
  const isLocked = chapter.status === "locked"

  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05, type: "spring", stiffness: 260, damping: 22 }}
    >
      <Button
        disabled={isLocked}
        onClick={onSelect}
        variant={isInProgress ? "default" : "outline"}
        className={`
          relative z-10 flex h-20 w-20 items-center justify-center rounded-[28px] shadow-sm transition-all active:scale-95 border-2
          ${isCompleted ? "bg-slate-900 border-slate-900 text-white" : ""}
          ${isInProgress ? "bg-white border-slate-900 ring-4 ring-slate-100" : ""}
          ${isLocked ? "bg-slate-50 border-slate-200 text-slate-300" : "bg-white border-slate-200"}
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
          <div className="absolute -top-2 -right-1 rounded-full bg-slate-900 px-2 py-0.5 text-[10px] font-bold text-white">
            진행 중
          </div>
        )}
      </Button>

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

// ─── Main component ──────────────────────────────────────────
export default function ChapterList({ initialCategoryId, onBack, onSelectChapter, onTabClick }: ChapterListProps) {
  const category = MOCK_CATEGORY_CHAPTERS.find((c) => c.categoryId === (initialCategoryId || "real-estate")) ?? MOCK_CATEGORY_CHAPTERS[0]
  const progressPercent = Math.round((category.completedChapters / category.totalChapters) * 100)
  const reversedChapters = [...category.chapters].reverse()
  const count = reversedChapters.length

  // Total height of the roadmap canvas:
  // first node center at HALF_BTN, last at (count-1)*STEP_Y + HALF_BTN,
  // plus TEXT_H below last button for text labels + bottom padding.
  const TEXT_H = 72
  const roadmapH = HALF_BTN + (count - 1) * STEP_Y + HALF_BTN + TEXT_H

  return (
    <main className="relative mx-auto h-[812px] w-[375px] overflow-hidden bg-white text-slate-900 flex flex-col border border-slate-200">
      <div className="relative flex h-full flex-col">

        {/* ── Header ── */}
        <div className="shrink-0 bg-white border-b border-slate-100">
          <div className="flex h-14 items-center px-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="h-9 w-9 text-slate-600 rounded-xl"
            >
              <ChevronLeft size={20} />
            </Button>
            <h1 className="flex-1 text-center text-sm font-bold text-slate-900">{category.categoryName} 로드맵</h1>
            <div className="h-9 w-9" />
          </div>
        </div>

        {/* ── Scrollable content ── */}
        <section className="hide-scrollbar flex-1 overflow-y-auto px-6 pb-32 pt-10">

          {/* Progress card */}
          <div className="mb-14 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="flex items-end justify-between mb-3">
              <div>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">{category.categoryName}</h2>
                <p className="text-xs font-medium text-slate-400 mt-1">{category.tagline}</p>
              </div>
              <span className="text-2xl font-bold text-slate-900 leading-none">{progressPercent}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
              <motion.div
                className="h-full rounded-full bg-slate-900"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 1, ease: "circOut" }}
              />
            </div>
          </div>

          {/* ── Roadmap ── */}
          {/* Nodes are absolutely positioned at known coordinates so the SVG
              curve path exactly passes through each button's center. */}
          <div className="relative mx-auto w-full" style={{ height: roadmapH }}>
            <RoadmapCurve count={count} totalH={roadmapH} />

            {reversedChapters.map((chapter, i) => (
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
        </section>

        <DashboardBottomNav tabs={LEARNING_TABS} onTabClick={onTabClick} />
      </div>
    </main>
  )
}
