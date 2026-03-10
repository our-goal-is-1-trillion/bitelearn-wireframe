import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

type ChapterIntroScreenProps = {
  chapterTitle: string
  missionTitle?: string
  missionKeywords?: string[]
  onStart: () => void
}

export default function ChapterIntroScreen({
  chapterTitle,
  missionTitle = "부동산 기본 개념 익히기",
  missionKeywords = [],
  onStart,
}: ChapterIntroScreenProps) {
  return (
    <main className="relative mx-auto h-[812px] w-[375px] overflow-hidden bg-white text-slate-900">
      <div className="flex h-full flex-col items-center justify-between border border-slate-200 px-6 py-12">
        <motion.div
           initial={{ opacity: 0, y: 24 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.4 }}
           className="flex w-full flex-col items-center text-center mt-12"
        >
          <div className="mb-8">
            <span className="inline-block rounded-full bg-slate-100 border border-slate-200 px-3 py-1 text-[10px] font-black tracking-widest text-slate-600 mb-4 shadow-sm">
              CHAPTER MISSION
            </span>
            <p className="text-[22px] font-bold leading-snug text-slate-900 break-keep px-2">
              {chapterTitle}
            </p>
          </div>

          <div className="w-full bg-slate-50 border border-slate-100 rounded-[24px] p-6 space-y-5 text-left shadow-sm">
             <div className="flex gap-4">
               <div className="text-2xl pt-0.5">🎯</div>
               <div>
                 <p className="text-[11px] font-bold text-slate-400">이번 미션</p>
                 <p className="text-[13px] font-bold text-slate-700 mt-0.5 max-w-[200px] break-keep">{missionTitle}</p>
               </div>
             </div>
             
             {missionKeywords.length > 0 && (
               <>
                 <div className="h-px w-full bg-slate-100" />

                 <div className="flex gap-4">
                   <div className="text-2xl pt-0.5">📖</div>
                   <div>
                     <p className="text-[11px] font-bold text-slate-400">핵심 내용</p>
                     <div className="flex flex-wrap gap-1.5 mt-2">
                        {missionKeywords.map((keyword, index) => (
                          <span key={index} className="inline-flex rounded-lg bg-white border border-slate-200 text-slate-600 text-[10px] font-bold px-2 py-1">
                            {keyword}
                          </span>
                        ))}
                     </div>
                   </div>
                 </div>
               </>
             )}
          </div>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, y: 24 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.4, delay: 0.1 }}
           className="w-full"
        >
          <Button size="lg" className="w-full h-14 rounded-2xl text-base font-bold shadow-lg shadow-slate-200 active:scale-95 transition-all" onClick={onStart}>
            미션 시작하기
          </Button>
        </motion.div>
      </div>
    </main>
  )
}
