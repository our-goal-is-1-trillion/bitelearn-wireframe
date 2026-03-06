import { ChevronRight, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { ArticleDetail } from "@/data/mock/article"

type ArticleCardProps = {
  article: ArticleDetail
  onSelect: (articleId: string) => void
  variant?: "relaxed" | "compact"
}

/** 
 * 아티클 목록 및 대시보드에서 사용하는 공통 아티클 카드 컴포넌트 
 * 우측 잘림 현상을 방지하기 위해 텍스트 래핑 로직을 강화했습니다.
 */
export default function ArticleCard({ 
  article, 
  onSelect,
  variant = "relaxed" 
}: ArticleCardProps) {
  return (
    <Button
      variant="outline"
      onClick={() => onSelect(article.articleId)}
      className="group flex h-auto min-h-[120px] w-full items-start gap-4 rounded-[28px] border-2 border-slate-100 bg-white p-5 transition-all hover:border-slate-300 active:scale-[0.98] text-left shadow-sm overflow-hidden"
    >
      {/* 
        [Text Area]
        flex-1 + min-w-0: Essential combo to prevent horizontal overflow in flexbox
      */}
      <div className="flex-1 min-w-0 flex flex-col h-full">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 truncate">
          {article.category}
        </p>
        
        {/* 
          [Title]
          whitespace-normal: Ensure text wraps to next line
          break-keep: Good for Korean readability (wraps at word boundaries)
          line-clamp-3: Safety limit
        */}
        <h3 className="text-base font-bold leading-snug text-slate-900 italic mb-auto whitespace-normal break-keep line-clamp-3">
          "{article.title}"
        </h3>
        
        {variant === "relaxed" && (
          <div className="flex items-center justify-between pt-3 border-t border-slate-50 mt-3 w-full">
            <span className="text-xs font-bold text-slate-300">잠시 짬내서 읽어보기</span>
            <ChevronRight size={14} className="text-slate-200" />
          </div>
        )}
      </div>

      {/* 
        [Thumbnail Area]
        Fixed size ensured with shrink-0
      */}
      <div className="h-16 w-16 shrink-0 mt-1 overflow-hidden rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center grayscale opacity-60">
        {article.thumbnailUrl ? (
          <img src={article.thumbnailUrl} className="h-full w-full object-cover" alt="" />
        ) : (
          <FileText size={24} className="text-slate-300" />
        )}
      </div>
    </Button>
  )
}
