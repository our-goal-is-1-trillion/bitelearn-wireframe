import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, Lock, Clock, ChevronRight } from "lucide-react"
import { GraduationCap, House, BookOpenCheck, FileText, UserRound } from "lucide-react"
import DashboardBottomNav from "@/components/layout/DashboardBottomNav"
import { MOCK_CATEGORY_CHAPTERS } from "@/data/mock/chapter"
import type { Chapter } from "@/data/mock/chapter"

type ChapterListProps = {
  onSelectChapter: (chapterId: string) => void
}

const LEARNING_TABS = [
  { label: "홈", icon: House, active: false },
  { label: "학습", icon: GraduationCap, active: true },
  { label: "오답노트", icon: BookOpenCheck, active: false },
  { label: "아티클", icon: FileText, active: false },
  { label: "마이", icon: UserRound, active: false },
]

// ─── Stage circle ─────────────────────────────────────────────
function StageCircle({ chapter }: { chapter: Chapter }) {
  const base = "relative z-10 flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold"

  if (chapter.status === "completed") {
    return (
      <div className={`${base} bg-indigo-600 text-white`}>
        <Check size={13} strokeWidth={3} />
      </div>
    )
  }

  if (chapter.status === "in_progress") {
    return (
      <div className="relative">
        <div className={`${base} border-2 border-indigo-500 bg-white text-indigo-600`}>
          {chapter.stageNumber}
        </div>
        <div className="absolute inset-0 animate-ping rounded-full bg-indigo-400 opacity-25" />
      </div>
    )
  }

  if (chapter.status === "available") {
    return (
      <div className={`${base} border-2 border-slate-300 bg-white text-slate-500`}>
        {chapter.stageNumber}
      </div>
    )
  }

  return (
    <div className={`${base} bg-slate-100 text-slate-400`}>
      <Lock size={12} />
    </div>
  )
}

// ─── Chapter card ──────────────────────────────────────────────
function ChapterCard({
  chapter,
  onSelect,
  onLockedTap,
  isShaking,
}: {
  chapter: Chapter
  onSelect: () => void
  onLockedTap: () => void
  isShaking: boolean
}) {
  const isLocked = chapter.status === "locked"
  const isCompleted = chapter.status === "completed"
  const isInProgress = chapter.status === "in_progress"
  const isAvailable = chapter.status === "available"

  const cardBase =
    "w-full rounded-xl border px-3 py-3 text-left transition-all active:scale-[0.98]"
  const cardStyle = isInProgress
    ? `${cardBase} border-indigo-200 bg-indigo-50/40`
    : isLocked
      ? `${cardBase} border-slate-100 bg-slate-50/60 opacity-70`
      : `${cardBase} border-slate-100 bg-white shadow-sm`

  const handleClick = () => {
    if (isLocked) {
      onLockedTap()
    } else {
      onSelect()
    }
  }

  return (
    <motion.button
      className={cardStyle}
      onClick={handleClick}
      animate={isShaking ? { x: [0, -5, 5, -5, 5, 0] } : { x: 0 }}
      transition={{ duration: 0.35 }}
    >
      {/* Top row: emoji + title + status badge */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2 flex-1 min-w-0">
          <span className="mt-0.5 text-base leading-none">{chapter.emoji}</span>
          <div className="min-w-0">
            <p className={`text-sm font-bold leading-snug ${isLocked ? "text-slate-400" : "text-slate-900"}`}>
              {chapter.title}
            </p>
            <p className={`mt-0.5 text-xs leading-snug ${isLocked ? "text-slate-400" : "text-slate-500"}`}>
              {chapter.subtitle}
            </p>
          </div>
        </div>

        {/* Right badge */}
        {isCompleted && (
          <span className="mt-0.5 shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500">
            완료 ✓
          </span>
        )}
        {isInProgress && (
          <div className="mt-0.5 shrink-0 flex items-center gap-1 rounded-full bg-indigo-600 px-2.5 py-1 text-[10px] font-semibold text-white">
            이어하기
            <ChevronRight size={10} />
          </div>
        )}
        {isAvailable && (
          <div className="mt-0.5 shrink-0 flex items-center gap-1 rounded-full border border-slate-300 px-2.5 py-1 text-[10px] font-medium text-slate-700">
            시작하기
            <ChevronRight size={10} />
          </div>
        )}
        {isLocked && (
          <Lock size={13} className="mt-1 shrink-0 text-slate-300" />
        )}
      </div>

      {/* In-progress: progress bar */}
      {isInProgress && chapter.progress !== undefined && (
        <div className="mt-2.5">
          <div className="mb-1 flex justify-between">
            <span className="text-[10px] text-indigo-500 font-medium">진행 중</span>
            <span className="text-[10px] text-indigo-500 font-medium">{chapter.progress}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-indigo-100">
            <motion.div
              className="h-full rounded-full bg-indigo-500"
              initial={{ width: 0 }}
              animate={{ width: `${chapter.progress}%` }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            />
          </div>
        </div>
      )}

      {/* Bottom meta row */}
      {!isLocked ? (
        <div className="mt-2 flex items-center gap-2">
          <span className="flex items-center gap-1 text-[10px] text-slate-400">
            <Clock size={10} />
            {chapter.estimatedMinutes}분
          </span>
          <span className="text-[10px] text-slate-400">
            {chapter.questionCount}문제
          </span>
        </div>
      ) : (
        <p className="mt-2 text-[10px] text-slate-400">앞 챕터를 완료하면 열려요 🔒</p>
      )}
    </motion.button>
  )
}

// ─── Main component ────────────────────────────────────────────
export default function ChapterList({ onSelectChapter }: ChapterListProps) {
  const [selectedCategoryId, setSelectedCategoryId] = useState("real-estate")
  const [shakingId, setShakingId] = useState<string | null>(null)

  const category = MOCK_CATEGORY_CHAPTERS.find((c) => c.categoryId === selectedCategoryId)!
  const progressPercent = Math.round((category.completedChapters / category.totalChapters) * 100)

  const handleLockedTap = (id: string) => {
    setShakingId(id)
    setTimeout(() => setShakingId(null), 500)
  }

  const handleCategorySwitch = (id: string) => {
    setSelectedCategoryId(id)
    setShakingId(null)
  }

  const listVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.05 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -8 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.28 } },
  }

  return (
    <main className="relative mx-auto h-[812px] w-[375px] overflow-hidden bg-white text-slate-900">
      <div className="relative flex h-full flex-col border border-slate-200">

        {/* ── Fixed header ────────────────────────── */}
        <div className="absolute inset-x-0 top-0 z-20 border-b border-slate-100 bg-white">
          {/* Header bar */}
          <div className="flex h-14 items-center px-4">
            <div className="h-8 w-8" />
            <h1 className="flex-1 text-center text-sm font-bold text-slate-900">학습</h1>
            <div className="h-8 w-8" />
          </div>

          {/* Category tab bar */}
          <div className="hide-scrollbar flex gap-2 overflow-x-auto px-4 pb-3">
            {MOCK_CATEGORY_CHAPTERS.map((cat) => (
              <motion.button
                key={cat.categoryId}
                onClick={() => handleCategorySwitch(cat.categoryId)}
                whileTap={{ scale: 0.95 }}
                className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  selectedCategoryId === cat.categoryId
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat.emoji} {cat.categoryName}
              </motion.button>
            ))}
          </div>
        </div>

        {/* ── Scrollable content ───────────────────── */}
        <section className="hide-scrollbar flex-1 overflow-y-auto px-5 pb-6 pt-[108px]">

          {/* Category hero card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategoryId + "-hero"}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="mb-5 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{category.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-500">{category.categoryName}</p>
                  <p className="text-sm font-bold text-slate-900">{category.tagline}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-xs text-slate-500">
                    {category.completedChapters}/{category.totalChapters} 완료
                  </p>
                  <p className="text-sm font-bold text-indigo-600">{progressPercent}%</p>
                </div>
              </div>

              {/* Animated overall progress bar */}
              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-200">
                <motion.div
                  className="h-full rounded-full bg-indigo-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
                />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Chapter path list */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategoryId + "-list"}
              variants={listVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
            >
              {category.chapters.map((chapter, index) => (
                <motion.div
                  key={chapter.id}
                  variants={itemVariants}
                  className="flex"
                >
                  {/* Left: stage circle + connector line */}
                  <div className="flex w-10 flex-col items-center">
                    <StageCircle chapter={chapter} />
                    {/* Vertical connector line */}
                    {index < category.chapters.length - 1 && (
                      <div
                        className={`mt-1 w-0.5 flex-1 min-h-[16px] rounded-full ${
                          chapter.status === "completed" ? "bg-indigo-200" : "bg-slate-100"
                        }`}
                      />
                    )}
                  </div>

                  {/* Right: chapter card */}
                  <div className="flex-1 pl-2 pb-4">
                    <ChapterCard
                      chapter={chapter}
                      isShaking={shakingId === chapter.id}
                      onSelect={() => onSelectChapter(chapter.id)}
                      onLockedTap={() => handleLockedTap(chapter.id)}
                    />
                  </div>
                </motion.div>
              ))}

              {/* Trailing hint if there are more chapters */}
              {category.chapters.length < category.totalChapters && (
                <motion.p
                  variants={itemVariants}
                  className="mt-1 pl-10 text-xs text-slate-400"
                >
                  + {category.totalChapters - category.chapters.length}개 챕터 더 있어요
                </motion.p>
              )}
            </motion.div>
          </AnimatePresence>
        </section>

        {/* ── Bottom nav ───────────────────────────── */}
        <DashboardBottomNav tabs={LEARNING_TABS} />
      </div>
    </main>
  )
}
