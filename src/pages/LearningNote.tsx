import { useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bookmark, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import DashboardBottomNav from "@/components/layout/DashboardBottomNav"
import { MOCK_CATEGORY_CHAPTERS } from "@/data/mock/chapter"
import { DASHBOARD_TABS } from "@/components/features/dashboard/dashboard.constants"
import MistakeCard from "@/components/features/mistakeNote/MistakeCard"
import { MISTAKE_ITEMS } from "@/data/mock/mistakeNote"
import { mockArticles } from "@/data/mock/article"
import { MOCK_USER } from "@/data/mock/user"
import BiteCharacter from "@/components/features/character/BiteCharacter"

type NoteTab = "review" | "bookmark"

export default function LearningNote({ onTabClick }: { onTabClick: (label: string) => void }) {
  const [activeTab, setActiveTab] = useState<NoteTab>("review")
  const [selectedCategoryId, setSelectedCategoryId] = useState("all")

  const tabs = DASHBOARD_TABS.map((tab) => ({
    ...tab,
    active: tab.label === "노트",
  }))

  const filteredMistakes = useMemo(() => {
    const sorted = [...MISTAKE_ITEMS].sort(
      (a, b) => new Date(b.wrongAt).getTime() - new Date(a.wrongAt).getTime()
    )
    if (selectedCategoryId === "all") return sorted
    return sorted.filter((item) => item.categoryId === selectedCategoryId)
  }, [selectedCategoryId])

  const bookmarkedArticles = useMemo(() => mockArticles.slice(0, 2), [])

  const mistakeCount = MISTAKE_ITEMS.length
  const currentBytes = MOCK_USER.totalExp
  const isNegative = currentBytes < 0

  return (
    <main className="relative mx-auto h-[812px] w-[375px] overflow-hidden bg-white text-slate-900">
      <div className="relative flex h-full flex-col border border-slate-200">

        {/* ── 상단 고정 탭 ── */}
        <header className="shrink-0 bg-white border-b border-slate-100">
          <div className="flex pt-12">
            {(["review", "bookmark"] as NoteTab[]).map((tab) => (
              <Button
                key={tab}
                variant="ghost"
                onClick={() => setActiveTab(tab)}
                className={`flex-1 rounded-none py-6 text-sm font-bold transition-all border-b-2 hover:bg-slate-50 ${
                  activeTab === tab
                    ? "border-slate-900 text-slate-900"
                    : "border-transparent text-slate-400"
                }`}
              >
                {tab === "review" ? "오답 복습" : "저장한 글"}
              </Button>
            ))}
          </div>
        </header>

        {/* ── 스크롤 콘텐츠 ── */}
        <div className="hide-scrollbar flex-1 overflow-y-auto pb-28">
          <AnimatePresence mode="wait">

            {/* 오답 복습 */}
            {activeTab === "review" && (
              <motion.div
                key="review"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
              >
                {/* 멍멍이 + 스탯 */}
                <div className="px-6 pt-6 pb-4">
                  <BiteCharacter exp={MOCK_USER.totalExp} mistakeCount={mistakeCount} />
                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-2xl border-2 border-slate-100 bg-slate-50/50 p-3">
                      <p className="text-[10px] font-bold text-slate-400 mb-1">복습 대기</p>
                      <div className="flex items-baseline gap-0.5">
                        <span className="text-lg font-bold text-slate-900">{mistakeCount}</span>
                        <span className="text-[10px] font-bold text-slate-300 ml-0.5">개</span>
                      </div>
                    </div>
                    <div className={`rounded-2xl border-2 p-3 shadow-md ${isNegative ? "border-red-200 bg-red-50" : "border-slate-900 bg-slate-900"}`}>
                      <p className={`text-[10px] font-bold mb-1 ${isNegative ? "text-red-400" : "text-slate-400"}`}>현재 바이트</p>
                      <div className="flex items-baseline gap-0.5">
                        <span className={`text-lg font-bold ${isNegative ? "text-red-600" : "text-white"}`}>
                          {currentBytes.toLocaleString()}
                        </span>
                        <span className={`text-[10px] font-bold italic ml-0.5 ${isNegative ? "text-red-400" : "text-white/60"}`}>B</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 카테고리 필터 칩 */}
                <div className="hide-scrollbar flex gap-2 overflow-x-auto px-6 py-3 border-b border-slate-50">
                  {[{ categoryId: "all", categoryName: "전체" }, ...MOCK_CATEGORY_CHAPTERS].map((cat) => (
                    <Button
                      key={cat.categoryId}
                      variant={selectedCategoryId === cat.categoryId ? "default" : "secondary"}
                      onClick={() => setSelectedCategoryId(cat.categoryId)}
                      className={`shrink-0 rounded-full h-8 px-4 text-[11px] font-bold transition-all ${
                        selectedCategoryId === cat.categoryId
                          ? "bg-slate-900 text-white shadow-sm hover:bg-slate-800"
                          : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                      }`}
                    >
                      {cat.categoryName}
                    </Button>
                  ))}
                </div>

                {/* 오답 카드 목록 */}
                <div className="flex flex-col gap-6 px-6 pt-4 pb-6">
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

            {/* 저장한 글 */}
            {activeTab === "bookmark" && (
              <motion.div
                key="bookmark"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex flex-col gap-6 px-6 pt-6 pb-6"
              >
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
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        <DashboardBottomNav tabs={tabs} onTabClick={onTabClick} />
      </div>
    </main>
  )
}
