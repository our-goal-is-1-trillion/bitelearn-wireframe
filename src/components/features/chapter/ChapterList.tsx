import { useState } from "react"
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

// ─── Stage Node (Roadmap node) ─────────────────────────────
function StageNode({ 
  chapter, 
  index,
  onSelect
}: { 
  chapter: Chapter
  index: number
  onSelect: () => void
}) {
  const isCompleted = chapter.status === "completed"
  const isInProgress = chapter.status === "in_progress"
  const isLocked = chapter.status === "locked"
  
  const offsets = ["-30px", "0px", "30px", "0px"]
  const xOffset = offsets[index % 4]

  return (
    <motion.div 
      className="relative flex flex-col items-center"
      style={{ x: xOffset }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
    >
      <div className="relative flex flex-col items-center">
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

        <div className="mt-3 max-w-[120px] text-center">
          <p className={`text-xs font-bold leading-tight ${isLocked ? "text-slate-400" : "text-slate-900"}`}>
            {chapter.title}
          </p>
          {!isLocked && (
            <p className="mt-1 text-xs text-slate-400 font-medium">
              약 {chapter.estimatedMinutes}분 · {chapter.questionCount}문제
            </p>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// ─── Main component ────────────────────────────────────────────
export default function ChapterList({ initialCategoryId, onBack, onSelectChapter, onTabClick }: ChapterListProps) {
  const [selectedCategoryId, setSelectedCategoryId] = useState(initialCategoryId || "real-estate")

  const category = MOCK_CATEGORY_CHAPTERS.find((c) => c.categoryId === selectedCategoryId)!
  const progressPercent = Math.round((category.completedChapters / category.totalChapters) * 100)

  return (
    <main className="relative mx-auto h-[812px] w-[375px] overflow-hidden bg-white text-slate-900 flex flex-col border border-slate-200">
      <div className="relative flex h-full flex-col">

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
            <h1 className="flex-1 text-center text-sm font-bold text-slate-900">학습 로드맵</h1>
            <div className="h-9 w-9" />
          </div>

          <div className="hide-scrollbar flex gap-2 overflow-x-auto px-4 pb-3">
            {MOCK_CATEGORY_CHAPTERS.map((cat) => (
              <Button
                key={cat.categoryId}
                variant={selectedCategoryId === cat.categoryId ? "default" : "secondary"}
                onClick={() => setSelectedCategoryId(cat.categoryId)}
                className={`h-9 whitespace-nowrap rounded-full px-4 text-xs font-bold transition-all ${
                  selectedCategoryId === cat.categoryId
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200 border-none"
                }`}
              >
                {cat.emoji} {cat.categoryName}
              </Button>
            ))}
          </div>
        </div>

        <section className="hide-scrollbar flex-1 overflow-y-auto px-6 pb-32 pt-10">
          
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

          <div className="relative flex flex-col items-center gap-16">
            <div className="absolute top-8 bottom-8 w-1 bg-slate-50 rounded-full" />
            
            {category.chapters.map((chapter, index) => (
              <StageNode 
                key={chapter.id} 
                chapter={chapter} 
                index={index} 
                onSelect={() => onSelectChapter(chapter.id)}
              />
            ))}
            
            <div className="mt-12 text-center">
               <div className="inline-block rounded-xl border border-dashed border-slate-200 bg-slate-50 px-6 py-3 text-xs font-bold text-slate-300">
                 다음 단계를 준비 중이에요
               </div>
            </div>
          </div>
        </section>

        <DashboardBottomNav tabs={LEARNING_TABS} onTabClick={onTabClick} />
      </div>
    </main>
  )
}
