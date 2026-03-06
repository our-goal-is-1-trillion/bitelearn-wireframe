import { useMemo, useState } from "react"
import DashboardBottomNav from "@/components/layout/DashboardBottomNav"
import { MOCK_CATEGORY_CHAPTERS } from "@/data/mock/chapter"
import { DASHBOARD_TABS } from "@/components/features/dashboard/dashboard.constants"
import MistakeCard from "@/components/features/mistakeNote/MistakeCard"
import { MISTAKE_ITEMS } from "@/data/mok/mistakeNote"

export default function MistakeNote() {
  const [selectedCategoryId, setSelectedCategoryId] = useState("all")
  const tabs = DASHBOARD_TABS.map((tab) => ({
    ...tab,
    active: tab.label === "오답노트",
  }))

  const filteredMistakes = useMemo(() => {
    const sorted = [...MISTAKE_ITEMS].sort(
      (a, b) => new Date(b.wrongAt).getTime() - new Date(a.wrongAt).getTime()
    )

    if (selectedCategoryId === "all") {
      return sorted
    }

    return sorted.filter((item) => item.categoryId === selectedCategoryId)
  }, [selectedCategoryId])

  return (
    <main className="relative mx-auto h-[812px] w-[375px] overflow-hidden bg-white text-slate-900">
      <div className="relative flex h-full flex-col border border-slate-200">
        <div className="absolute inset-x-0 top-0 z-20 border-b border-slate-100 bg-white">
          <div className="flex h-14 items-center px-4">
            <div className="h-8 w-8" />
            <h1 className="flex-1 text-center text-sm font-bold text-slate-900">오답노트</h1>
            <div className="h-8 w-8" />
          </div>

          <div className="hide-scrollbar flex gap-2 overflow-x-auto px-4 pb-3">
            <button
              type="button"
              onClick={() => setSelectedCategoryId("all")}
              className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                selectedCategoryId === "all"
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              전체
            </button>
            {MOCK_CATEGORY_CHAPTERS.map((category) => (
              <button
                type="button"
                key={category.categoryId}
                onClick={() => setSelectedCategoryId(category.categoryId)}
                className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  selectedCategoryId === category.categoryId
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {category.emoji} {category.categoryName}
              </button>
            ))}
          </div>
        </div>

        <section className="hide-scrollbar flex-1 overflow-y-auto px-5 pb-24 pt-[108px]">
          <div className="flex flex-col gap-3">
            {filteredMistakes.length > 0 ? (
              filteredMistakes.map((item) => {
                const category = MOCK_CATEGORY_CHAPTERS.find(
                  (value) => value.categoryId === item.categoryId
                )
                const wrongDate = new Date(item.wrongAt)
                const dateText = wrongDate.toLocaleDateString("ko-KR")
                const timeText = wrongDate.toLocaleTimeString("ko-KR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })
                const categoryLabel = `${category?.emoji ?? ""} ${category?.categoryName ?? "미분류"}`

                return (
                  <MistakeCard
                    key={item.id}
                    categoryLabel={categoryLabel}
                    dateText={dateText}
                    chapterTitle={item.chapterTitle}
                    question={item.question}
                    timeText={timeText}
                  />
                )
              })
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center">
                <p className="text-sm font-semibold text-slate-700">해당 분류에 쌓인 오답이 없어요</p>
                <p className="mt-1 text-xs text-slate-500">다른 필터를 선택해보세요.</p>
              </div>
            )}
          </div>
        </section>

        <DashboardBottomNav tabs={tabs} />
      </div>
    </main>
  )
}
