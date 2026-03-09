import DashboardBottomNav from "@/components/layout/DashboardBottomNav"
import DashboardCategoryList from "./DashboardCategoryList"
import DashboardContinueCard from "./DashboardContinueCard"
import DashboardHeader from "./DashboardHeader"
import DashboardTodayRecommendation from "./DashboardTodayRecommendation"
import { Button } from "@/components/ui/button"
import ArticleCard from "@/components/features/article/ArticleCard"
import type { DashboardCategory, DashboardRecommendation, DashboardTab, UserOnboardingType } from "./dashboard.types"
import type { ArticleDetail } from "@/data/mock/article"

type DashboardHomeProps = {
  tabs: DashboardTab[]
  categories: DashboardCategory[]
  recommendations: DashboardRecommendation[]
  articles: ArticleDetail[]
  userType?: UserOnboardingType
  onMoveToChapter: () => void
  onMoveToLogin: () => void
  onMoveToArticle: (articleId: string) => void
  onTabClick: (label: string) => void
  headerTitle?: string
  headerSubtitle?: string
  continueHeadline?: string
  continueCategory?: string
  continueLessonTitle?: string
  continueMeta?: string
}

export default function DashboardHome({
  tabs,
  categories,
  recommendations,
  articles,
  userType = "active",
  onMoveToChapter,
  onMoveToLogin,
  onMoveToArticle,
  onTabClick,
  headerTitle,
  headerSubtitle,
  continueHeadline,
  continueCategory,
  continueLessonTitle,
  continueMeta,
}: DashboardHomeProps) {
  return (
    <main className="relative mx-auto h-[812px] w-[375px] overflow-hidden bg-white font-sans text-slate-900">
      <div className="relative flex h-full flex-col border border-slate-200 bg-white pb-24 shadow-sm">
        <section className="hide-scrollbar flex-1 overflow-y-auto px-6 pb-12 pt-4">
          <div className="flex flex-col">
            <DashboardHeader
              onProfileClick={onMoveToLogin}
              userType={userType}
              title={headerTitle}
              subtitle={headerSubtitle}
            />
            
            <div className="space-y-12">
              {userType === "active" && (
                <DashboardContinueCard
                  userType={userType}
                  onContinue={onMoveToChapter}
                  headline={continueHeadline}
                  category={continueCategory}
                  lessonTitle={continueLessonTitle}
                  meta={continueMeta}
                />
              )}
              
              <DashboardCategoryList categories={categories} />
              
              <DashboardTodayRecommendation recommendations={recommendations} onContinue={onMoveToChapter} />

              {/* 4. 추천 아티클 (Shared Component Applied) */}
              <section className="mt-12 mb-8">
                <div className="flex items-center justify-between px-1 mb-6">
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight">유용한 지식 아티클 ✨</h3>
                  <Button variant="link" size="sm" className="h-auto p-0 text-slate-400 text-xs font-bold hover:text-slate-900" onClick={() => onTabClick("아티클")}>
                    전체보기
                  </Button>
                </div>

                <div className="flex flex-col gap-6">
                  {articles.slice(0, 2).map((article) => (
                    <ArticleCard
                      key={article.articleId}
                      article={article}
                      onSelect={onMoveToArticle}
                      variant="compact" // Use compact for dashboard
                    />
                  ))}
                </div>
              </section>
            </div>
          </div>
        </section>

        <DashboardBottomNav tabs={tabs} onTabClick={onTabClick} />
      </div>
    </main>
  )
}
