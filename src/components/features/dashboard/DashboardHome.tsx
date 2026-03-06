import DashboardBottomNav from "@/components/layout/DashboardBottomNav"
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
  onMoveToLogin: () => void
  headerTitle?: string
  headerSubtitle?: string
  continueHeadline?: string
  continueCategory?: string
  continueLessonTitle?: string
  continueMeta?: string
  onTabClick?: (label: string) => void
}

export default function DashboardHome({
  tabs,
  categories,
  recommendations,
  onMoveToChapter,
  onMoveToLogin,
  headerTitle,
  headerSubtitle,
  continueHeadline,
  continueCategory,
  continueLessonTitle,
  continueMeta,
  onTabClick,
}: DashboardHomeProps) {
  return (
    <main className="relative mx-auto h-[812px] w-[375px] overflow-hidden bg-white font-sans text-slate-900">
      <div className="relative flex h-full flex-col border border-slate-200 bg-white pb-24 shadow-sm">
        <section className="hide-scrollbar flex-1 overflow-y-auto px-6 pb-12 pt-4">
          <div className="flex flex-col">
            <DashboardHeader
              onProfileClick={onMoveToLogin}
              title={headerTitle}
              subtitle={headerSubtitle}
            />
            
            <div className="space-y-12">
              <DashboardContinueCard
                onContinue={onMoveToChapter}
                headline={continueHeadline}
                category={continueCategory}
                lessonTitle={continueLessonTitle}
                meta={continueMeta}
              />
              
              <DashboardCategoryList categories={categories} />
              
              <DashboardTodayRecommendation recommendations={recommendations} onContinue={onMoveToChapter} />
            </div>
          </div>
        </section>

        <DashboardBottomNav tabs={tabs} onTabClick={onTabClick} />
      </div>
    </main>
  )
}
