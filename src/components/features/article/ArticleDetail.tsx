import { motion } from "framer-motion"
import { ChevronLeft, Share2, Bookmark, CheckCircle2, ChevronDown } from "lucide-react"
import { mockArticles } from "@/data/mock/article"
import type { ContentBlock } from "@/data/mock/article"
import { useState } from "react"

// 날짜 포맷팅 유틸리티
const formatDate = (isoString: string) => {
  const date = new Date(isoString)
  return `${date.getFullYear()}. ${String(date.getMonth() + 1).padStart(2, "0")}. ${String(date.getDate()).padStart(2, "0")}.`
}

interface ArticleDetailProps {
  onBack?: () => void;
  articleId?: string;
}

export default function ArticleDetail({ onBack, articleId }: ArticleDetailProps) {
  // ID가 없거나 못 찾은 경우 첫 번째 데이터 사용 (개발용)
  const currentId = articleId ?? mockArticles[0].articleId
  const article = mockArticles.find((a) => a.articleId === currentId)

  // FAQ 아코디언 상태
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)

  if (!article) {
    return (
      <div className="flex h-[812px] w-[375px] mx-auto items-center justify-center bg-slate-50 text-slate-500">
        아티클을 찾을 수 없습니다.
      </div>
    )
  }

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index)
  }

  // 본문 블록 렌더링 함수
  const renderContentBlock = (block: ContentBlock, index: number) => {
    switch (block.type) {
      case "paragraph":
        return (
          <p key={index} className="text-[16px] leading-[1.7] tracking-[-0.01em] text-slate-800 mb-6 whitespace-pre-wrap word-break-keep">
            {block.content}
          </p>
        )
      case "heading":
        if (block.level === 3) {
          return (
            <h3 key={index} className="text-[20px] font-bold text-slate-900 mt-10 mb-4 tracking-[-0.02em] leading-tight word-break-keep">
              {block.content}
            </h3>
          )
        }
        return (
          <h2 key={index} className="text-[22px] font-bold text-slate-900 mt-12 mb-5 tracking-[-0.02em] leading-tight word-break-keep">
            {block.content}
          </h2>
        )
      case "image":
        return (
          <figure key={index} className="my-8">
            <div className="overflow-hidden rounded-xl bg-slate-100">
              <img
                src={import.meta.env.BASE_URL.replace(/\/$/, '') + block.url}
                alt={block.altText}
                className="w-full h-auto object-cover"
              />
            </div>
            {block.caption && (
              <figcaption className="mt-2 text-center text-[13px] text-slate-500 max-w-[90%] mx-auto word-break-keep">
                {block.caption}
              </figcaption>
            )}
          </figure>
        )
      case "list":
        return (
          <ul key={index} className="my-6 space-y-3 pl-1">
            {block.items.map((item, i) => {
              // 진하게(**) 처리 파싱 로직 (간단한 버전)
              // 실제 프로덕션에서는 react-markdown 등을 쓰는 것이 좋습니다.
              const parts = item.split(/\*\*(.*?)\*\*/g)
              return (
                <li key={i} className="flex items-start text-[16px] leading-[1.6] tracking-[-0.01em] text-slate-800 word-break-keep">
                  <span className="shrink-0 mt-[8px] mr-2 w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  <span className="flex-1">
                    {parts.map((part, index) =>
                      index % 2 === 1 ? <strong key={index} className="font-bold">{part}</strong> : <span key={index}>{part}</span>
                    )}
                  </span>
                </li>
              )
            })}
          </ul>
        )
      case "quote":
        return (
          <blockquote key={index} className="my-8 rounded-r-xl border-l-[4px] border-indigo-500 bg-indigo-50/50 p-5 word-break-keep">
            <p className="text-[15px] leading-relaxed text-slate-700 whitespace-pre-wrap">
              {block.content}
            </p>
          </blockquote>
        )
      default:
        return null
    }
  }

  return (
    <div className="relative mx-auto flex h-[812px] w-[375px] flex-col bg-white overflow-hidden font-sans">
      {/* 고정 상단 네비게이션 헤더 */}
      <header className="absolute top-0 left-0 right-0 z-50 flex h-14 items-center justify-between bg-white/90 px-2 backdrop-blur-md border-b border-slate-100">
        <button
          onClick={() => onBack?.()}
          className="flex h-10 w-10 items-center justify-center rounded-full text-slate-800 transition-colors hover:bg-slate-100"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <div className="flex gap-1">
          <button className="flex h-10 w-10 items-center justify-center rounded-full text-slate-600 transition-colors hover:bg-slate-100">
            <Bookmark className="h-5 w-5" />
          </button>
          <button className="flex h-10 w-10 items-center justify-center rounded-full text-slate-600 transition-colors hover:bg-slate-100">
            <Share2 className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* 메인 스크롤 영역 */}
      <main className="flex-1 overflow-y-auto pt-14 pb-28">
        {/* 1. 커버 이미지 */}
        <div className="relative w-full aspect-[4/3] bg-slate-100">
          <img
            src={import.meta.env.BASE_URL.replace(/\/$/, '') + article.thumbnailUrl}
            alt={article.title}
            className="h-full w-full object-cover"
          />
        </div>

        {/* 2. 타이틀 영역 */}
        <section className="px-5 pt-6 pb-5">
          <div className="mb-3 inline-block rounded border border-slate-200 bg-white px-2.5 py-1 text-[12px] font-semibold text-slate-600">
            {article.category}
          </div>
          <h1 className="text-[26px] font-bold leading-[1.35] tracking-tight text-slate-900 word-break-keep">
            {article.title}
          </h1>

          {/* 작성자 & 메타 정보 */}
          <div className="mt-6 flex items-center justify-between border-y border-slate-100 py-4">
            <div className="flex items-center gap-3">
              <img
                src={import.meta.env.BASE_URL.replace(/\/$/, '') + article.author.profileImageUrl}
                alt={article.author.name}
                className="h-10 w-10 rounded-full object-cover bg-slate-50 border border-slate-100"
              />
              <div className="flex flex-col">
                <span className="text-[14px] font-bold text-slate-900">{article.author.name}</span>
                <span className="text-[12px] text-slate-500">{article.author.role}</span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-0.5">
              <span className="text-[12px] text-slate-400">{formatDate(article.publishedAt)}</span>
              <span className="text-[12px] text-slate-400">조회 {article.viewCount.toLocaleString()}</span>
            </div>
          </div>
        </section>

        {/* 3. 3줄 요약 (Summary Box) */}
        {article.summary && (
          <section className="px-5 py-4">
            <div className="rounded-2xl border border-indigo-100 bg-indigo-50/50 p-5">
              <h4 className="mb-4 flex items-center gap-2 text-[15px] font-bold text-indigo-900">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[11px] text-white">
                  ✓
                </span>
                {article.summary.title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {article.summary.points.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-[14px] leading-relaxed text-indigo-950/80 word-break-keep">
                    {/* 불릿 아이콘 */}
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-indigo-400" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* 4. 본문 내용 */}
        <section className="px-5 py-6">
          {article.contentBlocks.map((block, index) => renderContentBlock(block, index))}
        </section>

        {/* 5. 태그 영역 */}
        <section className="px-5 pb-8 pt-2">
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag, idx) => (
              <span key={idx} className="rounded-full bg-slate-100 px-3 py-1.5 text-[13px] font-medium text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer">
                #{tag}
              </span>
            ))}
          </div>
        </section>

        {/* 6. FAQ 아코디언 (자주 묻는 질문) */}
        {article.faqs && article.faqs.length > 0 && (
          <section className="bg-slate-50 px-5 py-10 border-t border-slate-100">
            <h3 className="mb-6 text-[20px] font-bold text-slate-900 flex items-center gap-2">
              <span className="text-2xl">💡</span> 궁금증을 해결해드릴게요!
            </h3>
            <div className="flex flex-col gap-3">
              {article.faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                // 간단 파싱 로직
                const answerParts = faq.answer.split(/\*\*(.*?)\*\*/g)

                return (
                  <div key={idx} className={`overflow-hidden rounded-xl border bg-white transition-colors ${isOpen ? 'border-indigo-200 shadow-sm' : 'border-slate-200'}`}>
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="flex w-full items-center justify-between p-4 text-left"
                    >
                      <span className="text-[15px] font-bold text-slate-800 pr-4 leading-snug">{faq.question}</span>
                      <ChevronDown className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-indigo-500' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 pt-1">
                        <p className="text-[15px] leading-relaxed text-slate-600 word-break-keep">
                          {answerParts.map((part, index) =>
                            index % 2 === 1 ? <strong key={index} className="font-bold text-indigo-600">{part}</strong> : <span key={index}>{part}</span>
                          )}
                        </p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </section>
        )}
      </main>

      {/* 7. 최하단 CTA (Call To Action) 배너/버튼 고정 */}
      {article.callToAction && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.5 }}
          className="absolute bottom-0 left-0 right-0 z-40 border-t border-slate-100 bg-white/95 px-5 pb-8 pt-4 backdrop-blur-md"
        >
          <button
            className={`flex w-full items-center justify-center rounded-2xl py-4 text-[16px] font-bold transition-all shadow-md
              ${article.callToAction.style === "primary" ? "bg-indigo-600 text-white hover:bg-indigo-700" : "bg-slate-900 text-white hover:bg-slate-800"}
            `}
          >
            {article.callToAction.text}
          </button>
        </motion.div>
      )}
    </div>
  )
}
