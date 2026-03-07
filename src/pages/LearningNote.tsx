import { useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bookmark, RotateCcw, LayoutDashboard, ChevronRight, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import DashboardBottomNav from "@/components/layout/DashboardBottomNav"
import { MOCK_CATEGORY_CHAPTERS } from "@/data/mock/chapter"
import { DASHBOARD_TABS } from "@/components/features/dashboard/dashboard.constants"
import MistakeCard from "@/components/features/mistakeNote/MistakeCard"
import { MISTAKE_ITEMS } from "@/data/mock/mistakeNote"
import { mockArticles } from "@/data/mock/article"
import { MOCK_USER } from "@/data/mock/user"
import BiteCharacter from "@/components/features/character/BiteCharacter"

type NoteTab = "review" | "bookmark" | "history"

export default function LearningNote({ onTabClick }: { onTabClick: (label: string) => void }) {
  const [activeTab, setActiveTab] = useState<NoteTab>("review")
  const [selectedCategoryId, setSelectedCategoryId] = useState("all")

  // Bottom Nav Setup
  const tabs = DASHBOARD_TABS.map((tab) => ({
    ...tab,
    active: tab.label === "노트",
  }))

  // Data: Filtered Mistakes
  const filteredMistakes = useMemo(() => {
    const sorted = [...MISTAKE_ITEMS].sort(
      (a, b) => new Date(b.wrongAt).getTime() - new Date(a.wrongAt).getTime()
    )
    if (selectedCategoryId === "all") return sorted
    return sorted.filter((item) => item.categoryId === selectedCategoryId)
  }, [selectedCategoryId])

  // Data: Bookmarked Articles (Sample)
  const bookmarkedArticles = useMemo(() => {
    return mockArticles.slice(0, 2) // Just for demo
  }, [])

  // Data: Stats
  const totalCompleted = MOCK_CATEGORY_CHAPTERS.reduce((acc, cat) => acc + cat.completedChapters, 0)
  const totalChapters = MOCK_CATEGORY_CHAPTERS.reduce((acc, cat) => acc + cat.totalChapters, 0)

  return (
    <main className="relative mx-auto h-[812px] w-[375px] overflow-hidden bg-white text-slate-900">
      <div className="relative flex h-full flex-col border border-slate-200">
        
        {/* ── Fixed Top Header ────────────────────────── */}
        <header className="shrink-0 bg-white px-6 pt-12 pb-6 border-b border-slate-50">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">나의 학습 노트</h1>
              <p className="text-sm font-medium text-slate-500 mt-1">나의 성장을 한눈에 확인하세요.</p>
            </div>
            <div className="h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100">
               <LayoutDashboard size={24} className="text-slate-400" />
            </div>
          </div>

          {/* Character Status Section */}
          <BiteCharacter exp={MOCK_USER.totalExp} />

          {/* Mini Dashboard Stats */}
          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-2xl border-2 border-slate-100 bg-slate-50/50 p-3">
              <p className="text-[10px] font-bold text-slate-400 mb-1">전체 진행률</p>
              <div className="flex items-baseline gap-0.5">
                <span className="text-lg font-bold text-slate-900">{totalCompleted}</span>
                <span className="text-[10px] font-bold text-slate-300">/{totalChapters}</span>
              </div>
            </div>
            <div className="rounded-2xl border-2 border-slate-100 bg-slate-50/50 p-3">
              <p className="text-[10px] font-bold text-slate-400 mb-1">연속 학습</p>
              <div className="flex items-baseline gap-0.5">
                <span className="text-lg font-bold text-slate-900">{MOCK_USER.consecutiveDays}</span>
                <span className="text-[10px] font-bold text-slate-300">일째</span>
              </div>
            </div>
            <div className="rounded-2xl border-2 border-slate-900 bg-slate-900 p-3 shadow-md">
              <p className="text-[10px] font-bold text-slate-400 mb-1">보유 바이트</p>
              <div className="flex items-baseline gap-0.5">
                <span className="text-lg font-bold text-white">{MOCK_USER.totalExp.toLocaleString()}</span>
                <span className="text-[10px] font-bold text-white/60 italic ml-0.5">B</span>
              </div>
            </div>
          </div>
        </header>

        {/* ── Tab Navigation ───────────────────── */}
        <nav className="flex px-6 pt-6 gap-2 bg-white">
          <Button
            variant={activeTab === "review" ? "default" : "secondary"}
            onClick={() => setActiveTab("review")}
            className={`flex-1 h-10 rounded-xl text-xs font-bold transition-all ${
              activeTab === "review" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-500 border-none"
            }`}
          >
            오답 복습
          </Button>
          <Button
            variant={activeTab === "bookmark" ? "default" : "secondary"}
            onClick={() => setActiveTab("bookmark")}
            className={`flex-1 h-10 rounded-xl text-xs font-bold transition-all ${
              activeTab === "bookmark" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-500 border-none"
            }`}
          >
            저장한 글
          </Button>
          <Button
            variant={activeTab === "history" ? "default" : "secondary"}
            onClick={() => setActiveTab("history")}
            className={`flex-1 h-10 rounded-xl text-xs font-bold transition-all ${
              activeTab === "history" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-500 border-none"
            }`}
          >
            학습 기록
          </Button>
        </nav>

        {/* ── Scrollable Content Area ───────────────────── */}
        <section className="hide-scrollbar flex-1 overflow-y-auto px-6 pb-28 pt-6">
          <AnimatePresence mode="wait">
            
            {/* 1. Review Tab (Mistake Notes) */}
            {activeTab === "review" && (
              <motion.div
                key="review"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between mb-4 px-1">
                  <h3 className="text-sm font-bold text-slate-400">복습이 필요한 항목</h3>
                  <select 
                    className="text-xs font-bold text-slate-900 bg-transparent focus:outline-none"
                    value={selectedCategoryId}
                    onChange={(e) => setSelectedCategoryId(e.target.value)}
                  >
                    <option value="all">전체보기</option>
                    {MOCK_CATEGORY_CHAPTERS.map(c => <option key={c.categoryId} value={c.categoryId}>{c.categoryName}</option>)}
                  </select>
                </div>
                
                <div className="flex flex-col gap-6">
                  {filteredMistakes.length > 0 ? (
                    filteredMistakes.map((item) => (
                      <MistakeCard
                        key={item.id}
                        categoryLabel={MOCK_CATEGORY_CHAPTERS.find(c => c.categoryId === item.categoryId)?.categoryName || "미분류"}
                        dateText={new Date(item.wrongAt).toLocaleDateString("ko-KR")}
                        chapterTitle={item.chapterTitle}
                        question={item.question}
                        timeText={new Date(item.wrongAt).toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" })}
                      />
                    ))
                  ) : (
                    <div className="py-20 text-center rounded-[32px] border-2 border-dashed border-slate-100">
                       <RotateCcw size={32} className="mx-auto text-slate-200 mb-4" />
                       <p className="text-sm font-bold text-slate-400">모든 오답을 정복했어요!</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* 2. Bookmark Tab (Articles) */}
            {activeTab === "bookmark" && (
              <motion.div
                key="bookmark"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-6"
              >
                <h3 className="text-sm font-bold text-slate-400 mb-4 px-1">저장한 아티클</h3>
                <div className="flex flex-col gap-6">
                  {bookmarkedArticles.map((article) => (
                    <Button
                      key={article.articleId}
                      variant="outline"
                      className="flex h-auto w-full flex-col items-start gap-4 rounded-[28px] border-slate-200 bg-white p-5 transition-all hover:border-slate-300 shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center">
                           <Bookmark size={18} className="text-slate-900" />
                        </div>
                        <div className="text-left">
                          <p className="text-[10px] font-bold text-slate-400">{article.category}</p>
                          <h4 className="text-sm font-bold text-slate-900 leading-tight">{article.title}</h4>
                        </div>
                      </div>
                      <div className="w-full h-32 rounded-2xl bg-slate-100 overflow-hidden grayscale opacity-80">
                         <img src={article.thumbnailUrl} className="w-full h-full object-cover" alt="" />
                      </div>
                    </Button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* 3. History Tab (Learning Logs) */}
            {activeTab === "history" && (
              <motion.div
                key="history"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-8"
              >
                <h3 className="text-sm font-bold text-slate-400 mb-4 px-1">최근 학습 활동</h3>
                <div className="space-y-10">
                  {MOCK_CATEGORY_CHAPTERS.map((cat) => (
                    <div key={cat.categoryId} className="flex items-start gap-4">
                      <div className="shrink-0 h-12 w-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-2xl">
                        {cat.emoji}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-end justify-between mb-2">
                          <h4 className="text-sm font-bold text-slate-900">{cat.categoryName}</h4>
                          <span className="text-xs font-bold text-slate-400">{cat.completedChapters} / {cat.totalChapters}</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                           <div 
                             className="h-full bg-slate-900 rounded-full" 
                             style={{ width: `${Math.round((cat.completedChapters / cat.totalChapters) * 100)}%` }} 
                           />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-12 p-6 rounded-[32px] bg-slate-900 text-white shadow-xl">
                   <div className="flex items-center gap-3 mb-4">
                      <GraduationCap size={24} className="text-slate-400" />
                      <h4 className="text-lg font-bold">성장 가이드</h4>
                   </div>
                   <p className="text-sm font-medium text-slate-400 leading-relaxed">
                     부동산 도메인의 모든 챕터를 완료하면<br/>
                     '프로 독립러' 뱃지를 획득할 수 있어요!
                   </p>
                   <Button variant="secondary" className="w-full mt-6 h-12 rounded-xl text-xs font-bold bg-white/10 text-white hover:bg-white/20 border-none transition-all">
                      다음 미션 확인하기 <ChevronRight size={14} className="ml-1" />
                   </Button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </section>

        <DashboardBottomNav tabs={tabs} onTabClick={onTabClick} />
      </div>
    </main>
  )
}
