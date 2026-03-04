import BottomNav from "@/components/layout/BottomNav"
import DashboardCategoryList from "./DashboardCategoryList"
import DashboardContinueCard from "./DashboardContinueCard"
import DashboardHeader from "./DashboardHeader"
import DashboardTodayRecommendation from "./DashboardTodayRecommendation"
import type { DashboardCategory, DashboardRecommendation, DashboardTab } from "./dashboard.types"

type DashboardHomeProps = {
  tabs: DashboardTab[]
  categories: DashboardCategory[]
  recommendations: DashboardRecommendation[]
  onMoveToChapter: () => void
}

export default function DashboardHome({
  tabs,
  categories,
  recommendations,
  onMoveToChapter,
}: DashboardHomeProps) {
  return (
    <main className="relative mx-auto h-[812px] w-[375px] overflow-hidden bg-white text-slate-900">
      <div className="relative flex h-full flex-col border border-slate-200 pb-20">
        <section className="hide-scrollbar flex-1 overflow-y-auto px-5 pb-6 pt-6">
          <div className="flex flex-col gap-3">
            <DashboardHeader />
            <DashboardContinueCard onContinue={onMoveToChapter} />
            <DashboardCategoryList categories={categories} />
            <DashboardTodayRecommendation recommendations={recommendations} onContinue={onMoveToChapter} />
          </div>
        </section>

        <BottomNav tabs={tabs} />
      </div>
    </main>
  )
}
