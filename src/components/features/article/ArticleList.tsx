import { useState } from "react"
import { motion } from "framer-motion"
import { FileText, House, GraduationCap, BookOpenCheck, UserRound, ArrowRight, Clock, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import DashboardBottomNav from "@/components/layout/DashboardBottomNav"
import { mockArticles, ARTICLE_CATEGORIES } from "@/data/mock/article"
import type { ArticleDetail, ArticleCategory } from "@/data/mock/article"

type ArticleListProps = {
  onSelectArticle: (articleId: string) => void
  onTabClick?: (label: string) => void
}

const BOTTOM_TABS = [
  { label: "홈", icon: House, active: false },
  { label: "학습", icon: GraduationCap, active: false },
  { label: "노트", icon: BookOpenCheck, active: false },
  { label: "아티클", icon: FileText, active: true },
  { label: "마이", icon: UserRound, active: false },
]

// ─── Thumbnail (Lo-fi Wireframe) ──────────────────────────
function ArticleThumb({ category }: { category: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-slate-50 border-b border-slate-100">
      <div className="flex flex-col items-center gap-3 opacity-20">
        <FileText size={48} className="text-slate-900" />
        <span className="text-[10px] font-bold tracking-widest">{category}</span>
      </div>
    </div>
  )
}

// ─── Hero Article Card (Featured) ──────────────────────────
function HeroArticleCard({ article, onSelect }: { article: ArticleDetail; onSelect: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative overflow-hidden rounded-[32px] border-2 border-slate-100 bg-white shadow-xl shadow-slate-200/30 transition-all hover:border-slate-900 active:scale-[0.98] cursor-pointer"
      onClick={onSelect}
    >
      <div className="h-56 w-full overflow-hidden">
        <ArticleThumb category={article.category} />
      </div>
      <div className="p-8">
        <div className="mb-4 flex items-center justify-between">
          <span className="rounded-full bg-slate-900 px-3 py-1 text-[10px] font-bold text-white">
            추천 콘텐츠
          </span>
          <div className="flex items-center gap-1.5 text-slate-400">
            <Clock size={12} />
            <span className="text-xs font-bold text-slate-500">3분 분량</span>
          </div>
        </div>
        <h2 className="text-xl font-bold leading-tight text-slate-900 line-clamp-2">
          {article.title}
        </h2>
        <div className="mt-6 flex items-center justify-between border-t border-slate-50 pt-6">
          <p className="text-sm font-medium text-slate-500">{article.author.name} 에디터</p>
          <Button size="icon" variant="secondary" className="h-10 w-10 rounded-full bg-slate-50 group-hover:bg-slate-900 group-hover:text-white transition-all">
            <ArrowRight size={20} />
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Standard Article Card (Relaxed) ───────────────────────
function RelaxedArticleCard({ article, onSelect }: { article: ArticleDetail; onSelect: () => void }) {
  return (
    <button
      onClick={onSelect}
      className="group flex w-full flex-col gap-4 rounded-[28px] border-2 border-slate-100 bg-white p-5 transition-all hover:border-slate-300 active:scale-[0.98] text-left"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-2">
          <p className="text-[10px] font-bold text-slate-400">{article.category}</p>
          <h3 className="text-base font-bold leading-snug text-slate-900 line-clamp-2 italic">
            "{article.title}"
          </h3>
        </div>
        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center grayscale opacity-60">
           <FileText size={24} className="text-slate-300" />
        </div>
      </div>
      <div className="flex items-center justify-between pt-2 border-t border-slate-50">
         <span className="text-xs font-bold text-slate-300">잠시 짬내서 읽어보기</span>
         <ChevronRight size={14} className="text-slate-200" />
      </div>
    </button>
  )
}

// ─── Main Component ──────────────────────────────────────────
export default function ArticleList({ onSelectArticle, onTabClick }: ArticleListProps) {
  const [selectedCategory, setSelectedCategory] = useState<ArticleCategory>("전체")

  const filtered = selectedCategory === "전체"
    ? mockArticles
    : mockArticles.filter((a) => a.category === selectedCategory)

  const heroArticle = filtered[0]
  const otherArticles = filtered.slice(1)

  return (
    <main className="relative mx-auto h-[812px] w-[375px] overflow-hidden bg-white text-slate-900 flex flex-col border border-slate-200 shadow-xl">
      
      {/* ── Fixed Header ────────────────────────── */}
      <header className="shrink-0 bg-white border-b border-slate-50 px-6 pt-12 pb-6">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">지식 아티클</h1>
            <p className="text-sm font-medium text-slate-500 mt-1">부담 없이 가볍게 읽는 성장 지식</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center text-xl shadow-inner">
             ✨
          </div>
        </div>

        {/* Category Filters (Lo-fi style) */}
        <div className="hide-scrollbar -mx-2 flex gap-2 overflow-x-auto px-2">
          {ARTICLE_CATEGORIES.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "secondary"}
              onClick={() => setSelectedCategory(cat)}
              className={`h-9 whitespace-nowrap rounded-full px-5 text-xs font-bold transition-all ${
                selectedCategory === cat 
                  ? "bg-slate-900 text-white shadow-md" 
                  : "bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600 border-none"
              }`}
            >
              {cat}
            </Button>
          ))}
        </div>
      </header>

      {/* ── Scrollable List ───────────────────── */}
      <section className="hide-scrollbar flex-1 overflow-y-auto px-6 py-10 pb-32 bg-[radial-gradient(#f8fafc_2px,transparent_2px)] [background-size:24px_24px]">
        
        <div className="flex flex-col gap-12">
          {filtered.length > 0 ? (
            <>
              {/* Highlight Card */}
              {heroArticle && (
                <div className="space-y-4">
                  <HeroArticleCard 
                    article={heroArticle} 
                    onSelect={() => onSelectArticle(heroArticle.articleId)} 
                  />
                </div>
              )}

              {/* Other Cards */}
              {otherArticles.length > 0 && (
                <div className="space-y-10">
                  <div className="flex flex-col gap-8">
                    {otherArticles.map((article) => (
                      <RelaxedArticleCard 
                        key={article.articleId} 
                        article={article} 
                        onSelect={() => onSelectArticle(article.articleId)} 
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="py-20 text-center rounded-[32px] border-2 border-dashed border-slate-100 bg-slate-50/50">
               <p className="text-sm font-bold text-slate-400">아직 준비 중인 아티클이에요</p>
            </div>
          )}
        </div>

        <div className="mt-20 text-center px-10 pb-10">
           <p className="text-xs font-bold text-slate-300 leading-relaxed">
             새로운 지식이 매주 업데이트되고 있어요
           </p>
        </div>
      </section>

      {/* ── Bottom nav ───────────────────── */}
      <DashboardBottomNav tabs={BOTTOM_TABS} onTabClick={onTabClick} />
    </main>
  )
}
