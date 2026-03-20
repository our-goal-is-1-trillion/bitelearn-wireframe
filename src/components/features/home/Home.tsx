import { useState } from "react"
import OnboardingModal from "@/components/features/onboarding/OnboardingModal"
import { ChevronRight, Folder, FileText, PlayCircle } from "lucide-react"
import type { Page } from "@/App" // Import common Page type
import { Button } from "@/components/ui/button"

type IAAction = "onboarding"

interface IANode {
  label: string
  page?: Page
  action?: IAAction
  children?: IANode[]
}

const IA_STRUCTURE: IANode[] = [
  {
    label: "Onboarding",
    children: [
      { label: "서비스 온보딩 모달", action: "onboarding" },
      { label: "로그인", page: "login" },
      { label: "회원가입", page: "signup" },
    ]
  },
  {
    label: "Tab 1: 홈",
    children: [
      { label: "홈 대시보드 (신규 회원)", page: "dashBoardNew" },
      { label: "홈 대시보드 (비회원 온보딩)", page: "dashBoardGuest" },
      { label: "홈 대시보드 (회원)", page: "dashBoardActive" }
    ]
  },
  {
    label: "Tab 2: 학습",
    children: [
      { label: "학습 도메인 목록", page: "learningHome" },
      { label: "챕터 목록", page: "chapterList" },
      {
        label: "🔥 [FLOW] 연속 학습 과정 (화면이 아닌 전체 흐름)",
        page: "chapterPlayer",
        children: [
          { label: "단어 학습", page: "wordLearning" },
          { label: "객관식 퀴즈", page: "choiceQuestion" },
          { label: "OX 퀴즈", page: "oxQuestion" },
          { label: "대화형 퀴즈", page: "conversationQuestion" },
          { label: "타이핑 인디케이터 (...)", page: "typingBubbleDemo" },
          { label: "문서 객관식", page: "documentChoiceQuestion" },
          { label: "문서 오답 찾기", page: "documentClickQuestion" }
        ]
      },
      { label: "챕터 완료 중간 화면", page: "chapterDone" },
      {
        label: "최종 결과",
        children: [
          { label: "최종 결과 – 일반", page: "result" },
          { label: "최종 결과 – 만점", page: "resultPerfect" },
          { label: "최종 결과 – 아슬아슬", page: "resultClose" },
          { label: "최종 결과 – 실패", page: "resultFail" },
        ]
      }
    ]
  },
  {
    label: "Tab 3: 노트",
    children: [
      { label: "나의 학습 노트 통합", page: "mistakeNote" }
    ]
  },
  {
    label: "Tab 4: 아티클",
    children: [
      { label: "아티클 목록", page: "articleList" },
      { label: "아티클 상세", page: "article" },
    ]
  },
  {
    label: "Tab 5: 마이페이지",
    children: [
      { label: "마이페이지 홈", page: "mypage" }
    ]
  }
]

type HomeProps = {
  onNavigate: (page: Page) => void
}

function TreeItem({ 
  node, 
  depth = 0, 
  onNavigate, 
  setShowOnboarding 
}: { 
  node: IANode, 
  depth?: number, 
  onNavigate: (p: Page) => void,
  setShowOnboarding: (s: boolean) => void 
}) {
  const hasChildren = node.children && node.children.length > 0
  const isClickable = node.page || node.action

  return (
    <div className="flex flex-col">
      <div 
        className={`flex items-center gap-2 py-2 group ${depth > 0 ? "ml-4 border-l border-slate-200 pl-4" : ""}`}
      >
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {hasChildren ? (
            <Folder size={14} className="text-slate-400 shrink-0" />
          ) : (
            <FileText size={14} className="text-slate-300 shrink-0" />
          )}
          <span className={`text-sm truncate ${depth === 0 ? "font-bold text-slate-900" : "font-medium text-slate-600"}`}>
            {node.label}
          </span>
        </div>

        {isClickable && (
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              if (node.action === "onboarding") setShowOnboarding(true)
              else if (node.page) onNavigate(node.page)
            }}
            className="h-6 shrink-0 flex items-center gap-1 rounded-md bg-slate-50 border border-slate-200 px-2 py-0 text-[10px] font-bold text-slate-500 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all shadow-none"
          >
            {node.action ? <PlayCircle size={10} /> : <ChevronRight size={10} />}
            GO
          </Button>
        )}
      </div>

      {hasChildren && (
        <div className="flex flex-col">
          {node.children!.map((child, i) => (
            <TreeItem 
              key={`${child.label}-${i}`} 
              node={child} 
              depth={depth + 1} 
              onNavigate={onNavigate} 
              setShowOnboarding={setShowOnboarding} 
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default function Home({ onNavigate }: HomeProps) {
  const [showOnboarding, setShowOnboarding] = useState(false)

  return (
    <main className="relative mx-auto h-[812px] w-[375px] overflow-hidden bg-white text-slate-900 flex flex-col border border-slate-200 shadow-2xl">
      <header className="shrink-0 bg-slate-50 border-b border-slate-100 flex flex-col gap-4 px-6 py-6">
        <div className="flex items-center gap-2">
           <div className="h-2.5 w-2.5 rounded-full bg-slate-900" />
           <h1 className="text-xl font-bold tracking-tight text-slate-900">BiteLearn IA</h1>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            onClick={() => onNavigate("userStories")}
            className="flex-1"
          >
            <FileText size={16} className="mr-2" />
            유저 스토리
          </Button>
          <Button 
            variant="outline"
            onClick={() => onNavigate("functionalSpec")}
            className="flex-1"
          >
            <FileText size={16} className="mr-2" />
            기능 명세서
          </Button>
        </div>
      </header>

      <section className="flex-1 overflow-y-auto hide-scrollbar px-6 py-6 bg-[radial-gradient(#f1f5f9_1.5px,transparent_1.5px)] [background-size:24px_24px]">
        {/* App Gallery CTA */}
        <div className="mb-6 flex">
           <Button 
            variant="outline"
            onClick={() => onNavigate("gallery")}
            className="flex-1 h-12 shadow-sm bg-white"
          >
            <FileText size={16} className="mr-2 text-slate-500" />
            앱 갤러리 띄우기 →
          </Button>
        </div>

        <div className="rounded-[32px] border-2 border-slate-100 bg-white/90 backdrop-blur-sm p-6 shadow-xl shadow-slate-200/30">
          <div className="flex flex-col gap-2">
            {IA_STRUCTURE.map((section, i) => (
              <div key={i} className={i !== 0 ? "mt-6 pt-6 border-t border-slate-100" : ""}>
                <TreeItem 
                  node={section} 
                  onNavigate={onNavigate} 
                  setShowOnboarding={setShowOnboarding} 
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 mb-8 text-center">
           <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.3em]">BiteLearn Prototype Navigation</p>
        </div>
      </section>

      <OnboardingModal isOpen={showOnboarding} onClose={() => setShowOnboarding(false)} />
    </main>
  )
}
